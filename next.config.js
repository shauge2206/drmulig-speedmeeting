/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        // Skjult snarvei: sender Arild rett til Payment Link i Stripe-dashbordet.
        // Ingen egen innlogging bygges. Se 05-LITE-VERSJON.md seksjon 5c.
        source: '/admin',
        destination: `https://dashboard.stripe.com/payment-links/${process.env.PAYMENT_LINK_ID}`,
        permanent: false,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/admin',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
    ]
  },
}

module.exports = nextConfig
