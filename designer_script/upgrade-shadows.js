const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        fs.statSync(dirPath).isDirectory() ? walkDir(dirPath, callback) : callback(dirPath);
    });
}

walkDir(path.resolve('./src/app'), function (filePath) {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        let content = fs.readFileSync(filePath, 'utf-8');

        // Upgrade existing minimal shadows cleanly
        let newContent = content.replace(/\bshadow-sm\b/g, 'shadow-md');

        // Explicitly fix the specific components that missed shadows entirely
        newContent = newContent.replace(
            /bg-white border border-secondary-200 rounded-xl overflow-hidden"/g,
            'bg-white border border-secondary-200 rounded-xl overflow-hidden shadow-md"'
        );
        newContent = newContent.replace(
            /bg-white border border-secondary-200 rounded-xl overflow-hidden hover:shadow/g,
            'bg-white border border-secondary-200 rounded-xl shadow-md overflow-hidden hover:shadow'
        );

        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf-8');
            console.log(`Updated shadows in ${filePath}`);
        }
    }
});
