'use client'

import { ReactNode, useState } from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Home,
  Bot,
  MessageSquare,
  BarChart3,
  Settings,
  CreditCard,
  Menu,
  X,
  User
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SidebarLayoutProps {
  children: ReactNode
}

// Main navigation items
const mainNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/agents', label: 'AI Agents', icon: Bot },
  { href: '/dashboard/conversations', label: 'Conversations', icon: MessageSquare },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
]

// Billing section items
const billingNavItems = [
  { href: '/billing', label: 'Billing', icon: CreditCard },
  { href: '/billing/plans', label: 'Plans', icon: CreditCard },
]

// Settings section items
const settingsNavItems = [
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

// Combined for backward compatibility
const navItems = [...mainNavItems, ...billingNavItems, ...settingsNavItems]

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 lg:hidden border-b bg-white shadow-sm">
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-lg">
              SV
            </div>
            <span className="text-xl font-semibold text-slate-900">SolarVoice</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="text-slate-700"
          >
            {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar - Hover to Expand */}
        <aside
          className={cn(
            "hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:flex-col bg-slate-900 transition-all duration-300 ease-in-out",
            isExpanded ? "lg:w-60" : "lg:w-16"
          )}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          {/* Logo */}
          <div className="flex h-16 items-center justify-center border-b border-slate-800 px-3">
            <Link href="/dashboard" className="flex items-center space-x-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-lg">
                SV
              </div>
              {isExpanded && (
                <span className="text-xl font-semibold text-white whitespace-nowrap">
                  SolarVoice
                </span>
              )}
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

              return (
                <Link
                  key={item.href}
                  href={item.href as Route}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-colors relative group",
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )}
                  title={!isExpanded ? item.label : undefined}
                >
                  <Icon className={cn("h-5 w-5 flex-shrink-0", isExpanded ? "mr-3" : "")} />
                  {isExpanded && (
                    <span className="whitespace-nowrap">{item.label}</span>
                  )}

                  {/* Tooltip for collapsed state */}
                  {!isExpanded && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                      {item.label}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-800"></div>
                    </div>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* User Section */}
          <div className="border-t border-slate-800 p-3">
            <div className={cn(
              "flex items-center rounded-lg px-3 py-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer",
              isExpanded ? "space-x-3" : "justify-center"
            )}>
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-700">
                <User className="h-4 w-4" />
              </div>
              {isExpanded && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">User</p>
                  <p className="text-xs text-slate-400 truncate">Account</p>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Mobile Drawer */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 transform bg-slate-900 transition-transform duration-300 ease-in-out lg:hidden",
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex h-16 items-center border-b border-slate-800 px-4">
              <Link
                href="/dashboard"
                className="flex items-center space-x-3"
                onClick={() => setIsMobileOpen(false)}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-lg">
                  SV
                </div>
                <span className="text-xl font-semibold text-white">SolarVoice</span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-4">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

                return (
                  <Link
                    key={item.href}
                    href={item.href as Route}
                    className={cn(
                      "flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    )}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>

            {/* User Section */}
            <div className="border-t border-slate-800 p-4">
              <div className="flex items-center space-x-3 rounded-lg px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700">
                  <User className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">User</p>
                  <p className="text-xs text-slate-400">Account</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          "lg:ml-16"
        )}>
          <div className="min-h-screen">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
