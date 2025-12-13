/**
 * Prompt Loader
 *
 * Server-side markdown parsing for agent prompts.
 * Extracts structured data from prompt files.
 */

import { promises as fs } from "fs"
import path from "path"
import { AGENT_TYPES, type AgentSlug } from "./agent-types"

/**
 * Parsed prompt structure
 */
export interface ParsedPrompt {
  quickReference: {
    role: string
    primaryGoal: string
    callType: string
    trade: string
    projectScale: string
    style: string
  }
  role: string
  personality: string[]
  context: string
  task: string[]
  conversationFlow: {
    phase: string
    content: string
  }[]
  exampleConversations: {
    title: string
    dialogue: string
  }[]
  objectionHandling: {
    category: string
    objections: { trigger: string; response: string }[]
  }[]
  voiceOptimization: {
    responseLength: string[]
    emotionTags: { scenario: string; emotion: string }[]
  }
  rawContent: string
}

/**
 * Parse quick reference section from markdown
 */
function parseQuickReference(content: string): ParsedPrompt["quickReference"] {
  const quickRefMatch = content.match(
    /## QUICK REFERENCE\s*([\s\S]*?)(?=\n---|\n#[^#])/i
  )
  const quickRefText = quickRefMatch?.[1] || ""

  const getValue = (key: string): string => {
    const regex = new RegExp(`\\*\\*${key}\\*\\*:\\s*(.+)`, "i")
    const match = quickRefText.match(regex)
    return match?.[1]?.trim() || ""
  }

  return {
    role: getValue("Role"),
    primaryGoal: getValue("Primary Goal"),
    callType: getValue("Call Type"),
    trade: getValue("Trade"),
    projectScale: getValue("Project Scale"),
    style: getValue("Style"),
  }
}

/**
 * Parse role section
 */
function parseRole(content: string): string {
  const roleMatch = content.match(/# ROLE\s*([\s\S]*?)(?=\n---|\n#[^#])/i)
  return roleMatch?.[1]?.trim() || ""
}

/**
 * Parse personality traits
 */
function parsePersonality(content: string): string[] {
  const personalityMatch = content.match(
    /# PERSONALITY\s*([\s\S]*?)(?=\n---|\n#[^#])/i
  )
  const personalityText = personalityMatch?.[1] || ""

  const traits: string[] = []
  const traitRegex = /- \*\*(\w+)\*\*:\s*(.+)/g
  let match
  while ((match = traitRegex.exec(personalityText)) !== null) {
    traits.push(`${match[1]}: ${match[2]}`)
  }

  return traits
}

/**
 * Parse context section
 */
function parseContext(content: string): string {
  const contextMatch = content.match(/# CONTEXT\s*([\s\S]*?)(?=\n---|\n#[^#])/i)
  return contextMatch?.[1]?.trim() || ""
}

/**
 * Parse task objectives
 */
function parseTask(content: string): string[] {
  const taskMatch = content.match(/# TASK\s*([\s\S]*?)(?=\n---|\n#[^#])/i)
  const taskText = taskMatch?.[1] ?? ""

  const tasks: string[] = []
  const taskRegex = /\d+\.\s+\*\*([^*]+)\*\*\s*(.+)?/g
  let match
  while ((match = taskRegex.exec(taskText)) !== null) {
    const matchText = match[1] ?? ""
    const matchDesc = match[2]
    tasks.push(matchText.trim() + (matchDesc ? ` - ${matchDesc.trim()}` : ""))
  }

  // Fallback: simple numbered list
  if (tasks.length === 0) {
    const simpleTaskRegex = /\d+\.\s+(.+)/g
    while ((match = simpleTaskRegex.exec(taskText)) !== null) {
      const matchItem = match[1] ?? ""
      tasks.push(matchItem.trim())
    }
  }

  return tasks
}

/**
 * Parse conversation flow phases
 */
function parseConversationFlow(
  content: string
): ParsedPrompt["conversationFlow"] {
  const flowMatch = content.match(
    /# CONVERSATION FLOW\s*([\s\S]*?)(?=\n# EXAMPLE|\n# OBJECTION|\n---)/i
  )
  const flowText = flowMatch?.[1] ?? ""

  const phases: ParsedPrompt["conversationFlow"] = []
  const phaseRegex = /## Phase \d+:\s*([^\n]+)\s*([\s\S]*?)(?=## Phase|\n---|\n#[^#]|$)/gi
  let match
  while ((match = phaseRegex.exec(flowText)) !== null) {
    const phase = match[1] ?? ""
    const phaseContent = match[2] ?? ""
    phases.push({
      phase: phase.trim(),
      content: phaseContent.trim(),
    })
  }

  return phases
}

/**
 * Parse example conversations
 */
function parseExampleConversations(
  content: string
): ParsedPrompt["exampleConversations"] {
  const examplesMatch = content.match(
    /# EXAMPLE CONVERSATIONS\s*([\s\S]*?)(?=\n# OBJECTION|\n---|\n#[^#])/i
  )
  const examplesText = examplesMatch?.[1] ?? ""

  const examples: ParsedPrompt["exampleConversations"] = []
  const exampleRegex = /## Example \d+:\s*([^\n]+)\s*([\s\S]*?)(?=## Example|$)/gi
  let match
  while ((match = exampleRegex.exec(examplesText)) !== null) {
    const title = match[1] ?? ""
    const dialogue = match[2] ?? ""
    examples.push({
      title: title.trim(),
      dialogue: dialogue.trim(),
    })
  }

  return examples
}

/**
 * Parse objection handling
 */
function parseObjectionHandling(
  content: string
): ParsedPrompt["objectionHandling"] {
  const objectionMatch = content.match(
    /# OBJECTION HANDLING\s*([\s\S]*?)(?=\n# VOICE|\n---|\n#[^#])/i
  )
  const objectionText = objectionMatch?.[1] ?? ""

  const categories: ParsedPrompt["objectionHandling"] = []
  const categoryRegex = /## ([^\n]+)\s*([\s\S]*?)(?=## |\n---|\n#[^#]|$)/gi
  let match
  while ((match = categoryRegex.exec(objectionText)) !== null) {
    const categoryName = match[1] ?? ""
    const categoryContent = match[2] ?? ""
    const objections: { trigger: string; response: string }[] = []
    const objectionItemRegex = /- \[ If "([^"]+)" \] ->\s*"([^"]+)"/g
    let objMatch
    while ((objMatch = objectionItemRegex.exec(categoryContent)) !== null) {
      const trigger = objMatch[1] ?? ""
      const response = objMatch[2] ?? ""
      objections.push({
        trigger,
        response,
      })
    }
    if (objections.length > 0) {
      categories.push({
        category: categoryName.trim(),
        objections,
      })
    }
  }

  return categories
}

/**
 * Parse voice optimization settings
 */
function parseVoiceOptimization(content: string): ParsedPrompt["voiceOptimization"] {
  const voiceMatch = content.match(
    /# VOICE OPTIMIZATION\s*([\s\S]*?)(?=\n# BEGIN|\n---|\n#[^#]|$)/i
  )
  const voiceText = voiceMatch?.[1] ?? ""

  // Parse response length
  const responseLength: string[] = []
  const lengthRegex = /- ([^:]+):\s*(.+)/g
  let match
  while ((match = lengthRegex.exec(voiceText)) !== null) {
    const lengthName = match[1] ?? ""
    const lengthValue = match[2] ?? ""
    if (!lengthName.includes("Emotion") && !lengthName.includes("Scenario")) {
      responseLength.push(`${lengthName.trim()}: ${lengthValue.trim()}`)
    }
  }

  // Parse emotion tags table
  const emotionTags: { scenario: string; emotion: string }[] = []
  const tableMatch = voiceText.match(
    /\| Scenario \| Emotion \|\s*\|[-|]+\|\s*([\s\S]*?)(?=\n\n|\n##|$)/i
  )
  if (tableMatch) {
    const tableContent = tableMatch[1] ?? ""
    const rows = tableContent.split("\n").filter((r) => r.trim())
    for (const row of rows) {
      const cols = row.split("|").map((c) => c.trim()).filter(Boolean)
      if (cols.length >= 2) {
        emotionTags.push({
          scenario: cols[0] ?? "",
          emotion: (cols[1] ?? "").replace(/`/g, ""),
        })
      }
    }
  }

  return { responseLength, emotionTags }
}

/**
 * Load and parse a prompt file
 */
export async function loadPrompt(slug: AgentSlug): Promise<ParsedPrompt | null> {
  const agent = AGENT_TYPES[slug]
  if (!agent) {
    console.error(`Agent not found: ${slug}`)
    return null
  }

  try {
    // Resolve path relative to project root
    const promptPath = path.join(process.cwd(), "..", "..", agent.promptPath)
    const content = await fs.readFile(promptPath, "utf-8")

    return {
      quickReference: parseQuickReference(content),
      role: parseRole(content),
      personality: parsePersonality(content),
      context: parseContext(content),
      task: parseTask(content),
      conversationFlow: parseConversationFlow(content),
      exampleConversations: parseExampleConversations(content),
      objectionHandling: parseObjectionHandling(content),
      voiceOptimization: parseVoiceOptimization(content),
      rawContent: content,
    }
  } catch (error) {
    console.error(`Failed to load prompt for ${slug}:`, error)
    return null
  }
}

/**
 * Get prompt preview (first 500 chars of role section)
 */
export async function getPromptPreview(slug: AgentSlug): Promise<string> {
  const prompt = await loadPrompt(slug)
  if (!prompt) return ""

  const preview = prompt.role.slice(0, 500)
  return preview.length < prompt.role.length ? preview + "..." : preview
}

/**
 * Validate prompt file exists
 */
export async function promptExists(slug: AgentSlug): Promise<boolean> {
  const agent = AGENT_TYPES[slug]
  if (!agent) return false

  try {
    const promptPath = path.join(process.cwd(), "..", "..", agent.promptPath)
    await fs.access(promptPath)
    return true
  } catch {
    return false
  }
}
