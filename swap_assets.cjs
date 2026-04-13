const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walkAndReplace(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkAndReplace(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            // Replace the optimized images
            content = content.replaceAll('pexels-tara-winstead-6694187.jpg', 'pexels-tara-winstead-6694187.webp');
            content = content.replaceAll('pexels-jean-pierre-3622694-5466870.jpg', 'pexels-jean-pierre-3622694-5466870.webp');
            content = content.replaceAll('pexels-kseniya-kopna-52379050-11556383.jpg', 'pexels-kseniya-kopna-52379050-11556383.webp');
            content = content.replaceAll('pexels-asya-vlasova-228168-2022022.jpg', 'pexels-asya-vlasova-228168-2022022.webp');
            
            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content);
                console.log(`Updated images in ${fullPath}`);
            }
        }
    }
}

walkAndReplace(srcDir);
