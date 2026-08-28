const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
    });
}

walkDir(path.resolve('./src'), function (filePath) {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        let content = fs.readFileSync(filePath, 'utf-8');
        let newContent = content.replace(/\bmax-w-7xl\b/g, 'w-full max-w-[1440px]');

        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf-8');
            console.log(`Updated ${filePath}`);
        }
    }
});
