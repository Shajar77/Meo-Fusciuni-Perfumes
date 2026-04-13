const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, 'public');

async function processImages() {
    const files = fs.readdirSync(publicDir);
    
    for (const file of files) {
        if (!file.toLowerCase().endsWith('.jpg') && !file.toLowerCase().endsWith('.jpeg')) continue;
        
        const inputPath = path.join(publicDir, file);
        const stats = fs.statSync(inputPath);
        
        // Only process files larger than 500KB
        if (stats.size > 500 * 1024) {
            console.log(`Optimizing: ${file} (${Math.round(stats.size/1024)}KB)`);
            const ext = path.extname(file);
            const webPath = path.join(publicDir, file.replace(ext, '.webp'));
            
            try {
                await sharp(inputPath)
                    .resize({ width: 1920, withoutEnlargement: true }) // Scale down huge files
                    .webp({ quality: 80 }) // Convert to modern formats
                    .toFile(webPath);
                
                const newStats = fs.statSync(webPath);
                console.log(`✅ Saved ${file.replace(ext, '.webp')} (${Math.round(newStats.size/1024)}KB)`);
                
                // Backup the original by renaming
                fs.renameSync(inputPath, inputPath + '.bak');
            } catch (err) {
                console.error(`Failed on ${file}:`, err);
            }
        }
    }
}

processImages();
