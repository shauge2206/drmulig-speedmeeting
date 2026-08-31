// Siden spoer denne for aa vite hvor mange plasser som er igjen.
// Leser kun et tall og et flagg fra Redis. Se 05-LITE-VERSJON.md.
import { Redis } from '@upstash/redis'
import { EVENT } from '@/lib/config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const redis = Redis.fromEnv()

export async function GET() {
  const slug = process.env.TREFF_SLUG ?? EVENT.slug
  const kapasitet = Number(process.env.KAPASITET ?? EVENT.capacity)

  const [flagg, solgt] = await Promise.all([
    redis.get<string>(`utsolgt:${slug}`),
    redis.get<number>(`solgt:${slug}`),
  ])
  const antall = Number(solgt ?? 0)

  return Response.json(
    {
      utsolgt: flagg === '1' || antall >= kapasitet || EVENT.utsolgt_manuell,
      solgt: antall,
      igjen: Math.max(0, kapasitet - antall),
    },
    { headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60' } },
  )
}
