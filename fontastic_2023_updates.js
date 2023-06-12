function extractSourceURL(src = "") {
    var format;

    src.includes("woff2")
        ? (format = "woff2")
        : src.includes("woff")
        ? (format = "woff")
        : src.includes("ttf") || src.includes("truetype")
        ? (format = "ttf")
        : src.includes("otf") || src.includes("opentype")
        ? (format = "otf")
        : src.includes("eot") || src.includes("embedded-opentype")
        ? (format = "eot")
        : (format = "unknown");
    // console.log({format});
    /* REMOVED PERIOD FROM ABOVE CHECK BECAUSE SOME URLS DON'T HAVE THE FORMAT, BUT IT IS STILL AVAILABLE IN THE format() PORTION */

    var sourceURLRegex = new RegExp(
            String.raw`url\("?'?([^()'"]*)"?'?\)\s*format\([^()]*${format}[^()]*\)`,
            "gi"
        ),
        sourceURLRegex2 = new RegExp(
            String.raw`url\("?'?([^()'"]*)"?'?\)(\s*format\([^()]*${format}[^()]*\))?`,
            "gi"
        ),
        prefix = `data:application/x-font-${format};base64,`,
        srcMatchList = sourceURLRegex.exec(src),
        srcMatchList2 = sourceURLRegex2.exec(src),
        srcURL;
    if (srcMatchList && srcMatchList[1]) {
        // console.log("Using primary source match list:", srcMatchList);
        srcURL = srcMatchList[1];
    } else if (srcMatchList2 && srcMatchList2[1]) {
        // console.log("Using srcMatchList2:", srcMatchList2);
        srcURL = srcMatchList2[1];
    }
    return {
        url: srcURL,
        prefix: prefix,
    };
}

/* <3 Huge help from Triona, Nyssa, and https://pqina.nl/blog/convert-a-file-to-a-base64-string-with-javascript/ */
async function base64Converter(url = "") {
    // console.log("Running base64Converter...");
    // if (!url || !url.match(urlRegex)) {
    if (!url) {
        console.log("No valid URL found in base64Converter.");
        sourceError.innerText = "This is not a valid URL";
    } else {
        // console.log("URL:", url);
        await fetch(url)
            .then((response) => response.blob())
            .then((font) => {
                const reader = new FileReader();
                reader.onload = function () {
                    const base64String = reader.result
                        .replace("data:", "")
                        .replace(/^.+,/, "");
                    return base64String;
                    // $("textarea:last()").val(prefix + base64String);
                    // $("textarea:last()").trigger("input");
                };
                reader.readAsDataURL(font);
            })
            .catch((error) => {
                console.error("Error:", error);
                base64Error.innerText =
                    "Looks like this URL isn't working. Please try a different URL or skip this font.";
                base64Btn.disabled = true;
                base64Btn.style.opacity = ".5";
                $("textarea:last()").val(prefix);
            });
    }
}

const fonts = [];

[...document.styleSheets].map((styleSheet) => {
    try {
        [...styleSheet.cssRules].map((rule) => {
            if (rule.cssText.includes("@font-face")) {
                console.log(rule);
                const fontFamily = rule.style.getPropertyValue("font-family"),
                    style = rule.style.getPropertyValue("font-style"),
                    weight = rule.style.getPropertyValue("font-weight"),
                    display = rule.style.getPropertyValue("font-display"),
                    srcText = rule.style.getPropertyValue("src");
                let localFont,
                    src = extractSourceURL(srcText);
                if (!src.url.includes('http')) {
                    src.url = styleSheet.href.replace(/[^/]*$/, "") + src.url;
                }
                fonts.push({
                    fontFamily,
                    style: style || "normal",
                    weight: weight || "normal",
                    display,
                    src: src.url
                });
                const base64 = base64Converter(src.url);
                console.log(base64);
            }
        })
    }
    catch (e) {
        console.log("Access to stylesheet %s is denied. Ignoring…", styleSheet.href, e);
    }
});

console.log(fonts);