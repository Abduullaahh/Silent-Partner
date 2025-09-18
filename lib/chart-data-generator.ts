export function generateRevenueTrendData(revenue: string, growth: string) {
  const baseRevenue = parseInt(revenue.replace(/[$,K]/g, '')) || 0
  const growthRate = parseFloat(growth.replace(/[%+]/g, '')) || 0
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const data = []
  
  for (let i = 0; i < 6; i++) {
    const monthIndex = (new Date().getMonth() - 5 + i + 12) % 12
    const revenueValue = Math.round(baseRevenue * (1 + (growthRate / 100) * (i - 2.5)))
    data.push({
      month: months[monthIndex],
      revenue: Math.max(0, revenueValue),
      growth: Math.round(growthRate + (Math.random() - 0.5) * 10)
    })
  }
  
  return data
}

export function generateBurnRateData(burnRate: string, runway: string) {
  const baseBurnRate = parseInt(burnRate.replace(/[$,K]/g, '')) || 0
  const runwayMonths = parseInt(runway.replace(/[mo]/g, '')) || 0
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const data = []
  
  for (let i = 0; i < 6; i++) {
    const monthIndex = (new Date().getMonth() - 5 + i + 12) % 12
    const burnValue = Math.round(baseBurnRate * (1 + (Math.random() - 0.5) * 0.2))
    data.push({
      month: months[monthIndex],
      burnRate: Math.max(0, burnValue),
      runway: Math.max(0, runwayMonths - i)
    })
  }
  
  return data
}

export function generateMetricsComparisonData(revenue: string, growth: string, burnRate: string, runway: string) {
  const currentRevenue = parseInt(revenue.replace(/[$,K]/g, '')) || 0
  const currentGrowth = parseFloat(growth.replace(/[%+]/g, '')) || 0
  const currentBurnRate = parseInt(burnRate.replace(/[$,K]/g, '')) || 0
  const currentRunway = parseInt(runway.replace(/[mo]/g, '')) || 0
  
  return [
    {
      metric: 'Revenue',
      current: currentRevenue,
      previous: Math.round(currentRevenue * 0.85)
    },
    {
      metric: 'Growth',
      current: currentGrowth,
      previous: Math.round(currentGrowth * 0.9)
    },
    {
      metric: 'Burn Rate',
      current: currentBurnRate,
      previous: Math.round(currentBurnRate * 1.1)
    },
    {
      metric: 'Runway',
      current: currentRunway,
      previous: Math.round(currentRunway * 0.8)
    }
  ]
}

export function generateGrowthTrajectoryData(growth: string) {
  const currentGrowth = parseFloat(growth.replace(/[%+]/g, '')) || 0
  const targetGrowth = Math.max(currentGrowth * 1.2, 20)
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const data = []
  
  for (let i = 0; i < 6; i++) {
    const monthIndex = (new Date().getMonth() - 5 + i + 12) % 12
    const actualGrowth = Math.round(currentGrowth + (Math.random() - 0.5) * 10)
    data.push({
      month: months[monthIndex],
      growth: Math.max(0, actualGrowth),
      target: Math.round(targetGrowth)
    })
  }
  
  return data
}
