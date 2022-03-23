if (document.getElementById("facelift_button")) {
  console.log(document.getElementById("facelift_button"));
} else {
  let copyBtn = document.createElement("button");
  copyBtn.innerHTML = "Facelift";
  copyBtn.id = "facelift";
  copyBtn.style.color = "white";
  copyBtn.style.backgroundColor = "black";
  copyBtn.style.letterSpacing = ".25em";
  copyBtn.style.fontSize = "16px";
  copyBtn.style.fontWeight = "700";
  copyBtn.style.textTransform = "uppercase";
  copyBtn.style.padding = "10px calc(20px - .25em) 10px 20px";
  copyBtn.style.position = "absolute";
  copyBtn.style.top = "50px";
  copyBtn.style.right = "50px";
  copyBtn.style.zIndex = "2147473647";
  copyBtn.onclick = compareResults;
  document.body.append(copyBtn);
}

let resultsOfDocument;

if (!String.prototype.includes) {
  String.prototype.includes = function (search, start) {
    "use strict";
    if (search instanceof RegExp) {
      throw TypeError("first argument must not be a RegExp");
    }
    if (start === undefined) {
      start = 0;
    }
    return this.indexOf(search, start) !== -1;
  };
}

async function getDocumentFonts() {
  let fonts = [],
    fontString = "";

  /* https://developer.mozilla.org/en-US/docs/Web/API/Document/fonts */
  document.fonts.ready
    .then(() => {
      // Any operation that needs to be done only after all the fonts
      // have finished loading can go here.
      document.fonts.forEach(async (font) => {
        const fontPromise = await font.loaded;
        // fonts.push(font);
        console.log("fontPromise after loading: ", fontPromise);
        // console.log("font after loading: ", font);
        // font.loaded.then((res) => {
        //     console.log("res of font: ", res);
        //     res.loaded.then((result) => { console.log("result following that: ", result) })
        // });
      });
    })
    .then(() => {
    //   console.log("Fonts: ", fonts);
      resultsOfDocument = fonts;
      return fonts;
    })
    .catch((error) => {
      console.log("An error occurred in thisDoesntDoMuchYet(): ", error);
    });
}

function getLinkFonts() {
  let allLinks = document.getElementsByTagName("link"),
    stylesheets = [],
    fonts = [];
  for (let link of allLinks) {
    if (link.getAttribute("rel") === "stylesheet") {
      stylesheets.push(link);
    }
    if (link.getAttribute("as") && link.getAttribute("as") === "font") {
      fonts.push(link);
    }
  }
  return {
    stylesheets,
    fonts,
  };
}

async function compareResults() {
  let headResults = getLinkFonts();
  getDocumentFonts().then((result) => {
    let documentResults = result;
    console.log("documentResults in compareResults(): ", result);
    return { headResults, documentResults };
  });
}
