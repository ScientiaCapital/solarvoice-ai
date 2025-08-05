"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Building2, 
  Factory, 
  Zap, 
  DollarSign, 
  Clock, 
  Star,
  Play,
  Users,
  TrendingUp,
  BarChart3,
  Headphones,
  Activity
} from "lucide-react"

interface AgentMetrics {
  rating: number
  deployments: number
  successRate: number
  avgResponseTime: string
}

interface AgentCard3DProps {
  id: string
  name: string
  category: string
  description: string
  price: number
  icon: string
  gradient: [string, string]
  metrics: AgentMetrics
  features: string[]
  isPopular?: boolean
  onDeploy?: (agentId: string) => void
  onPreview?: (agentId: string) => void
}

const iconMap = {
  'building': Building2,
  'factory': Factory,
  'users': Users,
  'trending': TrendingUp,
  'zap': Zap,
  'chart': BarChart3
}

export function AgentCard3D({
  id,
  name,
  category,
  description,
  price,
  icon,
  gradient,
  metrics,
  features,
  isPopular = false,
  onDeploy,
  onPreview
}: AgentCard3DProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  const IconComponent = iconMap[icon as keyof typeof iconMap] || Building2
  
  const handleDeploy = () => {
    onDeploy?.(id)
  }
  
  const handlePreview = () => {
    onPreview?.(id)
  }
  
  return (
    <motion.div
      className="group perspective-1000 h-80"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Popular badge */}
      <AnimatePresence>
        {isPopular && (
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute -top-2 -right-2 z-10"
          >
            <Badge className="bg-gradient-to-r from-solar-500 to-solar-600 text-white shadow-lg">
              🔥 Popular
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Card container with flip animation */}
      <motion.div
        className="card-3d-flip w-full h-full preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front face */}
        <Card className="card-3d-front glass-card border-2 hover:border-primary/50 transition-all duration-300">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div 
                  className={`h-12 w-12 rounded-lg bg-gradient-to-br from-${gradient[0]} to-${gradient[1]} flex items-center justify-center`}
                  animate={isHovered ? { 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  } : { scale: 1, rotate: 0 }}
                  transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
                >
                  <IconComponent className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <CardTitle className="text-lg gradient-text-ai">{name}</CardTitle>
                  <Badge variant="secondary" className="text-xs">{category}</Badge>
                </div>
              </div>
              <div className="text-right">
                <motion.p 
                  className="text-lg font-bold text-primary"
                  animate={isHovered ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                  transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
                >
                  ${price}
                </motion.p>
                <p className="text-xs text-muted-foreground">per deployment</p>
              </div>
            </div>
            <CardDescription className="mt-2">
              {description}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {/* Metrics display */}
              <div className="flex items-center gap-2 text-sm">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">{metrics.rating}/5</span>
                <span className="text-muted-foreground">
                  ({metrics.deployments.toLocaleString()} deployments)
                </span>
              </div>
              
              {/* Performance indicators */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <Activity className="h-3 w-3 text-green-500" />
                  <span>{metrics.successRate}% success</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-blue-500" />
                  <span>{metrics.avgResponseTime}</span>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex gap-2">
                <Button 
                  className="flex-1 btn-glow"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeploy()
                  }}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Deploy
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePreview()
                  }}
                >
                  <Headphones className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Flip indicator */}
              <div className="text-center">
                <motion.div
                  className="text-xs text-muted-foreground flex items-center justify-center gap-1"
                  animate={isHovered ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.5 }}
                  transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
                >
                  Click to see details
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    ⟲
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Back face */}
        <Card className="card-3d-back glass-energy border-2 border-energy-300/50">
          <CardHeader>
            <CardTitle className="gradient-text-energy">{name} Details</CardTitle>
            <CardDescription>Advanced capabilities & features</CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {/* Feature list */}
              <div>
                <h4 className="text-sm font-semibold mb-2">Key Features:</h4>
                <ul className="space-y-1">
                  {features.map((feature, index) => (
                    <motion.li
                      key={index}
                      className="text-xs flex items-center gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-1 h-1 rounded-full bg-energy-500" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              {/* Performance chart mockup */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Performance Trend:</h4>
                <div className="flex items-end gap-1 h-16">
                  {[65, 72, 68, 85, 92, 89, 95].map((height, index) => (
                    <motion.div
                      key={index}
                      className="bg-gradient-to-t from-energy-500 to-energy-300 rounded-sm flex-1"
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Back button */}
              <div className="text-center pt-2">
                <motion.div
                  className="text-xs text-muted-foreground flex items-center justify-center gap-1 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  Click to flip back
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    ⟲
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Hover effects */}
      <AnimatePresence>
        {isHovered && (
          <>
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ zIndex: -1 }}
            />
            
            {/* Particle effects */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary rounded-full"
                initial={{ 
                  opacity: 0,
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  y: -50,
                  x: Math.random() * 20 - 10
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '100%'
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}