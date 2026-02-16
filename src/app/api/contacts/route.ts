import { NextRequest, NextResponse } from 'next/server'
import { contactBodySchema, contactRequestSchema } from '@/lib/schemas'
import { tourService } from '@/lib/services/tour-service'

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id')

  if (!id) {
    return NextResponse.json(
      {
        error: 'Contact request id is required',
        hint: 'Use /api/contacts?id=ct_xxx',
      },
      { status: 400 },
    )
  }

  const contact = tourService.getContactRequest(id)
  if (!contact) {
    return NextResponse.json({ error: 'Contact request not found' }, { status: 404 })
  }

  return NextResponse.json({ data: contact })
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)

  if (!body) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const parsedBody = contactBodySchema.safeParse(body)
  if (!parsedBody.success) {
    return NextResponse.json(
      {
        error: 'Invalid request payload',
        details: parsedBody.error.flatten(),
      },
      { status: 400 },
    )
  }

  const normalizedInput = tourService.normalizeContactBody(parsedBody.data)

  const contactInput = contactRequestSchema.safeParse(normalizedInput)
  if (!contactInput.success) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        details: contactInput.error.flatten(),
      },
      { status: 400 },
    )
  }

  const created = tourService.createContactRequest(contactInput.data)
  return NextResponse.json({ message: 'Contact request received', data: created }, { status: 201 })
}
