import type { MetadataRoute } from 'next'

// Holder snarveien /admin og API-rutene ute av søkemotorer.
// /admin har i tillegg X-Robots-Tag: noindex satt i next.config.js.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/', '/takk'],
    },
  }
}
