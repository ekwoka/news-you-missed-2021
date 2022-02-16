const { generateFileList } = require('./src/crawler');
const { join } = require('path');
const fs = require('fs');

const articles = generateFileList(join(__dirname, 'content')).edges;

module.exports = () => {
  const pages = [
    {
      url: '/',
      seo: {},
    },
    { url: '/map/' },
  ];

  pages.push(
    {
      url: '/articles/',
      data: articles,
    },
    {
      url: '/search',
    }
  );

  // adding all article pages
  pages.push(
    ...articles.map((article) => {
      const data = fs
        .readFileSync(join('content', article.id), 'utf-8')
        .replace(/---(.*\n)*---/, '');
      return {
        url: `/article/${article.id
          .replace('.md', '')
          .replaceAll(' ', '-')
          .toLowerCase()}/`,
        seo: article.details,
        data: {
          details: article.details,
          content: data,
        },
      };
    })
  );

  return pages;
};
