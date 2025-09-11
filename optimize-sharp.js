const sharp = require('sharp');
const fs = require('fs');

async function optimizeImage() {
  try {
    // Crear directorio si no existe
    if (!fs.existsSync('public/optimized')) {
      fs.mkdirSync('public/optimized', { recursive: true });
    }

    // Optimizar a WebP (mejor compresión)
    await sharp('public/boda.jpg')
      .resize(1920, 1080, { 
        fit: 'cover',
        position: 'center'
      })
      .webp({ 
        quality: 80,
        effort: 6
      })
      .toFile('public/optimized/boda.webp');

    // Optimizar a JPEG (fallback)
    await sharp('public/boda.jpg')
      .resize(1920, 1080, { 
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ 
        quality: 75,
        progressive: true,
        mozjpeg: true
      })
      .toFile('public/optimized/boda-optimized.jpg');

    console.log('✅ Imágenes optimizadas correctamente');
    
    // Mostrar tamaños
    const originalStats = fs.statSync('public/boda.jpg');
    const webpStats = fs.statSync('public/optimized/boda.webp');
    const jpegStats = fs.statSync('public/optimized/boda-optimized.jpg');
    
    console.log(`Original: ${(originalStats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`WebP: ${(webpStats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`JPEG optimizado: ${(jpegStats.size / 1024 / 1024).toFixed(2)} MB`);
    
  } catch (error) {
    console.error('Error optimizando imágenes:', error);
  }
}

optimizeImage();
