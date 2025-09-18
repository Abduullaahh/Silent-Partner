import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateInvestorUpdateSummary(data: {
  revenue: string
  burnRate: string
  runway: string
  growth: string
  highlights?: string
  challenges?: string
  asks?: string
}) {

  const prompt = `You are a startup founder writing a professional investor update. Transform the provided data into a compelling, detailed investor update that tells a story of progress and growth.

Financial Metrics:
- Monthly Recurring Revenue: ${data.revenue}
- Monthly Burn Rate: ${data.burnRate}
- Runway: ${data.runway}
- Growth Rate: ${data.growth}

Key Highlights:
${data.highlights || 'No highlights provided'}

Current Challenges:
${data.challenges || 'No challenges provided'}

Investor Asks:
${data.asks || 'No asks provided'}

Create a professional investor update with the following structure:

## Executive Summary
Write 3-4 sentences that paint a picture of the company's current state, trajectory, and key achievements. Use the financial metrics to tell a story of growth, efficiency, and strategic positioning. Make it compelling and investor-focused.

## Key Highlights
Transform the provided highlights into detailed, impactful bullet points that demonstrate:
- Specific achievements with quantified results where possible
- Strategic initiatives and their impact
- Team growth and capabilities
- Customer success metrics
- Product development milestones
- Market positioning wins

## Current Challenges & Mitigation
Expand the challenges into a thoughtful analysis that shows:
- Honest assessment of current obstacles
- Specific mitigation strategies being implemented
- Timeline for resolution
- How challenges are being turned into opportunities
- Risk management approach

## How You Can Help
Transform the asks into specific, actionable requests that show:
- Clear value proposition for potential connections
- Specific types of introductions needed
- Areas where expertise would be most valuable
- How investors can add strategic value beyond capital

Tone: Professional, confident, transparent, and growth-oriented. Write as if addressing sophisticated investors who understand startups and want to see both progress and honest challenges.`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert startup advisor and investor relations specialist. Your job is to transform basic startup data into compelling, professional investor updates that tell a story of growth and opportunity. Take the user's raw input and enhance it with professional language, strategic context, and investor-focused insights while maintaining authenticity and accuracy. Focus on creating content that builds investor confidence and demonstrates the company's potential."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.5,
    })

    return completion.choices[0]?.message?.content || "Unable to generate summary"
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw new Error('Failed to generate AI summary')
  }
}
