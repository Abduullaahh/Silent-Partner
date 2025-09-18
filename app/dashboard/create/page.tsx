"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  TrendingUp,
  DollarSign,
  Calendar,
  Target,
  AlertCircle,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"

export default function CreateUpdatePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [formData, setFormData] = useState({
    revenue: "",
    burnRate: "",
    runway: "",
    growth: "",
    highlights: "",
    challenges: "",
    asks: "",
  })

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsGenerating(false)
    setCurrentStep(3)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Dashboard</span>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-foreground">Create Investor Update</h1>
            <div className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step 1: Metrics Input */}
        {currentStep === 1 && (
          <Card className="p-8 border-border/50 bg-background">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-foreground mb-2">Financial Metrics</h2>
              <p className="text-muted-foreground">Enter your key financial data for this reporting period</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="revenue" className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span>Monthly Recurring Revenue (MRR)</span>
                </Label>
                <Input
                  id="revenue"
                  type="text"
                  placeholder="e.g., $125,000"
                  value={formData.revenue}
                  onChange={(e) => handleInputChange("revenue", e.target.value)}
                  className="h-12 bg-background border-border/50 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="growth" className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span>Growth Rate (%)</span>
                </Label>
                <Input
                  id="growth"
                  type="text"
                  placeholder="e.g., 23%"
                  value={formData.growth}
                  onChange={(e) => handleInputChange("growth", e.target.value)}
                  className="h-12 bg-background border-border/50 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="burnRate" className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-orange-500" />
                  <span>Monthly Burn Rate</span>
                </Label>
                <Input
                  id="burnRate"
                  type="text"
                  placeholder="e.g., $45,000"
                  value={formData.burnRate}
                  onChange={(e) => handleInputChange("burnRate", e.target.value)}
                  className="h-12 bg-background border-border/50 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="runway" className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span>Runway (months)</span>
                </Label>
                <Input
                  id="runway"
                  type="text"
                  placeholder="e.g., 18 months"
                  value={formData.runway}
                  onChange={(e) => handleInputChange("runway", e.target.value)}
                  className="h-12 bg-background border-border/50 focus:border-primary"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Button onClick={() => setCurrentStep(2)} size="lg" className="px-8">
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {/* Step 2: Qualitative Input */}
        {currentStep === 2 && (
          <Card className="p-8 border-border/50 bg-background">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-foreground mb-2">Business Updates</h2>
              <p className="text-muted-foreground">Share key highlights, challenges, and requests for your investors</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="highlights" className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  <span>Key Highlights</span>
                </Label>
                <Textarea
                  id="highlights"
                  placeholder="Share your biggest wins, product launches, partnerships, team additions, etc."
                  value={formData.highlights}
                  onChange={(e) => handleInputChange("highlights", e.target.value)}
                  className="min-h-[120px] bg-background border-border/50 focus:border-primary resize-none"
                />
                <p className="text-xs text-muted-foreground">Focus on measurable achievements and milestones</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="challenges" className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span>Current Challenges</span>
                </Label>
                <Textarea
                  id="challenges"
                  placeholder="Be transparent about obstacles, market conditions, or operational challenges you're facing."
                  value={formData.challenges}
                  onChange={(e) => handleInputChange("challenges", e.target.value)}
                  className="min-h-[120px] bg-background border-border/50 focus:border-primary resize-none"
                />
                <p className="text-xs text-muted-foreground">Transparency builds trust with investors</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="asks" className="flex items-center space-x-2">
                  <Lightbulb className="w-4 h-4 text-blue-500" />
                  <span>Investor Asks</span>
                </Label>
                <Textarea
                  id="asks"
                  placeholder="What specific help do you need? Introductions, expertise, additional funding, etc."
                  value={formData.asks}
                  onChange={(e) => handleInputChange("asks", e.target.value)}
                  className="min-h-[120px] bg-background border-border/50 focus:border-primary resize-none"
                />
                <p className="text-xs text-muted-foreground">Be specific about how investors can help</p>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)} size="lg" className="px-8">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleGenerate} size="lg" className="px-8" disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Update
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}

        {/* Step 3: Generated Output */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <Card className="p-8 border-border/50 bg-background">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-foreground mb-2">Your Investor Update</h2>
                <p className="text-muted-foreground">AI-generated professional update ready to send</p>
              </div>

              {/* KPI Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card className="p-4 bg-card border-border/30">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground mb-1">{formData.revenue || "$125K"}</div>
                    <div className="text-sm text-muted-foreground">MRR</div>
                  </div>
                </Card>
                <Card className="p-4 bg-card border-border/30">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500 mb-1">{formData.growth || "+23%"}</div>
                    <div className="text-sm text-muted-foreground">Growth</div>
                  </div>
                </Card>
                <Card className="p-4 bg-card border-border/30">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground mb-1">{formData.burnRate || "$45K"}</div>
                    <div className="text-sm text-muted-foreground">Burn Rate</div>
                  </div>
                </Card>
                <Card className="p-4 bg-card border-border/30">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-500 mb-1">{formData.runway || "18mo"}</div>
                    <div className="text-sm text-muted-foreground">Runway</div>
                  </div>
                </Card>
              </div>

              {/* AI Generated Summary */}
              <div className="space-y-6">
                <div className="p-6 bg-card/50 rounded-lg border border-border/30">
                  <h3 className="font-semibold text-foreground mb-3">Executive Summary</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We're excited to share strong momentum this quarter with {formData.revenue || "$125K"} in MRR,
                    representing {formData.growth || "23%"} growth. Our current burn rate of{" "}
                    {formData.burnRate || "$45K"} gives us {formData.runway || "18 months"} of runway. The team
                    continues to execute on our roadmap while maintaining healthy unit economics and sustainable growth.
                  </p>
                </div>

                <div className="p-6 bg-card/50 rounded-lg border border-border/30">
                  <h3 className="font-semibold text-foreground mb-3">Key Highlights</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {formData.highlights ||
                      "• Launched new enterprise features that increased average deal size by 40%\n• Signed 3 major enterprise clients including Fortune 500 company\n• Expanded team with senior engineering hire from Google\n• Achieved 95% customer satisfaction score in quarterly survey"}
                  </p>
                </div>

                <div className="p-6 bg-card/50 rounded-lg border border-border/30">
                  <h3 className="font-semibold text-foreground mb-3">Challenges & Mitigation</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {formData.challenges ||
                      "Market conditions have created longer sales cycles, but we're adapting our strategy to focus on higher-value enterprise deals. We're also investing in customer success to improve retention and expansion revenue."}
                  </p>
                </div>

                <div className="p-6 bg-card/50 rounded-lg border border-border/30">
                  <h3 className="font-semibold text-foreground mb-3">How You Can Help</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {formData.asks ||
                      "• Introductions to enterprise prospects in fintech and healthcare\n• Connections to experienced VP of Sales candidates\n• Feedback on our Series A deck as we prepare for next round"}
                  </p>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Edit Details
              </Button>
              <Button className="flex-1">Save Draft</Button>
              <Link href="/dashboard/export" className="flex-1">
                <Button className="w-full">
                  Continue to Export
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
