import jsPDF from 'jspdf'
import { parseAISummary, formatSummaryForDisplay } from './format-ai-summary'

export interface UpdateData {
  title: string
  revenue: string
  burnRate: string
  runway: string
  growth: string
  highlights: string
  challenges: string
  asks: string
  aiSummary: string
  createdAt: Date
}

export function generateInvestorUpdatePDF(data: UpdateData): jsPDF {
  const doc = new jsPDF()
  
  // Set up fonts and colors
  const primaryColor = '#2563eb'
  const textColor = '#1f2937'
  const mutedColor = '#6b7280'
  
  // Header
  doc.setFontSize(24)
  doc.setTextColor(primaryColor)
  doc.text('Silent Partner', 20, 30)
  
  doc.setFontSize(18)
  doc.setTextColor(textColor)
  doc.text(data.title, 20, 50)
  
  doc.setFontSize(12)
  doc.setTextColor(mutedColor)
  doc.text(`Generated on ${data.createdAt.toLocaleDateString()}`, 20, 60)
  
  // KPI Cards
  const cardY = 80
  const cardWidth = 40
  const cardHeight = 30
  const cardSpacing = 45
  
  // Revenue Card
  doc.setFillColor(240, 248, 255)
  doc.roundedRect(20, cardY, cardWidth, cardHeight, 3, 3, 'F')
  doc.setFontSize(16)
  doc.setTextColor(primaryColor)
  doc.text(data.revenue || '$0', 30, cardY + 15)
  doc.setFontSize(10)
  doc.setTextColor(mutedColor)
  doc.text('Monthly Revenue', 30, cardY + 22)
  
  // Growth Card
  doc.setFillColor(240, 253, 244)
  doc.roundedRect(20 + cardSpacing, cardY, cardWidth, cardHeight, 3, 3, 'F')
  doc.setFontSize(16)
  doc.setTextColor('#059669')
  doc.text(data.growth || '0%', 30 + cardSpacing, cardY + 15)
  doc.setFontSize(10)
  doc.setTextColor(mutedColor)
  doc.text('Growth Rate', 30 + cardSpacing, cardY + 22)
  
  // Burn Rate Card
  doc.setFillColor(255, 251, 235)
  doc.roundedRect(20 + cardSpacing * 2, cardY, cardWidth, cardHeight, 3, 3, 'F')
  doc.setFontSize(16)
  doc.setTextColor('#d97706')
  doc.text(data.burnRate || '$0', 30 + cardSpacing * 2, cardY + 15)
  doc.setFontSize(10)
  doc.setTextColor(mutedColor)
  doc.text('Burn Rate', 30 + cardSpacing * 2, cardY + 22)
  
  // Runway Card
  doc.setFillColor(239, 246, 255)
  doc.roundedRect(20 + cardSpacing * 3, cardY, cardWidth, cardHeight, 3, 3, 'F')
  doc.setFontSize(16)
  doc.setTextColor(primaryColor)
  doc.text(data.runway || '0mo', 30 + cardSpacing * 3, cardY + 15)
  doc.setFontSize(10)
  doc.setTextColor(mutedColor)
  doc.text('Runway', 30 + cardSpacing * 3, cardY + 22)
  
  // Content sections
  let currentY = cardY + cardHeight + 30
  
  // Charts Section
  doc.setFontSize(16)
  doc.setTextColor(textColor)
  doc.text('Performance Analytics', 20, currentY)
  currentY += 20
  
  // Revenue Trend Chart Placeholder
  doc.setFontSize(12)
  doc.setTextColor(mutedColor)
  doc.text('Revenue Growth Trend', 20, currentY)
  currentY += 10
  
  // Draw a simple chart representation
  doc.setDrawColor(primaryColor)
  doc.setLineWidth(2)
  const chartWidth = 150
  const chartHeight = 60
  const chartX = 20
  const chartY = currentY
  
  // Draw chart border
  doc.rect(chartX, chartY, chartWidth, chartHeight)
  
  // Draw trend line
  doc.line(chartX + 10, chartY + 50, chartX + 30, chartY + 40)
  doc.line(chartX + 30, chartY + 40, chartX + 50, chartY + 35)
  doc.line(chartX + 50, chartY + 35, chartX + 70, chartY + 30)
  doc.line(chartX + 70, chartY + 30, chartX + 90, chartY + 25)
  doc.line(chartX + 90, chartY + 25, chartX + 110, chartY + 20)
  doc.line(chartX + 110, chartY + 20, chartX + 130, chartY + 15)
  
  // Add data points
  const points = [
    { x: 10, y: 50 }, { x: 30, y: 40 }, { x: 50, y: 35 },
    { x: 70, y: 30 }, { x: 90, y: 25 }, { x: 110, y: 20 }, { x: 130, y: 15 }
  ]
  
  points.forEach(point => {
    doc.circle(chartX + point.x, chartY + point.y, 2, 'F')
  })
  
  // Add chart labels
  doc.setFontSize(8)
  doc.text('Jan', chartX + 10, chartY + chartHeight + 5)
  doc.text('Mar', chartX + 50, chartY + chartHeight + 5)
  doc.text('Jun', chartX + 90, chartY + chartHeight + 5)
  doc.text('Sep', chartX + 130, chartY + chartHeight + 5)
  
  currentY += chartHeight + 30
  
  // Growth Trajectory Chart Placeholder
  doc.setFontSize(12)
  doc.setTextColor(mutedColor)
  doc.text('Growth Trajectory vs Target', 20, currentY)
  currentY += 10
  
  // Draw second chart
  const chart2Y = currentY
  doc.rect(chartX, chart2Y, chartWidth, chartHeight)
  
  // Draw target line (dashed)
  doc.setLineWidth(1)
  doc.setDrawColor(mutedColor)
  for (let i = 0; i < chartWidth; i += 4) {
    doc.line(chartX + i, chart2Y + 20, chartX + i + 2, chart2Y + 20)
  }
  
  // Draw actual growth line
  doc.setDrawColor('#059669')
  doc.setLineWidth(2)
  doc.line(chartX + 10, chart2Y + 45, chartX + 30, chart2Y + 40)
  doc.line(chartX + 30, chart2Y + 40, chartX + 50, chart2Y + 35)
  doc.line(chartX + 50, chart2Y + 35, chartX + 70, chart2Y + 30)
  doc.line(chartX + 70, chart2Y + 30, chartX + 90, chart2Y + 25)
  doc.line(chartX + 90, chart2Y + 25, chartX + 110, chart2Y + 20)
  doc.line(chartX + 110, chart2Y + 20, chartX + 130, chart2Y + 15)
  
  // Add legend
  doc.setFontSize(8)
  doc.setTextColor(mutedColor)
  doc.text('Target', chartX + 10, chart2Y + chartHeight + 5)
  doc.setTextColor('#059669')
  doc.text('Actual', chartX + 40, chart2Y + chartHeight + 5)
  
  currentY += chartHeight + 40
  
  // Parse AI summary if available
  const parsedSummary = data.aiSummary ? parseAISummary(data.aiSummary) : null
  
  // Executive Summary
  const executiveSummary = parsedSummary?.executiveSummary || data.aiSummary
  if (executiveSummary) {
    doc.setFontSize(14)
    doc.setTextColor(textColor)
    doc.text('Executive Summary', 20, currentY)
    currentY += 10
    
    doc.setFontSize(10)
    doc.setTextColor(mutedColor)
    const summaryLines = doc.splitTextToSize(executiveSummary, 170)
    doc.text(summaryLines, 20, currentY)
    currentY += summaryLines.length * 5 + 15
  }
  
  // Key Highlights
  const highlights = parsedSummary?.highlights || data.highlights
  if (highlights) {
    doc.setFontSize(14)
    doc.setTextColor(textColor)
    doc.text('Key Highlights', 20, currentY)
    currentY += 10
    
    doc.setFontSize(10)
    doc.setTextColor(mutedColor)
    const highlightLines = doc.splitTextToSize(formatSummaryForDisplay(highlights), 170)
    doc.text(highlightLines, 20, currentY)
    currentY += highlightLines.length * 5 + 15
  }
  
  // Challenges
  const challenges = parsedSummary?.challenges || data.challenges
  if (challenges) {
    doc.setFontSize(14)
    doc.setTextColor(textColor)
    doc.text('Challenges & Mitigation', 20, currentY)
    currentY += 10
    
    doc.setFontSize(10)
    doc.setTextColor(mutedColor)
    const challengeLines = doc.splitTextToSize(formatSummaryForDisplay(challenges), 170)
    doc.text(challengeLines, 20, currentY)
    currentY += challengeLines.length * 5 + 15
  }
  
  // Asks
  const asks = parsedSummary?.asks || data.asks
  if (asks) {
    doc.setFontSize(14)
    doc.setTextColor(textColor)
    doc.text('How You Can Help', 20, currentY)
    currentY += 10
    
    doc.setFontSize(10)
    doc.setTextColor(mutedColor)
    const askLines = doc.splitTextToSize(formatSummaryForDisplay(asks), 170)
    doc.text(askLines, 20, currentY)
  }
  
  // Footer
  doc.setFontSize(8)
  doc.setTextColor(mutedColor)
  doc.text('Generated by Silent Partner - Investor Updates in 60 Seconds', 20, 280)
  
  return doc
}
