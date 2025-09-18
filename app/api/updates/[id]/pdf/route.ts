import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { generateInvestorUpdatePDF } from '@/lib/pdf-generator'

// GET /api/updates/[id]/pdf - Generate PDF for an update
export async function GET(
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

    // Generate PDF
    const pdf = generateInvestorUpdatePDF({
      title: update.title,
      revenue: update.revenue || '',
      burnRate: update.burnRate || '',
      runway: update.runway || '',
      growth: update.growth || '',
      highlights: update.highlights || '',
      challenges: update.challenges || '',
      asks: update.asks || '',
      aiSummary: update.aiSummary || '',
      createdAt: update.createdAt,
    })

    // Convert to buffer
    const pdfBuffer = Buffer.from(pdf.output('arraybuffer'))
    
    // Set headers for PDF download
    const headers = new Headers()
    headers.set('Content-Type', 'application/pdf')
    headers.set('Content-Disposition', `attachment; filename="${update.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf"`)
    headers.set('Content-Length', pdfBuffer.length.toString())

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json({ 
      error: 'Failed to generate PDF',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
