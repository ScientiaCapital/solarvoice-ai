import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'

describe('HomePage', () => {
  it('renders the heading', () => {
    render(<HomePage />)
    
    const heading = screen.getByRole('heading', {
      level: 1,
    })
    
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Solar Energy Solutions')
  })

  it('renders the get started button', () => {
    render(<HomePage />)
    
    const button = screen.getByRole('button', {
      name: /get started/i,
    })
    
    expect(button).toBeInTheDocument()
  })

  it('renders all feature cards', () => {
    render(<HomePage />)
    
    const features = [
      'Real-time Monitoring',
      'Predictive Analytics',
      'Smart Optimization',
      'Voice Control',
      'Maintenance Alerts',
      'Energy Trading',
    ]
    
    features.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument()
    })
  })

  it('renders the contact form', () => {
    render(<HomePage />)
    
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument()
  })
})
