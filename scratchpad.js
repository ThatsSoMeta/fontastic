var exampleSourceResult = "url(https://fonts.gstatic.com/s/poppins/v19/pxiGyp8kv8JHgFVrLPTucHtAOvWDSA.woff2/aferalivberkuv__98734gf.gif) format('woff2')";
var exampleSourceResult2 = `url("https://use.typekit.net/af/32d3ee/0000000000000000000132e0/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3")
format("woff2"),
url("https://use.typekit.net/af/32d3ee/0000000000000000000132e0/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3")
format("woff"),
url("https://use.typekit.net/af/32d3ee/0000000000000000000132e0/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3")
format("opentype")`;

var testRegex = /url\s*\(["']*([\w\d.\/?=:&]+)["']*\)\s*format\(['"]woff2["']\)/gi

// console.log(exampleSourceResult.match(testRegex));
// console.log(testRegex.exec(exampleSourceResult));
// console.log(testRegex.exec(exampleSourceResult2));

var bloomingdalesProblemFonts = `
@font-face {
    font-family: Avenir;
    font-display: swap;
    src: local("Avenir Roman"),local("Avenir LT W01 55 Roman"),url(https://assets.bloomingdalesassets.com/styles/common/fonts/avenir/2f5a6074-badc-4e08-83f1-ed67fe5c3d7c.eot#iefix) format("eot"),url(https://assets.bloomingdalesassets.com/styles/common/fonts/avenir/b9ebb19d-88c1-4cbd-9baf-cf51972422ec.woff) format("woff"),url(https://assets.bloomingdalesassets.com/styles/common/fonts/avenir/5ed4f98e-9044-4810-88ff-74d412c1351f.ttf) format("truetype"),url(https://assets.bloomingdalesassets.com/styles/common/fonts/avenir/4cb16859-16ca-4342-b89c-292dc83266af.svg#4cb16859-16ca-4342-b89c-292dc83266af) format("svg")
}

@media print {
    @font-face {
        font-family: Avenir;
        font-display: swap;
        src: url(https://assets.bloomingdalesassets.com/styles/common/fonts/avenir/2f5a6074-badc-4e08-83f1-ed67fe5c3d7c.eot#iefix) format("eot"),url(https://assets.bloomingdalesassets.com/styles/common/fonts/avenir/b9ebb19d-88c1-4cbd-9baf-cf51972422ec.woff) format("woff"),url(https://assets.bloomingdalesassets.com/styles/common/fonts/avenir/5ed4f98e-9044-4810-88ff-74d412c1351f.ttf) format("truetype"),url(https://assets.bloomingdalesassets.com/styles/common/fonts/avenir/4cb16859-16ca-4342-b89c-292dc83266af.svg#4cb16859-16ca-4342-b89c-292dc83266af) format("svg")
    }
}

@font-face {
    font-family: Avenir;
    font-display: swap;
    src: local("Avenir Heavy"),local("Avenir LT W01 85 Heavy"),url(https://assets.bloomingdalesassets.com/styles/common/fonts/avenir/f61bf0f6-c193-4100-b940-12a1a01dcee5.eot#iefix) format("eot"),url(https://assets.bloomingdalesassets.com/styles/common/fonts/avenir/7147ec3a-8ff8-4ec9-8c5c-bd1571dc6ae6.woff) format("woff"),url(https://assets.bloomingdalesassets.com/styles/common/fonts/avenir/d1dc54b2-878d-4693-8d6e-b442e99fef68.ttf) format("truetype"),url(https://assets.bloomingdalesassets.com/styles/common/fonts/avenir/731dd4d3-64da-427d-ba61-01575b3cf3f7.svg#731dd4d3-64da-427d-ba61-01575b3cf3f7) format("svg");
    font-weight: 700
}
`

var testArray = [1, 2, 3];