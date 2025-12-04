import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3001';

test('Identify broken images', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  const imageDetails = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.map(img => ({
      src: img.src,
      alt: img.alt,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      broken: !img.complete || img.naturalWidth === 0
    }));
  });

  console.log('Image Analysis:');
  imageDetails.forEach(img => {
    console.log(`${img.broken ? 'BROKEN' : 'OK'}: ${img.src}`);
  });

  const brokenImages = imageDetails.filter(img => img.broken);
  console.log(`
Total: ${imageDetails.length}, Broken: ${brokenImages.length}`);
});
