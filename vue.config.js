module.exports = {
   transpileDependencies: ["vuetify"],
   publicPath: process.env.NODE_ENV === "production" ? "/map/" : "/",

   configureWebpack: {
      optimization: {
         splitChunks: {
            minSize: 10000,
            maxSize: 400000,
         },
      },
   },
};
