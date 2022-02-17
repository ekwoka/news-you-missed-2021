const { generateFileList } = require('./src/crawler');
const { join } = require('path');
const fs = require('fs');

const articles = generateFileList(join(__dirname, 'content')).edges;

const articleData = articles.map((article) => ({
  ...article,
  url: `/article/${article.title.replaceAll(' ', '-').toLowerCase()}/`,
}));

module.exports = () => {
  const pages = [
    {
      url: '/',
      seo: {},
    },
    { url: '/map/' },
    { url: '/search/' },
    { url: '/articles', data: articles },
    ...articleData,
  ];

  return pages;
};
