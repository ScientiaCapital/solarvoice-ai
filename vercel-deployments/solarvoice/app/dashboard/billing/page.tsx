"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CreditCard,
  Calendar,
  TrendingUp,
  Phone,
  Clock,
  CheckCircle2
} from "lucide-react";

export default function BillingPage() {
  // Mock data
  const currentPlan = {
    name: "Professional",
    price: "$99/month",
    nextBillingDate: "Jan 15, 2026",
    features: ["2,500 AI calls/month", "5 active agents", "Priority support"]
  };

  const usageMetrics = [
    {
      label: "AI Calls",
      used: 1847,
      total: 2500,
      icon: TrendingUp,
      color: "text-blue-600"
    },
    {
      label: "Voice Agents",
      used: 3,
      total: 5,
      icon: Phone,
      color: "text-purple-600"
    },
    {
      label: "Minutes Used",
      value: "4,230",
      subtitle: "this month",
      icon: Clock,
      color: "text-green-600"
    },
    {
      label: "Appointments Booked",
      value: "156",
      subtitle: "this month",
      icon: CheckCircle2,
      color: "text-orange-600"
    }
  ];

  const billingHistory = [
    {
      id: 1,
      date: "Dec 15, 2025",
      description: "Professional Plan - Monthly",
      amount: "$99.00",
      status: "paid"
    },
    {
      id: 2,
      date: "Nov 15, 2025",
      description: "Professional Plan - Monthly",
      amount: "$99.00",
      status: "paid"
    },
    {
      id: 3,
      date: "Oct 15, 2025",
      description: "Professional Plan - Monthly",
      amount: "$99.00",
      status: "paid"
    },
    {
      id: 4,
      date: "Sep 15, 2025",
      description: "Professional Plan - Monthly",
      amount: "$99.00",
      status: "paid"
    },
    {
      id: 5,
      date: "Aug 15, 2025",
      description: "Professional Plan - Monthly",
      amount: "$99.00",
      status: "paid"
    }
  ];

  const paymentMethod = {
    type: "Visa",
    last4: "4242",
    expiry: "12/26"
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", className: string }> = {
      paid: { variant: "default", className: "bg-green-100 text-green-800 hover:bg-green-100" },
      pending: { variant: "secondary", className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" },
      failed: { variant: "destructive", className: "bg-red-100 text-red-800 hover:bg-red-100" }
    };

    const config = variants[status] ?? variants.paid;
    return (
      <Badge variant={config!.variant} className={config!.className}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-8 p-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing & Usage</h1>
        <p className="text-muted-foreground mt-2">
          Manage your subscription and monitor usage
        </p>
      </div>

      {/* Current Plan Card */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{currentPlan.name} Plan</CardTitle>
              <CardDescription className="mt-2 text-lg font-semibold text-primary">
                {currentPlan.price}
              </CardDescription>
            </div>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              Change Plan
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ul className="space-y-2">
              {currentPlan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="flex items-center text-sm text-muted-foreground pt-4 border-t">
              <Calendar className="mr-2 h-4 w-4" />
              Next billing date: <span className="ml-1 font-medium text-foreground">{currentPlan.nextBillingDate}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Overview */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Usage Overview</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {usageMetrics.map((metric, index) => {
            const Icon = metric.icon;
            const hasProgress = 'used' in metric && 'total' in metric;
            const used = 'used' in metric ? metric.used : 0;
            const total = 'total' in metric ? metric.total : 0;
            const percentage = hasProgress && total > 0 ? (used / total) * 100 : 0;
            const displayValue = 'value' in metric ? metric.value : undefined;
            const displaySubtitle = 'subtitle' in metric ? metric.subtitle : undefined;

            return (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                      {metric.label}
                    </CardTitle>
                    <Icon className={`h-4 w-4 ${metric.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  {hasProgress ? (
                    <div className="space-y-2">
                      <div className="text-2xl font-bold">
                        {used.toLocaleString()} <span className="text-sm text-muted-foreground">/ {total.toLocaleString()}</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {Math.round(percentage)}% used
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-2xl font-bold">{displayValue}</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {displaySubtitle}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>
            Your recent invoices and payment history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-sm">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Description</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                  <th className="text-right py-3 px-4 font-medium text-sm">Invoice</th>
                </tr>
              </thead>
              <tbody>
                {billingHistory.map((invoice) => (
                  <tr key={invoice.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-4 text-sm">{invoice.date}</td>
                    <td className="py-3 px-4 text-sm">{invoice.description}</td>
                    <td className="py-3 px-4 text-sm font-medium">{invoice.amount}</td>
                    <td className="py-3 px-4">
                      {getStatusBadge(invoice.status)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm" className="text-primary">
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>
                Manage your payment information
              </CardDescription>
            </div>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              Update Payment Method
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-16 items-center justify-center rounded-md border bg-muted">
              <CreditCard className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">
                {paymentMethod.type} ending in ••••{paymentMethod.last4}
              </p>
              <p className="text-sm text-muted-foreground">
                Expires {paymentMethod.expiry}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
