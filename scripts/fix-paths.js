const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '../dist');
const indexHtmlPath = path.join(distPath, 'index.html');

// Fonction pour renommer les fichiers entry avec hash en noms stables
function renameEntryFiles() {
  const platforms = ['web', 'ios', 'android'];
  const renames = [];
  
  platforms.forEach(platform => {
    const jsDir = path.join(distPath, '_expo', 'static', 'js', platform);
    if (!fs.existsSync(jsDir)) return;
    
    const files = fs.readdirSync(jsDir);
    const entryFile = files.find(f => f.startsWith('entry-') && (f.endsWith('.js') || f.endsWith('.hbc')));
    
    if (entryFile) {
      const extension = platform === 'web' ? '.js' : '.hbc';
      const newName = `entry${extension}`;
      const oldPath = path.join(jsDir, entryFile);
      const newPath = path.join(jsDir, newName);
      
      // Supprimer l'ancien fichier entry.js s'il existe déjà
      if (fs.existsSync(newPath)) {
        fs.unlinkSync(newPath);
      }
      
      fs.renameSync(oldPath, newPath);
      renames.push({
        platform,
        oldName: entryFile,
        newName: newName,
        oldPath: `/_expo/static/js/${platform}/${entryFile}`,
        newPath: `/_expo/static/js/${platform}/${newName}`
      });
      console.log(`Renamed ${platform}: ${entryFile} -> ${newName}`);
    }
  });
  
  return renames;
}

// Renommer les fichiers entry
const renames = renameEntryFiles();

// Lire et modifier index.html
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Remplacer les références aux fichiers entry dans index.html
renames.forEach(({ oldPath, newPath }) => {
  // Remplacer les références avec et sans le préfixe /gdef/
  indexHtml = indexHtml.replace(new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPath);
  indexHtml = indexHtml.replace(new RegExp('/gdef' + oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '/gdef' + newPath);
});

// Corriger les autres chemins
const fixedIndexHtml = indexHtml
  .replace(/(src|href)="\/_expo\//g, '$1="/gdef/_expo/')
  .replace(/(src|href)="\/favicon\.ico"/g, '$1="/gdef/favicon.ico"');

fs.writeFileSync(indexHtmlPath, fixedIndexHtml, 'utf8');

console.log('Paths fixed in index.html');