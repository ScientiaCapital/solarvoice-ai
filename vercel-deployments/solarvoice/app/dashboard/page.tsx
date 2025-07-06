import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ArrowUpRight, 
  Sun, 
  Zap, 
  TrendingUp,
  AlertCircle,
  Battery,
  Cloud
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor your solar energy system performance in real-time
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Current Output
            </CardTitle>
            <Sun className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2 kW</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                12%
              </span>
              {" "}from last hour
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Daily Production
            </CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28.5 kWh</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                8%
              </span>
              {" "}from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Battery Status
            </CardTitle>
            <Battery className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">
              Charging at 2.1 kW
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              CO₂ Saved
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 tons</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* System status and alerts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              Real-time status of your solar panels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm font-medium">Panel Array A</span>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm font-medium">Panel Array B</span>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm font-medium">Inverter</span>
                </div>
                <Badge variant="success">Optimal</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-500" />
                  <span className="text-sm font-medium">Battery System</span>
                </div>
                <Badge variant="warning">Charging</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>
              System notifications and warnings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Partial shading detected</p>
                  <p className="text-xs text-muted-foreground">Panel Array B - 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Cloud className="h-5 w-5 text-blue-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Weather alert</p>
                  <p className="text-xs text-muted-foreground">Cloudy conditions expected - 5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Peak production achieved</p>
                  <p className="text-xs text-muted-foreground">32.5 kWh daily record - Yesterday</p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View all alerts
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Energy production chart placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Energy Production</CardTitle>
          <CardDescription>
            Daily energy production over the last 7 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            Chart will be displayed here
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
