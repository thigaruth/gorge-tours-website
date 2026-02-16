import { NextResponse } from 'next/server'
import { tourService } from '@/lib/services/tour-service'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    operational: tourService.getOperationalSnapshot(),
  })
}
