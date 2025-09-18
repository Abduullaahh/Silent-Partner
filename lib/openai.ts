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

  const prompt = `Generate a professional investor update summary using the EXACT data provided below. Do not use placeholders or brackets - use the actual information provided:

Financial Metrics:
- Monthly Recurring Revenue: ${data.revenue}
- Monthly Burn Rate: ${data.burnRate}
- Runway: ${data.runway}
- Growth Rate: ${data.growth}

Key Highlights (use exactly what was provided):
${data.highlights || 'No highlights provided'}

Current Challenges (use exactly what was provided):
${data.challenges || 'No challenges provided'}

Investor Asks (use exactly what was provided):
${data.asks || 'No asks provided'}

Please generate a structured investor update with the following format, using the ACTUAL data provided above:

## Executive Summary
Write 2-3 sentences summarizing the overall performance and outlook using the specific financial metrics and highlights provided.

## Key Highlights
Use the EXACT highlights provided above. If the highlights are specific and detailed, use them as-is. If they are brief, expand them professionally while keeping the core message.

## Current Challenges & Mitigation
Use the EXACT challenges provided above. If the challenges are specific and detailed, use them as-is. If they are brief, expand them professionally while keeping the core message.

## How You Can Help
Use the EXACT asks provided above. If the asks are specific and detailed, use them as-is. If they are brief, expand them professionally while keeping the core message.

CRITICAL: 
- Use the exact highlights, challenges, and asks provided above
- Do not generate generic content
- Do not use placeholders, brackets, or generic text
- If the provided content is brief, expand it professionally while preserving the original meaning
- Reference the specific numbers, highlights, challenges, and asks that were provided
- Keep the tone professional, confident, and transparent`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert startup advisor helping founders write professional investor updates. You must use the EXACT data provided by the user - never use placeholders, brackets, or generic text. Transform the user's input into professional, well-structured content while preserving all specific details, numbers, and information they provided. Focus on clarity, transparency, and maintaining investor confidence."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.3,
    })

    return completion.choices[0]?.message?.content || "Unable to generate summary"
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw new Error('Failed to generate AI summary')
  }
}
