let copyBtn = document.createElement("button");
copyBtn.innerHTML = "Facelift";
copyBtn.id = "facelift";
copyBtn.style.color = "white";
copyBtn.style.backgroundColor = "black";
copyBtn.style.padding = "10px";
copyBtn.style.position = "absolute";
copyBtn.style.top = "50px";
copyBtn.style.right = "50px";
copyBtn.style.zIndex = "2147473647";

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

let fonts = [],
    fontString = "";
document.fonts.ready.then(function() {
    // Any operation that needs to be done only after all the fonts
    // have finished loading can go here.
    document.fonts.forEach(e => {
        if (e.status === "loaded") {
            let font = `@font-face {font-family: ${e.family}; font-weight: ${e.weight}; font-style: ${e.style}; }`,
                orig = e;
            orig.declaration = font;
            fontString += font;
            fonts.push(orig);
        }
    });
  }).then(() => console.log("Fonts: ", fonts));