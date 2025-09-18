import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { RevenueTrend } from '@/components/charts/revenue-trend'
import { BurnRateChart } from '@/components/charts/burn-rate-chart'
import { MetricsComparison } from '@/components/charts/metrics-comparison'
import { GrowthTrajectory } from '@/components/charts/growth-trajectory'
import { generateRevenueTrendData, generateBurnRateData, generateMetricsComparisonData, generateGrowthTrajectoryData } from './chart-data-generator'

export async function renderChartToImage(chartType: string, data: any): Promise<string> {
  // For now, we'll return a placeholder. In a real implementation, you would:
  // 1. Render the React component to HTML
  // 2. Use a headless browser (like Puppeteer) to capture the chart as an image
  // 3. Convert the image to base64 for PDF inclusion
  
  // This is a simplified version that returns a data URL placeholder
  // In production, you'd want to use a proper chart rendering service
  
  const canvas = document.createElement('canvas')
  canvas.width = 400
  canvas.height = 200
  const ctx = canvas.getContext('2d')
  
  if (ctx) {
    // Draw a simple placeholder chart
    ctx.fillStyle = '#f3f4f6'
    ctx.fillRect(0, 0, 400, 200)
    
    ctx.fillStyle = '#2563eb'
    ctx.font = '14px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(`${chartType} Chart`, 200, 100)
    
    ctx.fillStyle = '#6b7280'
    ctx.font = '12px Arial'
    ctx.fillText('Chart visualization would appear here', 200, 120)
  }
  
  return canvas.toDataURL('image/png')
}

export function getChartData(updateData: any) {
  return {
    revenueTrend: generateRevenueTrendData(updateData.revenue, updateData.growth),
    burnRate: generateBurnRateData(updateData.burnRate, updateData.runway),
    metricsComparison: generateMetricsComparisonData(
      updateData.revenue, 
      updateData.growth, 
      updateData.burnRate, 
      updateData.runway
    ),
    growthTrajectory: generateGrowthTrajectoryData(updateData.growth)
  }
}
