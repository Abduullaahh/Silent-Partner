export interface ParsedSummary {
  executiveSummary: string
  highlights: string
  challenges: string
  asks: string
}

export function parseAISummary(summary: string): ParsedSummary {
  // Split the summary into sections based on markdown headers
  const sections = summary.split(/(?=## )/g)
  
  const result: ParsedSummary = {
    executiveSummary: '',
    highlights: '',
    challenges: '',
    asks: ''
  }

  sections.forEach(section => {
    const lines = section.trim().split('\n')
    const header = lines[0]?.toLowerCase()
    const content = lines.slice(1).join('\n').trim()

    if (header?.includes('executive summary')) {
      result.executiveSummary = content
    } else if (header?.includes('highlights')) {
      result.highlights = content
    } else if (header?.includes('challenges')) {
      result.challenges = content
    } else if (header?.includes('how you can help')) {
      result.asks = content
    }
  })

  return result
}

export function formatSummaryForDisplay(content: string): string {
  // Convert markdown-style bullet points to HTML-friendly format
  return content
    .replace(/^• /gm, '• ')
    .replace(/^\- /gm, '• ')
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold formatting
    .replace(/\*(.*?)\*/g, '$1') // Remove italic formatting
    .trim()
}
