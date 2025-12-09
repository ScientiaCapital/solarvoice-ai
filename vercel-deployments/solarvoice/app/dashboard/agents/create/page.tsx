"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Route } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sparkles, Mic, BookOpen, DollarSign, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

// Knowledge bases available for MVP
const KNOWLEDGE_BASES = [
  { id: 'solar-install', name: 'Solar Installation', icon: '☀️' },
  { id: 'safety', name: 'Safety Protocols', icon: '🦺' },
  { id: 'project-mgmt', name: 'Project Management', icon: '📊' },
  { id: 'electrical', name: 'Electrical Codes', icon: '⚡' },
  { id: 'permits', name: 'Permit Processing', icon: '📋' },
  { id: 'customer', name: 'Customer Relations', icon: '🤝' },
]

export default function CreateAgentPage() {
  const router = useRouter()
  const [prompt, setPrompt] = useState('')
  const [selectedKnowledge, setSelectedKnowledge] = useState<string[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [generatedAgent, setGeneratedAgent] = useState<any>(null)

  const handleKnowledgeToggle = (id: string) => {
    if (selectedKnowledge.includes(id)) {
      setSelectedKnowledge(selectedKnowledge.filter(k => k !== id))
    } else if (selectedKnowledge.length < 3) {
      setSelectedKnowledge([...selectedKnowledge, id])
    }
  }

  const handleCreate = async () => {
    if (!prompt.trim()) return
    
    setIsCreating(true)
    
    // Simulate AI parsing the prompt (in production, this would call an API)
    setTimeout(() => {
      // Parse the prompt to extract agent details
      const namematch = prompt.match(/named?\s+(\w+)/i)
      const name = namematch ? namematch[1] : 'Agent'
      
      const languages = []
      if (prompt.toLowerCase().includes('spanish')) languages.push('Spanish')
      if (prompt.toLowerCase().includes('english')) languages.push('English')
      if (languages.length === 0) languages.push('English')
      
      let role = 'Solar Specialist'
      if (prompt.toLowerCase().includes('commercial')) role = 'Commercial Project Manager'
      else if (prompt.toLowerCase().includes('residential')) role = 'Residential Sales Specialist'
      else if (prompt.toLowerCase().includes('technician')) role = 'Field Technician'
      else if (prompt.toLowerCase().includes('customer')) role = 'Customer Success Manager'
      
      setGeneratedAgent({
        name,
        role,
        languages,
        prompt,
        knowledgeBases: selectedKnowledge,
        voiceId: 'pNInz6obpgDQGcFmaJgB', // Default to Adam voice
        price: 99
      })
      
      setIsCreating(false)
    }, 1500)
  }

  const handleDeploy = async () => {
    if (!generatedAgent) return
    
    try {
      const response = await fetch('/api/agents/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(generatedAgent)
      })
      
      if (response.ok) {
        const agent = await response.json()
        router.push(`/dashboard/agents/${agent.id}` as Route)
      }
    } catch (error) {
      console.error('Failed to create agent:', error)
    }
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create Your Voice Agent</h1>
        <p className="text-muted-foreground mt-2">
          Describe your agent in plain English, just like creating an agent in Claude Code
        </p>
      </div>

      {/* Step 1: Prompt Input */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            Describe Your Agent
          </CardTitle>
          <CardDescription>
            Example: "Create Maria, a commercial solar project manager who speaks Spanish and English"
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Type your agent description here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="text-lg py-6"
              onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
            />
            
            <Button 
              onClick={handleCreate} 
              disabled={!prompt.trim() || isCreating}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
            >
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Agent...
                </>
              ) : (
                'Generate Agent'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Step 2: Knowledge Base Selection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-500" />
            Select Knowledge Bases
          </CardTitle>
          <CardDescription>
            Choose up to 3 knowledge areas for your agent (MVP limit)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {KNOWLEDGE_BASES.map((kb) => (
              <button
                key={kb.id}
                onClick={() => handleKnowledgeToggle(kb.id)}
                disabled={!selectedKnowledge.includes(kb.id) && selectedKnowledge.length >= 3}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedKnowledge.includes(kb.id)
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-950'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                } ${
                  !selectedKnowledge.includes(kb.id) && selectedKnowledge.length >= 3
                    ? 'opacity-50 cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
              >
                <div className="text-2xl mb-1">{kb.icon}</div>
                <div className="text-sm font-medium">{kb.name}</div>
              </button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            {selectedKnowledge.length}/3 knowledge bases selected
          </p>
        </CardContent>
      </Card>

      {/* Generated Agent Preview */}
      {generatedAgent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-2 border-green-500">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center text-white font-bold">
                    {generatedAgent.name[0]}
                  </div>
                  {generatedAgent.name}
                </span>
                <span className="text-green-500 text-sm">Ready to Deploy!</span>
              </CardTitle>
              <CardDescription>{generatedAgent.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mic className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Languages: {generatedAgent.languages.join(', ')}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Knowledge: {selectedKnowledge.length > 0 
                      ? KNOWLEDGE_BASES
                          .filter(kb => selectedKnowledge.includes(kb.id))
                          .map(kb => kb.name)
                          .join(', ')
                      : 'General Solar Knowledge'}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-semibold">
                    ${generatedAgent.price}/month
                  </span>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => router.push('/dashboard/agents/test')}
                >
                  Test Voice
                </Button>
                <Button 
                  onClick={handleDeploy}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  Deploy Agent
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Pricing Note */}
      <Card className="mt-6 bg-muted/50">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Base Tier Pricing (MVP)
            </p>
            <p className="text-2xl font-bold mt-1">$99/month</p>
            <p className="text-sm text-muted-foreground mt-2">
              Professional voice • Up to 3 knowledge bases • English & Spanish
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}