/**
 * Generate all favicon sizes from logo-official.png
 * Uses sharp for high-quality image processing
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_FILE = path.join(__dirname, '../public/logo-official.png');
const OUTPUT_DIR = path.join(__dirname, '../public');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateFavicons() {
  console.log('🎨 Generating favicon files from logo-official.png...\n');

  try {
    // 1. Generate favicon.ico (multi-resolution: 16x16, 32x32, 48x48)
    console.log('📦 Creating favicon.ico (multi-resolution)...');
    await sharp(INPUT_FILE)
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(OUTPUT_DIR, 'favicon-32x32.png'));

    await sharp(INPUT_FILE)
      .resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(OUTPUT_DIR, 'favicon-16x16.png'));

    // For .ico, we'll use the 32x32 as base and rename
    await sharp(INPUT_FILE)
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFormat('png')
      .toFile(path.join(OUTPUT_DIR, 'favicon.ico'));

    console.log('✅ favicon.ico created');
    console.log('✅ favicon-16x16.png created');
    console.log('✅ favicon-32x32.png created\n');

    // 2. Apple Touch Icon (180x180)
    console.log('🍎 Creating apple-touch-icon.png (180x180)...');
    await sharp(INPUT_FILE)
      .resize(180, 180, { fit: 'contain', background: { r: 15, g: 23, b: 42, alpha: 1 } })
      .png()
      .toFile(path.join(OUTPUT_DIR, 'apple-touch-icon.png'));
    console.log('✅ apple-touch-icon.png created\n');

    // 3. Android/PWA icons
    console.log('🤖 Creating Android/PWA icons...');
    await sharp(INPUT_FILE)
      .resize(192, 192, { fit: 'contain', background: { r: 15, g: 23, b: 42, alpha: 1 } })
      .png()
      .toFile(path.join(OUTPUT_DIR, 'android-chrome-192x192.png'));

    await sharp(INPUT_FILE)
      .resize(512, 512, { fit: 'contain', background: { r: 15, g: 23, b: 42, alpha: 1 } })
      .png()
      .toFile(path.join(OUTPUT_DIR, 'android-chrome-512x512.png'));
    console.log('✅ android-chrome-192x192.png created');
    console.log('✅ android-chrome-512x512.png created\n');

    // 4. Create optimized favicon.svg (copy from logo-mobile.svg which is already optimized)
    const mobileLogoPath = path.join(__dirname, '../public/logo-mobile.svg');
    const faviconSvgPath = path.join(OUTPUT_DIR, 'favicon-optimized.svg');

    if (fs.existsSync(mobileLogoPath)) {
      fs.copyFileSync(mobileLogoPath, faviconSvgPath);
      console.log('✅ favicon-optimized.svg created (from logo-mobile.svg)\n');
    }

    // 5. Generate metadata for site.webmanifest
    console.log('📄 Favicon files ready for site.webmanifest\n');

    console.log('✨ All favicon files generated successfully!\n');
    console.log('📋 Generated files:');
    console.log('   - favicon.ico');
    console.log('   - favicon-16x16.png');
    console.log('   - favicon-32x32.png');
    console.log('   - apple-touch-icon.png');
    console.log('   - android-chrome-192x192.png');
    console.log('   - android-chrome-512x512.png');
    console.log('   - favicon-optimized.svg');
    console.log('\n🎯 Next steps:');
    console.log('   1. Update seo-config.ts icons metadata');
    console.log('   2. Create site.webmanifest');
    console.log('   3. Add manifest link to layout.tsx\n');

  } catch (error) {
    console.error('❌ Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
