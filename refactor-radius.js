const fs = require('fs');
const path = require('path');

let totalFilesModified = 0;

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (['node_modules', '.next', '.git'].includes(file)) continue;
      processDirectory(fullPath);
    } else if (stat.isFile() && /\.(tsx|ts)$/.test(file)) {
      const originalContent = fs.readFileSync(fullPath, 'utf8');
      
      // Lookahead for end of class name (space, quote, backtick, eof)
      const endBoundary = `(?=\\s|"|'|\`|$)`;
      
      // Replace directional
      const dirRegex = new RegExp(`\\brounded-(t|b|l|r|tl|tr|bl|br)-(sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl|\\[[^\\]]+\\])${endBoundary}`, 'g');
      let content = originalContent.replace(dirRegex, 'rounded-$1');
      
      // Replace generic
      const genRegex = new RegExp(`\\brounded-(sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl|\\[[^\\]]+\\])${endBoundary}`, 'g');
      content = content.replace(genRegex, 'rounded');
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        totalFilesModified++;
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

const targetDirs = [
  path.join(__dirname, 'apps', 'web'),
  path.join(__dirname, 'packages', 'ui')
];

for (const dir of targetDirs) {
  if (fs.existsSync(dir)) {
    console.log(`Processing ${dir}...`);
    processDirectory(dir);
  } else {
    console.log(`Skipping ${dir}, not found.`);
  }
}
console.log(`Done refactoring border-radius. Total files modified: ${totalFilesModified}`);
