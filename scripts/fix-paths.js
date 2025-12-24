const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, '../dist/index.html');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

const fixedIndexHtml = indexHtml
  .replace(/(src|href)="\/_expo\//g, '$1="/gdef/_expo/')
  .replace(/(src|href)="\/favicon\.ico"/g, '$1="/gdef/favicon.ico"');

fs.writeFileSync(indexHtmlPath, fixedIndexHtml, 'utf8');

console.log('Paths fixed in index.html');