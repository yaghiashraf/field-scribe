import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/dashboard', // Keep dashboard private-ish (though auth protects it)
    },
    sitemap: 'https://field-scribe.vercel.app/sitemap.xml',
  };
}
