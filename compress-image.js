const fs = require('fs');
const { execSync } = require('child_process');

// Usar FFmpeg para comprimir la imagen (más confiable en Windows)
try {
  // Verificar si FFmpeg está disponible
  execSync('ffmpeg -version', { stdio: 'ignore' });
  
  // Comprimir imagen con FFmpeg
  execSync('ffmpeg -i public/boda.jpg -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080" -q:v 3 public/boda-optimized.jpg -y', { stdio: 'inherit' });
  
  const original = fs.statSync('public/boda.jpg');
  const optimized = fs.statSync('public/boda-optimized.jpg');
  
  console.log(`Original: ${(original.size / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Optimizado: ${(optimized.size / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Reducción: ${(((original.size - optimized.size) / original.size) * 100).toFixed(1)}%`);
  
  // Reemplazar la imagen original
  fs.copyFileSync('public/boda-optimized.jpg', 'public/boda.jpg');
  fs.unlinkSync('public/boda-optimized.jpg');
  
  console.log('✅ Imagen optimizada y reemplazada');
  
} catch (error) {
  console.log('FFmpeg no disponible, usando método alternativo...');
  
  // Método alternativo: solo cambiar calidad JPEG usando Node.js
  const sharp = require('sharp');
  
  sharp('public/boda.jpg')
    .resize(1920, 1080, { 
      fit: 'cover',
      position: 'center'
    })
    .jpeg({ 
      quality: 70,
      progressive: true
    })
    .toFile('public/boda-temp.jpg')
    .then(() => {
      const original = fs.statSync('public/boda.jpg');
      const optimized = fs.statSync('public/boda-temp.jpg');
      
      console.log(`Original: ${(original.size / 1024 / 1024).toFixed(2)} MB`);
      console.log(`Optimizado: ${(optimized.size / 1024 / 1024).toFixed(2)} MB`);
      
      // Reemplazar
      fs.copyFileSync('public/boda-temp.jpg', 'public/boda.jpg');
      fs.unlinkSync('public/boda-temp.jpg');
      
      console.log('✅ Imagen optimizada con Sharp');
    })
    .catch(console.error);
}
