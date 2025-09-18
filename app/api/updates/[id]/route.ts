import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

const updateSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  revenue: z.string().optional(),
  burnRate: z.string().optional(),
  runway: z.string().optional(),
  growth: z.string().optional(),
  highlights: z.string().optional(),
  challenges: z.string().optional(),
  asks: z.string().optional(),
  aiSummary: z.string().optional(),
  status: z.enum(['DRAFT', 'SENT', 'ARCHIVED']).optional(),
})

// GET /api/updates/[id] - Get a specific update
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

    return NextResponse.json(update)
  } catch (error) {
    console.error('Error fetching update:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/updates/[id] - Update a specific update
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = updateSchema.parse(body)

    const update = await db.update.updateMany({
      where: {
        id: params.id,
        userId: session.user.id
      },
      data: validatedData
    })

    if (update.count === 0) {
      return NextResponse.json({ error: 'Update not found' }, { status: 404 })
    }

    const updatedUpdate = await db.update.findUnique({
      where: { id: params.id }
    })

    return NextResponse.json(updatedUpdate)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 })
    }
    
    console.error('Error updating update:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/updates/[id] - Delete a specific update
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const update = await db.update.deleteMany({
      where: {
        id: params.id,
        userId: session.user.id
      }
    })

    if (update.count === 0) {
      return NextResponse.json({ error: 'Update not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Update deleted successfully' })
  } catch (error) {
    console.error('Error deleting update:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
