import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to login */}
        <Link
          href="/auth/login"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to sign in
        </Link>

        <Card className="p-8 border-border/50 bg-background shadow-lg">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Reset your password</h1>
            <p className="text-muted-foreground text-pretty">
              Enter your email address and we&apos;ll send you a link to reset your password
            </p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 h-12 bg-background border-border/50 focus:border-primary"
                />
              </div>
            </div>

            <Button className="w-full h-12 text-base font-medium">Send Reset Link</Button>
          </form>

          <div className="mt-8 p-4 bg-card rounded-lg border border-border/50">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-foreground font-medium mb-1">Check your email</p>
                <p className="text-muted-foreground text-pretty">
                  We&apos;ll send password reset instructions to your email address if an account exists.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Remember your password?{" "}
              <Link href="/auth/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">Didn&apos;t receive an email? Check your spam folder</p>
        </div>
      </div>
    </div>
  )
}
