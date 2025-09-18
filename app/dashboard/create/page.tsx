"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { createUpdateSchema, type CreateUpdateInput } from "@/lib/validations"
import { parseAISummary, formatSummaryForDisplay } from "@/lib/format-ai-summary"
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
import { useRouter } from "next/navigation"

export default function CreateUpdatePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [updateId, setUpdateId] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<CreateUpdateInput>({
    resolver: zodResolver(createUpdateSchema),
    defaultValues: {
      title: `Q${Math.ceil((new Date().getMonth() + 1) / 3)} ${new Date().getFullYear()} Investor Update`,
      revenue: "",
      burnRate: "",
      runway: "",
      growth: "",
      highlights: "",
      challenges: "",
      asks: "",
      aiSummary: "",
    }
  })

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100


  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      // First save the update to get an ID
      const formData = {
        title: form.watch('title'),
        revenue: form.watch('revenue'),
        burnRate: form.watch('burnRate'),
        runway: form.watch('runway'),
        growth: form.watch('growth'),
        highlights: form.watch('highlights') || '',
        challenges: form.watch('challenges') || '',
        asks: form.watch('asks') || '',
      }

      const response = await fetch('/api/updates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to save update')
      }

      const update = await response.json()
      setUpdateId(update.id)

      // Generate AI summary using the API
      const summaryResponse = await fetch(`/api/updates/${update.id}/generate-summary`, {
        method: 'POST',
      })

      if (!summaryResponse.ok) {
        throw new Error('Failed to generate AI summary')
      }

      const { aiSummary } = await summaryResponse.json()
      
      // Update the form with AI summary
      form.setValue('aiSummary', aiSummary)
      
      setCurrentStep(3)
    } catch (error) {
      console.error('Error generating update:', error)
      // Handle error - you might want to show a toast or error message
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSaveDraft = async () => {
    setIsSaving(true)
    try {
      // Get current form values using watch
      const formData = {
        title: form.watch('title'),
        revenue: form.watch('revenue'),
        burnRate: form.watch('burnRate'),
        runway: form.watch('runway'),
        growth: form.watch('growth'),
        highlights: form.watch('highlights'),
        challenges: form.watch('challenges'),
        asks: form.watch('asks'),
      }
      
      const response = await fetch('/api/updates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to save update')
      }

      const update = await response.json()
      setUpdateId(update.id)
      
      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error) {
      console.error('Error saving update:', error)
      // Handle error
    } finally {
      setIsSaving(false)
    }
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
                  value={form.watch('revenue') || ''}
                  onChange={(e) => form.setValue('revenue', e.target.value)}
                  className="h-12 bg-background border-border/50 focus:border-primary"
                />
                {form.formState.errors.revenue && (
                  <p className="text-sm text-red-500">{form.formState.errors.revenue.message}</p>
                )}
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
                  value={form.watch('growth') || ''}
                  onChange={(e) => form.setValue('growth', e.target.value)}
                  className="h-12 bg-background border-border/50 focus:border-primary"
                />
                {form.formState.errors.growth && (
                  <p className="text-sm text-red-500">{form.formState.errors.growth.message}</p>
                )}
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
                  value={form.watch('burnRate') || ''}
                  onChange={(e) => form.setValue('burnRate', e.target.value)}
                  className="h-12 bg-background border-border/50 focus:border-primary"
                />
                {form.formState.errors.burnRate && (
                  <p className="text-sm text-red-500">{form.formState.errors.burnRate.message}</p>
                )}
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
                  value={form.watch('runway') || ''}
                  onChange={(e) => form.setValue('runway', e.target.value)}
                  className="h-12 bg-background border-border/50 focus:border-primary"
                />
                {form.formState.errors.runway && (
                  <p className="text-sm text-red-500">{form.formState.errors.runway.message}</p>
                )}
              </div>
            </div>


            <div className="mt-8 flex justify-end">
              <Button 
                onClick={async () => {
                  // Get current form values using watch
                  const revenue = form.watch('revenue')
                  const burnRate = form.watch('burnRate')
                  const runway = form.watch('runway')
                  const growth = form.watch('growth')
                  
                  
                  // Check if required fields have values
                  const hasRequiredFields = revenue && burnRate && runway && growth
                  
                  if (hasRequiredFields) {
                    setCurrentStep(2)
                  } else {
                    // Trigger validation to show errors
                    await form.trigger(['revenue', 'burnRate', 'runway', 'growth'])
                  }
                }} 
                size="lg" 
                className="px-8"
              >
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
                  {...form.register("highlights")}
                  className="min-h-[120px] bg-background border-border/50 focus:border-primary resize-none"
                />
                <p className="text-xs text-muted-foreground">Focus on measurable achievements and milestones</p>
                {form.formState.errors.highlights && (
                  <p className="text-sm text-red-500">{form.formState.errors.highlights.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="challenges" className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span>Current Challenges</span>
                </Label>
                <Textarea
                  id="challenges"
                  placeholder="Be transparent about obstacles, market conditions, or operational challenges you're facing."
                  {...form.register("challenges")}
                  className="min-h-[120px] bg-background border-border/50 focus:border-primary resize-none"
                />
                <p className="text-xs text-muted-foreground">Transparency builds trust with investors</p>
                {form.formState.errors.challenges && (
                  <p className="text-sm text-red-500">{form.formState.errors.challenges.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="asks" className="flex items-center space-x-2">
                  <Lightbulb className="w-4 h-4 text-blue-500" />
                  <span>Investor Asks</span>
                </Label>
                <Textarea
                  id="asks"
                  placeholder="What specific help do you need? Introductions, expertise, additional funding, etc."
                  {...form.register("asks")}
                  className="min-h-[120px] bg-background border-border/50 focus:border-primary resize-none"
                />
                <p className="text-xs text-muted-foreground">Be specific about how investors can help</p>
                {form.formState.errors.asks && (
                  <p className="text-sm text-red-500">{form.formState.errors.asks.message}</p>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)} size="lg" className="px-8">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={async () => {
                  // Get current form values using watch
                  const revenue = form.watch('revenue')
                  const burnRate = form.watch('burnRate')
                  const runway = form.watch('runway')
                  const growth = form.watch('growth')
                  
                  
                  // Check if all required fields have values
                  const hasAllRequiredFields = revenue && burnRate && runway && growth
                  
                  if (hasAllRequiredFields) {
                    handleGenerate()
                  } else {
                    // Trigger validation to show errors
                    await form.trigger()
                  }
                }} 
                size="lg" 
                className="px-8" 
                disabled={isGenerating}
              >
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
                    <div className="text-2xl font-bold text-foreground mb-1">{form.watch("revenue") || "$125K"}</div>
                    <div className="text-sm text-muted-foreground">MRR</div>
                  </div>
                </Card>
                <Card className="p-4 bg-card border-border/30">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500 mb-1">{form.watch("growth") || "+23%"}</div>
                    <div className="text-sm text-muted-foreground">Growth</div>
                  </div>
                </Card>
                <Card className="p-4 bg-card border-border/30">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground mb-1">{form.watch("burnRate") || "$45K"}</div>
                    <div className="text-sm text-muted-foreground">Burn Rate</div>
                  </div>
                </Card>
                <Card className="p-4 bg-card border-border/30">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-500 mb-1">{form.watch("runway") || "18mo"}</div>
                    <div className="text-sm text-muted-foreground">Runway</div>
                  </div>
                </Card>
              </div>

              {/* AI Generated Summary */}
              <div className="space-y-6">
                {form.watch("aiSummary") ? (
                  (() => {
                    const parsedSummary = parseAISummary(form.watch("aiSummary") || "")
                    return (
                      <div className="space-y-6">
                        {parsedSummary.executiveSummary && (
                          <div className="p-6 bg-card/50 rounded-lg border border-border/30">
                            <h3 className="font-semibold text-foreground mb-3">Executive Summary</h3>
                            <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                              {parsedSummary.executiveSummary}
                            </div>
                          </div>
                        )}
                        
                        {parsedSummary.highlights && (
                          <div className="p-6 bg-card/50 rounded-lg border border-border/30">
                            <h3 className="font-semibold text-foreground mb-3">Key Highlights</h3>
                            <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                              {formatSummaryForDisplay(parsedSummary.highlights)}
                            </div>
                          </div>
                        )}
                        
                        {parsedSummary.challenges && (
                          <div className="p-6 bg-card/50 rounded-lg border border-border/30">
                            <h3 className="font-semibold text-foreground mb-3">Challenges & Mitigation</h3>
                            <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                              {formatSummaryForDisplay(parsedSummary.challenges)}
                            </div>
                          </div>
                        )}
                        
                        {parsedSummary.asks && (
                          <div className="p-6 bg-card/50 rounded-lg border border-border/30">
                            <h3 className="font-semibold text-foreground mb-3">How You Can Help</h3>
                            <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                              {formatSummaryForDisplay(parsedSummary.asks)}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })()
                ) : (
                  <>
                    <div className="p-6 bg-card/50 rounded-lg border border-border/30">
                      <h3 className="font-semibold text-foreground mb-3">Executive Summary</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        We&apos;re excited to share strong momentum this quarter with {form.watch("revenue") || "$125K"} in MRR,
                        representing {form.watch("growth") || "23%"} growth. Our current burn rate of{" "}
                        {form.watch("burnRate") || "$45K"} gives us {form.watch("runway") || "18 months"} of runway. The team
                        continues to execute on our roadmap while maintaining healthy unit economics and sustainable growth.
                      </p>
                    </div>

                    <div className="p-6 bg-card/50 rounded-lg border border-border/30">
                      <h3 className="font-semibold text-foreground mb-3">Key Highlights</h3>
                      <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {form.watch("highlights") ||
                          "• Launched new enterprise features that increased average deal size by 40%\n• Signed 3 major enterprise clients including Fortune 500 company\n• Expanded team with senior engineering hire from Google\n• Achieved 95% customer satisfaction score in quarterly survey"}
                      </div>
                    </div>

                    <div className="p-6 bg-card/50 rounded-lg border border-border/30">
                      <h3 className="font-semibold text-foreground mb-3">Challenges & Mitigation</h3>
                      <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {form.watch("challenges") ||
                          "Market conditions have created longer sales cycles, but we're adapting our strategy to focus on higher-value enterprise deals. We're also investing in customer success to improve retention and expansion revenue."}
                      </div>
                    </div>

                    <div className="p-6 bg-card/50 rounded-lg border border-border/30">
                      <h3 className="font-semibold text-foreground mb-3">How You Can Help</h3>
                      <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {form.watch("asks") ||
                          "• Introductions to enterprise prospects in fintech and healthcare\n• Connections to experienced VP of Sales candidates\n• Feedback on our Series A deck as we prepare for next round"}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Edit Details
              </Button>
              <Button 
                onClick={handleSaveDraft} 
                disabled={isSaving}
                className="flex-1"
              >
                {isSaving ? "Saving..." : "Save Draft"}
              </Button>
              {updateId && (
                <Link href={`/dashboard/export?id=${updateId}`} className="flex-1">
                  <Button className="w-full">
                    Continue to Export
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
