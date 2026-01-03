const { createWebpackConfigAsync } = require('expo/yarn-workspaces/webpack');

module.exports = async function(env, argv) {
  const config = await createWebpackConfigAsync(env, argv);
  
  config.output.publicPath = '/gdef/';
  
  // Désactiver les hash dans les noms de fichiers entry pour avoir des noms stables
  // Définir directement les noms sans hash
  config.output.filename = '[name].js';
  config.output.chunkFilename = '[name].js';
  
  // Désactiver aussi les hash dans les plugins si présents
  if (config.plugins) {
    config.plugins.forEach(plugin => {
      // Désactiver le hash dans le plugin MiniCssExtractPlugin si présent
      if (plugin && plugin.constructor && plugin.constructor.name === 'MiniCssExtractPlugin') {
        if (plugin.options && plugin.options.filename) {
          plugin.options.filename = plugin.options.filename.replace(/\[contenthash[^\]]*\]/g, '').replace(/\[hash[^\]]*\]/g, '');
        }
        if (plugin.options && plugin.options.chunkFilename) {
          plugin.options.chunkFilename = plugin.options.chunkFilename.replace(/\[contenthash[^\]]*\]/g, '').replace(/\[hash[^\]]*\]/g, '');
        }
      }
    });
  }
  
  return config;
};