"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export default function ExportPage() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("preview")

  const handleCopyEmail = async () => {
    const emailContent = `Subject: Q4 2024 Investor Update - Strong Growth Continues

Dear Investors,

I hope this message finds you well. I'm excited to share our Q4 2024 investor update with strong momentum across all key metrics.

## Key Metrics
• Monthly Recurring Revenue: $125,000 (+23% growth)
• Monthly Burn Rate: $45,000
• Runway: 18 months
• Customer Growth: +15% this quarter

## Executive Summary
We're excited to share strong momentum this quarter with $125K in MRR, representing 23% growth. Our current burn rate of $45K gives us 18 months of runway. The team continues to execute on our roadmap while maintaining healthy unit economics and sustainable growth.

## Key Highlights
• Launched new enterprise features that increased average deal size by 40%
• Signed 3 major enterprise clients including Fortune 500 company
• Expanded team with senior engineering hire from Google
• Achieved 95% customer satisfaction score in quarterly survey

## Challenges & Mitigation
Market conditions have created longer sales cycles, but we're adapting our strategy to focus on higher-value enterprise deals. We're also investing in customer success to improve retention and expansion revenue.

## How You Can Help
• Introductions to enterprise prospects in fintech and healthcare
• Connections to experienced VP of Sales candidates
• Feedback on our Series A deck as we prepare for next round

Thank you for your continued support. Please don't hesitate to reach out if you have any questions or would like to discuss any aspect of our progress.

Best regards,
John Doe
CEO, Silent Partner`

    await navigator.clipboard.writeText(emailContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadPDF = () => {
    // Simulate PDF download
    const link = document.createElement("a")
    link.href = "/sample-investor-update.pdf"
    link.download = "Q4-2024-Investor-Update.pdf"
    link.click()
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
                Generated Dec 15, 2024
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
                <h2 className="text-2xl font-bold text-foreground mb-2">Q4 2024 Investor Update</h2>
                <p className="text-muted-foreground">Silent Partner • December 15, 2024</p>
              </div>

              {/* KPI Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-card/50 rounded-lg border border-border/30">
                  <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground mb-1">$125K</div>
                  <div className="text-sm text-muted-foreground">Monthly Recurring Revenue</div>
                </div>
                <div className="text-center p-4 bg-card/50 rounded-lg border border-border/30">
                  <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-500 mb-1">+23%</div>
                  <div className="text-sm text-muted-foreground">Growth Rate</div>
                </div>
                <div className="text-center p-4 bg-card/50 rounded-lg border border-border/30">
                  <Target className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground mb-1">$45K</div>
                  <div className="text-sm text-muted-foreground">Monthly Burn Rate</div>
                </div>
                <div className="text-center p-4 bg-card/50 rounded-lg border border-border/30">
                  <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-500 mb-1">18mo</div>
                  <div className="text-sm text-muted-foreground">Runway</div>
                </div>
              </div>

              {/* Content Sections */}
              <div className="space-y-8">
                <section>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Executive Summary</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We're excited to share strong momentum this quarter with $125K in MRR, representing 23% growth. Our
                    current burn rate of $45K gives us 18 months of runway. The team continues to execute on our roadmap
                    while maintaining healthy unit economics and sustainable growth.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Key Highlights</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Launched new enterprise features that increased average deal size by 40%</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Signed 3 major enterprise clients including Fortune 500 company</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Expanded team with senior engineering hire from Google</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Achieved 95% customer satisfaction score in quarterly survey</span>
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Challenges & Mitigation</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Market conditions have created longer sales cycles, but we're adapting our strategy to focus on
                    higher-value enterprise deals. We're also investing in customer success to improve retention and
                    expansion revenue.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-foreground mb-4">How You Can Help</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Introductions to enterprise prospects in fintech and healthcare</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Connections to experienced VP of Sales candidates</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Feedback on our Series A deck as we prepare for next round</span>
                    </li>
                  </ul>
                </section>
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
