import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateInvestorUpdateSummary(data: {
  revenue: string
  burnRate: string
  runway: string
  growth: string
  highlights: string
  challenges: string
  asks: string
}) {
  const prompt = `Generate a professional investor update summary based on the following data:

Financial Metrics:
- Monthly Recurring Revenue: ${data.revenue}
- Monthly Burn Rate: ${data.burnRate}
- Runway: ${data.runway}
- Growth Rate: ${data.growth}

Key Highlights:
${data.highlights}

Current Challenges:
${data.challenges}

Investor Asks:
${data.asks}

Please generate a structured investor update with the following format:

## Executive Summary
[2-3 sentences summarizing the overall performance and outlook]

## Key Highlights
• [Highlight 1]
• [Highlight 2]
• [Highlight 3]

## Current Challenges & Mitigation
[Transparent discussion of challenges and how you're addressing them]

## How You Can Help
• [Specific ask 1]
• [Specific ask 2]
• [Specific ask 3]

Keep the tone professional, confident, and transparent. Focus on measurable achievements and be specific about challenges and asks.`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert startup advisor helping founders write professional investor updates. Focus on clarity, transparency, and maintaining investor confidence."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    })

    return completion.choices[0]?.message?.content || "Unable to generate summary"
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw new Error('Failed to generate AI summary')
  }
}
