import { NextRequest, NextResponse } from 'next/server'
import { packageQuerySchema } from '@/lib/schemas'
import { tourService } from '@/lib/services/tour-service'

export async function GET(request: NextRequest) {
  const params = Object.fromEntries(request.nextUrl.searchParams.entries())
  const parsed = packageQuerySchema.safeParse(params)

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Invalid query parameters',
        details: parsed.error.flatten(),
      },
      { status: 400 },
    )
  }

  const data = tourService.getPackages(parsed.data)
  return NextResponse.json({ count: data.length, data })
}
