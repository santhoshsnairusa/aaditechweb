const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        if (dirPath.includes('node_modules') || dirPath.includes('.next')) return;
        fs.statSync(dirPath).isDirectory() ? walkDir(dirPath, callback) : callback(dirPath);
    });
}

const replacements = [
    [/\bbg-white\/90\b(?! dark:)/g, 'bg-white/90 dark:bg-secondary-900/90'],
    [/\bbg-white\b(?!(\/| dark:))/g, 'bg-white dark:bg-secondary-900'],
    [/\bbg-secondary-50\b(?!(\/| dark:))/g, 'bg-secondary-50 dark:bg-secondary-950'],
    [/\bbg-secondary-100\b(?!(\/| dark:))/g, 'bg-secondary-100 dark:bg-secondary-800'],
    [/\bbg-secondary-200\b(?!(\/| dark:))/g, 'bg-secondary-200 dark:bg-secondary-700'],
    [/\btext-secondary-900\b(?!(\/| dark:))/g, 'text-secondary-900 dark:text-white'],
    [/\btext-secondary-800\b(?!(\/| dark:))/g, 'text-secondary-800 dark:text-secondary-100'],
    [/\btext-secondary-700\b(?!(\/| dark:))/g, 'text-secondary-700 dark:text-secondary-200'],
    [/\btext-secondary-600\b(?!(\/| dark:))/g, 'text-secondary-600 dark:text-secondary-300'],
    [/\btext-secondary-500\b(?!(\/| dark:))/g, 'text-secondary-500 dark:text-secondary-400'],
    [/\bborder-secondary-300\b(?!(\/| dark:))/g, 'border-secondary-300 dark:border-secondary-600'],
    [/\bborder-secondary-200\b(?!(\/| dark:))/g, 'border-secondary-200 dark:border-secondary-700'],
    [/\bborder-secondary-100\b(?!(\/| dark:))/g, 'border-secondary-100 dark:border-secondary-800']
];

walkDir(path.resolve('./src/app'), function (filePath) {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        let content = fs.readFileSync(filePath, 'utf-8');
        let newContent = content;

        replacements.forEach(([regex, replacement]) => {
            newContent = newContent.replace(regex, replacement);
        });

        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf-8');
            console.log(`Upgraded dark mode mappings in ${filePath}`);
        }
    }
});

walkDir(path.resolve('./src/components'), function (filePath) {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        let content = fs.readFileSync(filePath, 'utf-8');
        let newContent = content;

        replacements.forEach(([regex, replacement]) => {
            newContent = newContent.replace(regex, replacement);
        });

        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf-8');
            console.log(`Upgraded dark mode mappings in ${filePath}`);
        }
    }
});
