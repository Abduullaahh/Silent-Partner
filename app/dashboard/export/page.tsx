"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { parseAISummary, formatSummaryForDisplay } from "@/lib/format-ai-summary"
import { RevenueTrend } from "@/components/charts/revenue-trend"
import { BurnRateChart } from "@/components/charts/burn-rate-chart"
import { MetricsComparison } from "@/components/charts/metrics-comparison"
import { GrowthTrajectory } from "@/components/charts/growth-trajectory"
import { getChartData } from "@/lib/chart-renderer"
import {
  ArrowLeft,
  Download,
  Mail,
  Copy,
  Check,
  FileText,
  Share2,
  Eye,
  Calendar,
  TrendingUp,
  DollarSign,
  Target,
} from "lucide-react"
import Link from "next/link"

interface UpdateData {
  id: string
  title: string
  revenue: string | null
  burnRate: string | null
  runway: string | null
  growth: string | null
  highlights: string | null
  challenges: string | null
  asks: string | null
  aiSummary: string | null
  createdAt: string
  status: string
}

export default function ExportPage() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("preview")
  const [updateData, setUpdateData] = useState<UpdateData | null>(null)
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const updateId = searchParams.get('id')

  useEffect(() => {
    if (updateId) {
      fetchUpdateData(updateId)
    } else {
      setLoading(false)
    }
  }, [updateId])

  const fetchUpdateData = async (id: string) => {
    try {
      const response = await fetch(`/api/updates/${id}`)
      if (response.ok) {
        const data = await response.json()
        setUpdateData(data)
      }
    } catch (error) {
      console.error('Error fetching update data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCopyEmail = async () => {
    if (!updateData) return
    
    const parsedSummary = updateData.aiSummary ? parseAISummary(updateData.aiSummary) : null
    
    const emailContent = `Subject: ${updateData.title}

Dear Investors,

I hope this message finds you well. I'm excited to share our investor update with strong momentum across all key metrics.

## Key Metrics
${updateData.revenue ? `• Monthly Recurring Revenue: ${updateData.revenue}` : ''}
${updateData.growth ? `• Growth Rate: ${updateData.growth}` : ''}
${updateData.burnRate ? `• Monthly Burn Rate: ${updateData.burnRate}` : ''}
${updateData.runway ? `• Runway: ${updateData.runway}` : ''}

## Executive Summary
${parsedSummary?.executiveSummary || updateData.aiSummary || 'Update summary will be generated here.'}

## Key Highlights
${parsedSummary?.highlights ? formatSummaryForDisplay(parsedSummary.highlights) : (updateData.highlights || 'Key highlights will be listed here.')}

## Challenges & Mitigation
${parsedSummary?.challenges ? formatSummaryForDisplay(parsedSummary.challenges) : (updateData.challenges || 'Current challenges and mitigation strategies will be outlined here.')}

## How You Can Help
${parsedSummary?.asks ? formatSummaryForDisplay(parsedSummary.asks) : (updateData.asks || 'Specific asks for investor support will be listed here.')}

Thank you for your continued support. Please don't hesitate to reach out if you have any questions or would like to discuss any aspect of our progress.

Best regards,
[Your Name]
CEO, [Company Name]`

    await navigator.clipboard.writeText(emailContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadPDF = async () => {
    if (!updateData) return
    
    try {
      const response = await fetch(`/api/updates/${updateData.id}/pdf`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `${updateData.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`
        link.click()
        window.URL.revokeObjectURL(url)
      } else {
        console.error('Failed to generate PDF')
      }
    } catch (error) {
      console.error('Error downloading PDF:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading update...</p>
        </div>
      </div>
    )
  }

  if (!updateData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Update not found</h1>
          <p className="text-muted-foreground mb-4">The requested update could not be found.</p>
          <Link href="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/dashboard/create"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Generator</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">SP</span>
              </div>
              <span className="font-bold text-xl text-foreground">Silent Partner</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Export Your Update</h1>
              <p className="text-muted-foreground">Download as PDF or copy as email - ready to send to investors</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-500/10 text-green-700 border-green-500/20">
                <Calendar className="w-3 h-3 mr-1" />
                Generated {new Date(updateData.createdAt).toLocaleDateString()}
              </Badge>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={handleDownloadPDF} size="lg" className="flex-1 sm:flex-none">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button
              onClick={handleCopyEmail}
              variant="outline"
              size="lg"
              className="flex-1 sm:flex-none bg-transparent"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Email
                </>
              )}
            </Button>
            <Button variant="outline" size="lg" className="flex-1 sm:flex-none bg-transparent">
              <Share2 className="w-4 h-4 mr-2" />
              Share Link
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preview" className="flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </TabsTrigger>
            <TabsTrigger value="pdf" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>PDF Format</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Email Format</span>
            </TabsTrigger>
          </TabsList>

          {/* Preview Tab */}
          <TabsContent value="preview" className="space-y-6">
            <Card className="p-8 border-border/50 bg-background">
              {/* Header */}
              <div className="text-center mb-8 pb-6 border-b border-border/30">
                <h2 className="text-2xl font-bold text-foreground mb-2">{updateData.title}</h2>
                <p className="text-muted-foreground">Silent Partner • {new Date(updateData.createdAt).toLocaleDateString()}</p>
              </div>

              {/* KPI Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {updateData.revenue && (
                  <div className="text-center p-4 bg-card/50 rounded-lg border border-border/30">
                    <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground mb-1">{updateData.revenue}</div>
                    <div className="text-sm text-muted-foreground">Monthly Recurring Revenue</div>
                  </div>
                )}
                {updateData.growth && (
                  <div className="text-center p-4 bg-card/50 rounded-lg border border-border/30">
                    <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-500 mb-1">{updateData.growth}</div>
                    <div className="text-sm text-muted-foreground">Growth Rate</div>
                  </div>
                )}
                {updateData.burnRate && (
                  <div className="text-center p-4 bg-card/50 rounded-lg border border-border/30">
                    <Target className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground mb-1">{updateData.burnRate}</div>
                    <div className="text-sm text-muted-foreground">Monthly Burn Rate</div>
                  </div>
                )}
                {updateData.runway && (
                  <div className="text-center p-4 bg-card/50 rounded-lg border border-border/30">
                    <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-500 mb-1">{updateData.runway}</div>
                    <div className="text-sm text-muted-foreground">Runway</div>
                  </div>
                )}
              </div>

              {/* Charts Section */}
              {updateData && (
                <div className="space-y-8">
                  <h3 className="text-xl font-semibold text-foreground">Performance Analytics</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="p-6">
                      <h4 className="text-lg font-medium text-foreground mb-4">Revenue Growth Trend</h4>
                      <RevenueTrend data={getChartData(updateData).revenueTrend} />
                    </Card>
                    <Card className="p-6">
                      <h4 className="text-lg font-medium text-foreground mb-4">Growth Trajectory vs Target</h4>
                      <GrowthTrajectory data={getChartData(updateData).growthTrajectory} />
                    </Card>
                    <Card className="p-6">
                      <h4 className="text-lg font-medium text-foreground mb-4">Burn Rate Analysis</h4>
                      <BurnRateChart data={getChartData(updateData).burnRate} />
                    </Card>
                    <Card className="p-6">
                      <h4 className="text-lg font-medium text-foreground mb-4">Metrics Comparison</h4>
                      <MetricsComparison data={getChartData(updateData).metricsComparison} />
                    </Card>
                  </div>
                </div>
              )}

              {/* Content Sections */}
              <div className="space-y-8">
                {(() => {
                  const parsedSummary = updateData.aiSummary ? parseAISummary(updateData.aiSummary) : null
                  
                  return (
                    <>
                      {/* Executive Summary */}
                      {(parsedSummary?.executiveSummary || updateData.aiSummary) && (
                        <section>
                          <h3 className="text-xl font-semibold text-foreground mb-4">Executive Summary</h3>
                          <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                            {parsedSummary?.executiveSummary || updateData.aiSummary}
                          </div>
                        </section>
                      )}

                      {/* Key Highlights */}
                      {(parsedSummary?.highlights || updateData.highlights) && (
                        <section>
                          <h3 className="text-xl font-semibold text-foreground mb-4">Key Highlights</h3>
                          <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                            {formatSummaryForDisplay(parsedSummary?.highlights || updateData.highlights || '')}
                          </div>
                        </section>
                      )}

                      {/* Challenges & Mitigation */}
                      {(parsedSummary?.challenges || updateData.challenges) && (
                        <section>
                          <h3 className="text-xl font-semibold text-foreground mb-4">Challenges & Mitigation</h3>
                          <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                            {formatSummaryForDisplay(parsedSummary?.challenges || updateData.challenges || '')}
                          </div>
                        </section>
                      )}

                      {/* How You Can Help */}
                      {(parsedSummary?.asks || updateData.asks) && (
                        <section>
                          <h3 className="text-xl font-semibold text-foreground mb-4">How You Can Help</h3>
                          <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                            {formatSummaryForDisplay(parsedSummary?.asks || updateData.asks || '')}
                          </div>
                        </section>
                      )}
                    </>
                  )
                })()}
              </div>
            </Card>
          </TabsContent>

          {/* PDF Tab */}
          <TabsContent value="pdf">
            <Card className="p-8 border-border/50 bg-background text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Professional PDF Export</h3>
                <p className="text-muted-foreground mb-6">
                  Download a beautifully formatted PDF that's ready to send to your investors. Includes charts, metrics,
                  and professional styling.
                </p>
                <Button onClick={handleDownloadPDF} size="lg" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF (2.3 MB)
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Email Tab */}
          <TabsContent value="email">
            <Card className="p-8 border-border/50 bg-background text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Email-Ready Format</h3>
                <p className="text-muted-foreground mb-6">
                  Copy the perfectly formatted email content and paste it directly into your email client. Subject line
                  and formatting included.
                </p>
                <Button onClick={handleCopyEmail} size="lg" className="w-full bg-transparent" variant="outline">
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      Copied to Clipboard!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Email Content
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Bottom Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard" className="flex-1">
            <Button variant="outline" className="w-full bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <Link href="/dashboard/create" className="flex-1">
            <Button variant="outline" className="w-full bg-transparent">
              Create Another Update
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
