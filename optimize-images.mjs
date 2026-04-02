import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

const inputDir = './public/images';
const outputDir = './public/images/optimized';

async function optimizeImages() {
  const files = await readdir(inputDir);
  
  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      console.log(`Optimizing ${file}...`);
      
      await sharp(join(inputDir, file))
        .resize(1200, null, { withoutEnlargement: true })
        .jpeg({ quality: 80, progressive: true })
        .toFile(join(outputDir, file));
      
      console.log(`✓ ${file} optimized`);
    }
  }
  
  console.log('All images optimized!');
}

optimizeImages().catch(console.error);
