var exampleSourceResult = "url(https://fonts.gstatic.com/s/poppins/v19/pxiGyp8kv8JHgFVrLPTucHtAOvWDSA.woff2/aferalivberkuv__98734gf.gif) format('woff2')";
var exampleSourceResult2 = `url("https://use.typekit.net/af/32d3ee/0000000000000000000132e0/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3")
format("woff2"),
url("https://use.typekit.net/af/32d3ee/0000000000000000000132e0/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3")
format("woff"),
url("https://use.typekit.net/af/32d3ee/0000000000000000000132e0/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3")
format("opentype")`;

var testRegex = /url\s*\(["']*([\w\d.\/?=:&]+)["']*\)\s*format\(['"]woff2["']\)/gi

// console.log(exampleSourceResult.match(testRegex));
console.log(testRegex.exec(exampleSourceResult));
// console.log(testRegex.exec(exampleSourceResult2));
