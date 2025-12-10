import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MetricsCard } from "@/components/ui/metrics-card"
import {
  Mic,
  Phone,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Users,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  // Mock data - in production, fetch from API
  const metrics = {
    activeAgents: 3,
    totalCalls: 1284,
    totalMinutes: 4532,
    successRate: 94.2,
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your voice agents and call performance
          </p>
        </div>
        <Link href="/agents">
          <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
            <Mic className="h-4 w-4 mr-2" />
            Rent New Agent
          </Button>
        </Link>
      </div>

      {/* Quick stats with MetricsCard */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricsCard
          title="Active Agents"
          value={metrics.activeAgents}
          description="Currently deployed"
          icon={Mic}
          iconColor="text-orange-500"
          trend={{ value: "+1", isPositive: true }}
        />
        <MetricsCard
          title="Total Calls"
          value={metrics.totalCalls.toLocaleString()}
          description="This month"
          icon={Phone}
          iconColor="text-blue-500"
          trend={{ value: "+18%", isPositive: true }}
        />
        <MetricsCard
          title="Call Minutes"
          value={metrics.totalMinutes.toLocaleString()}
          description="This month"
          icon={Clock}
          iconColor="text-purple-500"
          trend={{ value: "+12%", isPositive: true }}
        />
        <MetricsCard
          title="Success Rate"
          value={`${metrics.successRate}%`}
          description="Calls handled successfully"
          icon={TrendingUp}
          iconColor="text-green-500"
          trend={{ value: "+2.3%", isPositive: true }}
        />
      </div>

      {/* Active agents and recent activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5 text-orange-500" />
              Active Agents
            </CardTitle>
            <CardDescription>
              Your deployed voice agents and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center">
                    <Mic className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Residential Solar Specialist</p>
                    <p className="text-xs text-muted-foreground">Solar &middot; Residential</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Mic className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Commercial HVAC Expert</p>
                    <p className="text-xs text-muted-foreground">HVAC &middot; Commercial</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-red-50 flex items-center justify-center">
                    <Mic className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Security Alarm Specialist</p>
                    <p className="text-xs text-muted-foreground">Low Voltage &middot; Residential</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
            </div>
            <Link href="/dashboard/agents">
              <Button variant="outline" className="w-full mt-4">
                Manage Agents
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-blue-500" />
              Recent Calls
            </CardTitle>
            <CardDescription>
              Latest call activity from your agents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Lead qualified - Solar install</p>
                  <p className="text-xs text-muted-foreground">Residential Solar Specialist - 12 min ago</p>
                </div>
                <span className="text-xs text-muted-foreground">4:32</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Appointment scheduled</p>
                  <p className="text-xs text-muted-foreground">Commercial HVAC Expert - 28 min ago</p>
                </div>
                <span className="text-xs text-muted-foreground">6:15</span>
              </div>
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Follow-up required</p>
                  <p className="text-xs text-muted-foreground">Security Alarm Specialist - 1 hour ago</p>
                </div>
                <span className="text-xs text-muted-foreground">2:48</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Quote request handled</p>
                  <p className="text-xs text-muted-foreground">Residential Solar Specialist - 2 hours ago</p>
                </div>
                <span className="text-xs text-muted-foreground">5:21</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View all calls
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to manage your voice agents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/agents">
              <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center gap-2">
                <Mic className="h-6 w-6 text-orange-500" />
                <span>Browse Agents</span>
              </Button>
            </Link>
            <Link href="/dashboard/agents">
              <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center gap-2">
                <Users className="h-6 w-6 text-blue-500" />
                <span>My Agents</span>
              </Button>
            </Link>
            <Link href="/dashboard/billing">
              <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center gap-2">
                <TrendingUp className="h-6 w-6 text-green-500" />
                <span>Billing</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
