import { NextRequest, NextResponse } from 'next/server'
import { bookingBodySchema, bookingRequestSchema } from '@/lib/schemas'
import { tourService } from '@/lib/services/tour-service'

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id')

  if (!id) {
    return NextResponse.json(
      {
        error: 'Booking id is required',
        hint: 'Use /api/bookings?id=bk_xxx',
      },
      { status: 400 },
    )
  }

  const booking = tourService.getBooking(id)
  if (!booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  }

  return NextResponse.json({ data: booking })
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)

  if (!body) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const parsedBody = bookingBodySchema.safeParse(body)
  if (!parsedBody.success) {
    return NextResponse.json(
      {
        error: 'Invalid request payload',
        details: parsedBody.error.flatten(),
      },
      { status: 400 },
    )
  }

  const normalizedInput = {
    ...parsedBody.data,
    travelers: Number(parsedBody.data.travelers),
  }

  const bookingInput = bookingRequestSchema.safeParse(normalizedInput)
  if (!bookingInput.success) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        details: bookingInput.error.flatten(),
      },
      { status: 400 },
    )
  }

  try {
    const created = tourService.createBooking(bookingInput.data)
    return NextResponse.json({ message: 'Booking request received', data: created }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Unable to process booking',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 400 },
    )
  }
}
