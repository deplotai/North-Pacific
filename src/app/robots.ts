import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/npmanage/', '/api/'],
    },
    sitemap: 'https://www.northpacific.com/sitemap.xml', // update with real domain
  };
}
