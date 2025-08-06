"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Mic, 
  Edit, 
  Trash2, 
  Play,
  Globe,
  Brain,
  DollarSign,
  Clock,
  MoreVertical
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Agent {
  id: string
  name: string
  role: string
  languages: string[]
  knowledgeBases: string[]
  isActive: boolean
  testMode: boolean
  usageMinutes: number
  monthlyPrice: number
  createdAt: string
  lastUsed: string | null
}

export default function AgentsPage() {
  const router = useRouter()
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAgents()
  }, [])

  const fetchAgents = async () => {
    try {
      const response = await fetch('/api/agents/create')
      if (response.ok) {
        const data = await response.json()
        setAgents(data)
      }
    } catch (error) {
      console.error('Failed to fetch agents:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this agent?')) return
    
    try {
      const response = await fetch(`/api/agents/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setAgents(agents.filter(a => a.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete agent:', error)
    }
  }

  const handleTest = (id: string) => {
    router.push(`/dashboard/agents/test?id=${id}`)
  }

  const handleEdit = (id: string) => {
    router.push(`/dashboard/agents/edit/${id}`)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const getLanguageFlags = (languages: string[]) => {
    const flags: Record<string, string> = {
      'English': '🇺🇸',
      'Spanish': '🇪🇸',
      'French': '🇫🇷',
      'German': '🇩🇪',
    }
    return languages.map(lang => flags[lang] || '🌐').join(' ')
  }

  return (
    <div className="container max-w-6xl py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Your Voice Agents</h1>
          <p className="text-muted-foreground mt-2">
            Manage and test your custom AI voice agents
          </p>
        </div>
        <Button 
          onClick={() => router.push('/dashboard/agents/create')}
          className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Agent
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agents.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {agents.filter(a => a.isActive).length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Minutes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {agents.reduce((sum, a) => sum + a.usageMinutes, 0)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Monthly Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${agents.reduce((sum, a) => sum + Number(a.monthlyPrice), 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agents Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading agents...</div>
        </div>
      ) : agents.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center h-64">
            <Mic className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No agents yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Create your first voice agent to get started
            </p>
            <Button 
              onClick={() => router.push('/dashboard/agents/create')}
              variant="outline"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Agent
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    {agent.testMode ? (
                      <Badge variant="secondary">Testing</Badge>
                    ) : agent.isActive ? (
                      <Badge className="bg-green-500">Active</Badge>
                    ) : (
                      <Badge variant="outline">Inactive</Badge>
                    )}
                  </div>

                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center text-white font-bold text-lg">
                        {agent.name[0]}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{agent.name}</CardTitle>
                        <CardDescription>{agent.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Languages */}
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {getLanguageFlags(agent.languages)} {agent.languages.join(', ')}
                      </span>
                    </div>

                    {/* Knowledge Bases */}
                    <div className="flex items-start gap-2">
                      <Brain className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div className="flex flex-wrap gap-1">
                        {agent.knowledgeBases.slice(0, 3).map((kb) => (
                          <Badge key={kb} variant="secondary" className="text-xs">
                            {kb.replace('-', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Usage Stats */}
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {agent.usageMinutes} min used
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3 text-muted-foreground" />
                        <span className="font-semibold">
                          ${agent.monthlyPrice}/mo
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1"
                        onClick={() => handleTest(agent.id)}
                      >
                        <Play className="mr-1 h-3 w-3" />
                        Test
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1"
                        onClick={() => handleEdit(agent.id)}
                      >
                        <Edit className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(agent.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>

                    {/* Created Date */}
                    <div className="text-xs text-muted-foreground text-center pt-2 border-t">
                      Created {formatDate(agent.createdAt)}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Quick Tips */}
      <Card className="mt-8 bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">Quick Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
            • Each agent costs $99/month and includes up to 3 knowledge bases
          </p>
          <p className="text-sm text-muted-foreground">
            • Test your agents before deploying to ensure voice quality
          </p>
          <p className="text-sm text-muted-foreground">
            • Agents can speak English and Spanish for bilingual support
          </p>
          <p className="text-sm text-muted-foreground">
            • Usage minutes are tracked for billing and optimization
          </p>
        </CardContent>
      </Card>
    </div>
  )
}