export async function getServerSideProps({ res }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.woodyz.in';
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.write(`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /auth/\nDisallow: /cart\nDisallow: /checkout\nDisallow: /orders\nDisallow: /profile\nDisallow: /track/\nDisallow: /api/\nSitemap: ${siteUrl}/sitemap.xml\n`);
  res.end();
  return { props: {} };
}

export default function Robots() {
  return null;
}
