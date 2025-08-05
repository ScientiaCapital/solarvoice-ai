import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'

// Mock the Framer Motion to avoid animation issues in tests
jest.mock('framer-motion', () => {
  const React = require('react')
  return {
    motion: {
      div: React.forwardRef(({ children, ...props }: any, ref: any) => 
        React.createElement('div', { ...props, ref }, children)
      ),
      h1: React.forwardRef(({ children, ...props }: any, ref: any) => 
        React.createElement('h1', { ...props, ref }, children)
      ),
      p: React.forwardRef(({ children, ...props }: any, ref: any) => 
        React.createElement('p', { ...props, ref }, children)
      ),
      section: React.forwardRef(({ children, ...props }: any, ref: any) => 
        React.createElement('section', { ...props, ref }, children)
      ),
    },
    AnimatePresence: ({ children }: any) => children,
  }
})

describe('HomePage', () => {
  it('renders the main heading', () => {
    render(<HomePage />)
    
    const heading = screen.getByText(/Enterprise AI Agent/i)
    expect(heading).toBeInTheDocument()
  })

  it('renders the rental marketplace text', () => {
    render(<HomePage />)
    
    const marketplaceText = screen.getByText(/Rental Marketplace/i)
    expect(marketplaceText).toBeInTheDocument()
  })

  it('renders the explore button', () => {
    render(<HomePage />)
    
    const button = screen.getByRole('button', {
      name: /Explore AI Specialists/i,
    })
    
    expect(button).toBeInTheDocument()
  })

  it('renders all 5 AI agents', () => {
    render(<HomePage />)
    
    const agents = [
      'TITAN Agent', // Commercial Specialist
      'NOVA Agent',  // Customer Success
      'ATLAS Agent', // Performance Analytics
      'BOLT Agent',  // Sales Automation
      'APEX Agent',  // Utility-Scale
    ]
    
    agents.forEach(agent => {
      expect(screen.getByText(agent)).toBeInTheDocument()
    })
  })

  it('displays pricing information', () => {
    render(<HomePage />)
    
    expect(screen.getByText(/\$0.99 - \$299.99 per deployment/i)).toBeInTheDocument()
  })

  it('shows enterprise security certification', () => {
    render(<HomePage />)
    
    expect(screen.getByText(/Enterprise security certified/i)).toBeInTheDocument()
  })

  it('renders the quick deployment claim', () => {
    render(<HomePage />)
    
    expect(screen.getByText(/Deploy AI Agents in 30 Seconds/i)).toBeInTheDocument()
  })
})