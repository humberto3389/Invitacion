const fs = require('fs');
const path = require('path');

// Script para comprimir audio.mp3 usando FFmpeg
// Reduce de 6MB a aproximadamente 1-2MB manteniendo calidad aceptable

const inputFile = path.join(__dirname, 'public', 'audio.mp3');
const outputFile = path.join(__dirname, 'public', 'audio-compressed.mp3');
const backupFile = path.join(__dirname, 'public', 'audio-original.mp3');

console.log('🎵 Comprimiendo audio.mp3...');

// Verificar si el archivo existe
if (!fs.existsSync(inputFile)) {
  console.error('❌ No se encontró audio.mp3 en public/');
  process.exit(1);
}

// Comando FFmpeg para comprimir audio
// -b:a 128k = bitrate de 128kbps (buena calidad, menor tamaño)
// -ar 44100 = sample rate estándar
// -ac 2 = stereo
const { exec } = require('child_process');

const command = `ffmpeg -i "${inputFile}" -b:a 128k -ar 44100 -ac 2 "${outputFile}"`;

console.log('Ejecutando:', command);

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Error al comprimir audio:', error);
    console.log('💡 Instala FFmpeg: https://ffmpeg.org/download.html');
    console.log('💡 O usa herramientas online como CloudConvert');
    return;
  }

  // Verificar tamaños
  const originalSize = fs.statSync(inputFile).size;
  const compressedSize = fs.statSync(outputFile).size;
  const reduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);

  console.log(`✅ Audio comprimido exitosamente!`);
  console.log(`📊 Tamaño original: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📊 Tamaño comprimido: ${(compressedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📊 Reducción: ${reduction}%`);

  // Hacer backup del original y reemplazar
  fs.renameSync(inputFile, backupFile);
  fs.renameSync(outputFile, inputFile);

  console.log('🔄 Archivo reemplazado. Original guardado como audio-original.mp3');
});
