const withSass = require('@zeit/next-sass')
// const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");


// module.exports = withBundleAnalyzer({
//   analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
//   analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
//   bundleAnalyzerConfig: {
//     server: {
//       analyzerMode: 'static',
//       reportFilename: '../bundles/server.html'
//     },
//     browser: {
//       analyzerMode: 'static',
//       reportFilename: '../bundles/client.html'
//     }
//   }
// });

module.exports = withSass()

// module.exports = {
//   exportPathMap() {
//     return {
//       '/': { page: '/' },
//       '/bai-viet/:postId': { page: '/post/post' },
//       '/sach/:bookId': { page: '/post/post' },
//       '/profile': { page: '/profile/profile' },
//       '/profile/:profileId': { page: '/profile/profile' },
//       '/tim-kiem': { page: '/searchResult/searchResult' },
//     }
//   },
// }


