/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://puxx.ie',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/api', '/sign-in', '/sign-up'],
      },
    ],
    additionalSitemaps: [
      'https://puxx.ie/sitemap.xml',
      'https://puxx.ie/server-sitemap.xml',
    ],
  },
  exclude: ['/dashboard/*', '/api/*', '/sign-in', '/sign-up', '/pricing'],
  generateIndexSitemap: false,
};
