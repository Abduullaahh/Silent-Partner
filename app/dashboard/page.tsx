import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText, Calendar, TrendingUp, Download, MoreHorizontal, Search, Filter, Bell } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const updates = [
    {
      id: 1,
      title: "Q4 2024 Investor Update",
      date: "2024-12-15",
      status: "sent",
      revenue: "$125K",
      growth: "+23%",
      recipients: 8,
    },
    {
      id: 2,
      title: "November Progress Report",
      date: "2024-11-30",
      status: "draft",
      revenue: "$118K",
      growth: "+18%",
      recipients: 0,
    },
    {
      id: 3,
      title: "Q3 2024 Investor Update",
      date: "2024-09-30",
      status: "sent",
      revenue: "$98K",
      growth: "+15%",
      recipients: 8,
    },
    {
      id: 4,
      title: "August Milestone Update",
      date: "2024-08-31",
      status: "sent",
      revenue: "$89K",
      growth: "+12%",
      recipients: 6,
    },
    {
      id: 5,
      title: "July Performance Review",
      date: "2024-07-31",
      status: "sent",
      revenue: "$82K",
      growth: "+8%",
      recipients: 6,
    },
    {
      id: 6,
      title: "Q2 2024 Investor Update",
      date: "2024-06-30",
      status: "sent",
      revenue: "$75K",
      growth: "+5%",
      recipients: 6,
    },
    {
      id: 7,
      title: "May Growth Update",
      date: "2024-05-31",
      status: "sent",
      revenue: "$68K",
      growth: "+3%",
      recipients: 5,
    },
    {
      id: 8,
      title: "April Progress Report",
      date: "2024-04-30",
      status: "sent",
      revenue: "$62K",
      growth: "+2%",
      recipients: 5,
    },
    {
      id: 9,
      title: "March Milestone Update",
      date: "2024-03-31",
      status: "sent",
      revenue: "$58K",
      growth: "+1%",
      recipients: 4,
    },
    {
      id: 10,
      title: "Q1 2024 Investor Update",
      date: "2024-03-31",
      status: "sent",
      revenue: "$55K",
      growth: "0%",
      recipients: 4,
    },
  ]

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm flex-shrink-0">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">SP</span>
                </div>
                <span className="font-bold text-xl text-foreground">Silent Partner</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/founder-headshot.png" />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 flex-1 flex flex-col overflow-hidden">
        {/* Welcome Section */}
        <div className="mb-8 flex-shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, John</h1>
              <p className="text-muted-foreground">Ready to create your next investor update?</p>
            </div>
            <Link href="/dashboard/create">
              <Button size="lg" className="h-12 px-6">
                <Plus className="w-5 h-5 mr-2" />
                Create New Update
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 flex-shrink-0">
          <Card className="p-6 border-border/50 bg-background">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Updates</p>
                <p className="text-2xl font-bold text-foreground">12</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500">+2 this month</span>
            </div>
          </Card>

          <Card className="p-6 border-border/50 bg-background">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Current MRR</p>
                <p className="text-2xl font-bold text-foreground">$125K</p>
              </div>
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500">+23% growth</span>
            </div>
          </Card>

          <Card className="p-6 border-border/50 bg-background">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Investors</p>
                <p className="text-2xl font-bold text-foreground">8</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="bg-blue-500 text-white text-xs">8</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-muted-foreground">Last update sent Dec 15</span>
            </div>
          </Card>
        </div>

        {/* Updates List */}
        <div className="flex-1 flex flex-col min-h-0">
          <Card className="border-border/50 bg-background h-full flex flex-col">
            <div className="p-6 border-b border-border/40 flex-shrink-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-1">Recent Updates</h2>
                  <p className="text-muted-foreground">Manage your investor communications</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="divide-y divide-border/40">
                {updates.map((update) => (
                  <div key={update.id} className="p-6 hover:bg-card/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-foreground">{update.title}</h3>
                          <Badge
                            variant={update.status === "sent" ? "default" : "secondary"}
                            className={update.status === "sent" ? "bg-green-500/10 text-green-700 border-green-500/20" : ""}
                          >
                            {update.status === "sent" ? "Sent" : "Draft"}
                          </Badge>
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(update.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span>Revenue: {update.revenue}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span className="text-green-500">{update.growth}</span>
                          </div>
                          {update.status === "sent" && (
                            <div className="flex items-center space-x-1">
                              <span>{update.recipients} recipients</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {update.status === "sent" && (
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-border/40 bg-card/30 flex-shrink-0">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">Ready to create your next update?</p>
                <Link href="/dashboard/create">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Update
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
        </div>
      </div>
    </div>
  )
}
