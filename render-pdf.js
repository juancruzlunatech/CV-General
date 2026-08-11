const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  const files = [
    { html: 'index.html', pdf: 'index.pdf' },
    { html: 'copia_del_index.html', pdf: 'copia_del_index.pdf' }
  ];

  for (const f of files) {
    const fileUrl = 'file://' + path.resolve(f.html);
    console.log('Rendering', fileUrl, '->', f.pdf);
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    await page.pdf({ path: f.pdf, format: 'A4', printBackground: true });
    console.log('Generated', f.pdf);
  }

  await browser.close();
})();

/*
Usage: from project root run
  node render-pdf.js
*/
