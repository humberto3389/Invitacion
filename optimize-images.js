const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const imageminMozjpeg = require('imagemin-mozjpeg');

(async () => {
  // Optimizar imagen a WebP (mejor compresión)
  await imagemin(['public/boda.jpg'], {
    destination: 'public/optimized',
    plugins: [
      imageminWebp({
        quality: 80,
        method: 6
      })
    ]
  });

  // Optimizar imagen a JPEG (fallback)
  await imagemin(['public/boda.jpg'], {
    destination: 'public/optimized',
    plugins: [
      imageminMozjpeg({
        quality: 75,
        progressive: true
      })
    ]
  });

  console.log('✅ Imágenes optimizadas correctamente');
})();
