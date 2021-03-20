//Docs here: https://www.npmjs.com/package/vue-cli-plugin-browser-extension

module.exports = {
  pages: {
    popup: {
      template: "public/browser-extension.html",
      entry: "./src/popup/main.js",
      title: "Popup",
    },
  },
  pluginOptions: {
    browserExtension: {
      //Configurations to keep the same content in the generated manifest.json than in src/manifest.json
      manifestSync: [], //remove version sync (between package.json and generated manifest.json) (default value is ['version'])
      manifestTransformer: (manifest) => {
        //delete manifest.content_security_policy; //remove the key in generated manifest.json to leave the default content security policy
        return manifest;
      },
      componentOptions: {},
    },
  },
};
