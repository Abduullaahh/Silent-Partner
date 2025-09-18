import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Clock, FileText, Download, Zap } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">SP</span>
              </div>
              <span className="font-bold text-xl text-foreground">Silent Partner</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </Link>
              <Button variant="outline" size="sm">
                Sign In
              </Button>
              <Button size="sm">Start Free Trial</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-card border border-border/50 text-sm text-muted-foreground mb-8">
              <Zap className="w-4 h-4 mr-2 text-primary" />
              Trusted by 500+ startup founders
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance leading-tight">
              Investor Updates in{" "}
              <span className="text-primary relative">
                60 Seconds
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/20 rounded-full"></div>
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-12 text-pretty max-w-2xl mx-auto leading-relaxed">
              Stop wasting hours writing investor emails. Generate polished, professional updates instantly with AI that
              understands startup metrics.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button size="lg" className="text-lg px-8 py-6 h-auto">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto bg-transparent">
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">60s</div>
                <div className="text-muted-foreground">Average generation time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">500+</div>
                <div className="text-muted-foreground">Startup founders</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">10k+</div>
                <div className="text-muted-foreground">Updates generated</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Everything you need for professional updates</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built specifically for startup founders who value their time and investor relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 border-border/50 bg-background hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Fast Generation</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Generate professional updates in under 60 seconds. No more spending hours on investor communications.
              </p>
            </Card>

            <Card className="p-6 border-border/50 bg-background hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Investor-Ready Format</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Professional templates designed by VCs. Your updates will look polished and comprehensive.
              </p>
            </Card>

            <Card className="p-6 border-border/50 bg-background hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Simple PDF Export</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Export your updates as beautiful PDFs or copy-paste ready emails. Share however you prefer.
              </p>
            </Card>

            <Card className="p-6 border-border/50 bg-background hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No Learning Curve</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Simple form inputs, instant results. No complex setup or training required.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Simple, transparent pricing</h2>
            <p className="text-xl text-muted-foreground">Choose the plan that works for your startup</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 border-border/50 bg-background">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">Starter</h3>
                <div className="text-4xl font-bold text-foreground mb-2">
                  $29<span className="text-lg text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground">Perfect for early-stage startups</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Up to 10 updates per month
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  PDF export
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Email templates
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Basic support
                </li>
              </ul>
              <Button className="w-full bg-transparent" variant="outline">
                Start Free Trial
              </Button>
            </Card>

            <Card className="p-8 border-primary bg-background relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">Pro</h3>
                <div className="text-4xl font-bold text-foreground mb-2">
                  $79<span className="text-lg text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground">For growing startups</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Unlimited updates
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Advanced PDF customization
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Custom branding
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Priority support
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Analytics dashboard
                </li>
              </ul>
              <Button className="w-full">Start Free Trial</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">SP</span>
              </div>
              <span className="font-bold text-xl text-foreground">Silent Partner</span>
            </div>
            <div className="flex items-center space-x-8">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/40 text-center text-muted-foreground text-sm">
            © 2024 Silent Partner. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
