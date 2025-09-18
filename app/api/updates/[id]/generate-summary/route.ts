import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { generateInvestorUpdateSummary } from '@/lib/openai'

// POST /api/updates/[id]/generate-summary - Generate AI summary for an update
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const update = await db.update.findFirst({
      where: {
        id: params.id,
        userId: session.user.id
      }
    })

    if (!update) {
      return NextResponse.json({ error: 'Update not found' }, { status: 404 })
    }


    // Generate AI summary
    const aiSummary = await generateInvestorUpdateSummary({
      revenue: update.revenue || '',
      burnRate: update.burnRate || '',
      runway: update.runway || '',
      growth: update.growth || '',
      highlights: update.highlights || '',
      challenges: update.challenges || '',
      asks: update.asks || '',
    })

    // Update the update with the AI summary
    const updatedUpdate = await db.update.update({
      where: { id: params.id },
      data: { aiSummary }
    })

    return NextResponse.json({ 
      update: updatedUpdate,
      aiSummary 
    })
  } catch (error) {
    console.error('Error generating AI summary:', error)
    return NextResponse.json({ 
      error: 'Failed to generate AI summary',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
