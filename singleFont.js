// javascript:(() => {/* LOGIC */})();
javascript:(() => {
/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes */

function doTheThing() {if (!String.prototype.includes) {
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

function extractFont(fontFace = "") {
  if (!fontFace) {
    throw Error("No font detected");
  }
  var parsedFont = fontFace.replace(/(\r\n|\n|\r)/gm, " "),
    familyRegex = /family:\s*([^;]+);/gi,
    family = familyRegex.exec(parsedFont)[1],
    styleRegex = /style:\s*([^;]+);/gi,
    weightRegex = /weight:\s*([^;]+)/gi,
    sourceRegex = /src:\s*([^;]+)/gi,
    source,
    style,
    weight,
    url,
    prefix;

  /* Check for weight attribute, and if it is numerical, turn it into a number, otherwise set as "normal" */
  if (parsedFont.match(weightRegex)) {
    weightExtract = weightRegex.exec(parsedFont);
    weight = parseInt(weightExtract[1])
      ? parseInt(weightExtract[1])
      : weightExtract[1];
  } else {
    weight = "normal";
  }

  /* Check for style attribute, otherwise set as "normal" */
  if (parsedFont.match(styleRegex)) {
    styleExtract = styleRegex.exec(parsedFont);
    style = styleExtract[1];
  } else {
    style = "normal";
  }

  if (!parsedFont.match(sourceRegex).length) {
    /* DO SOMETHING FOR NO MATCHES */
    source = "No source detected. Please manually enter...";
    prefix = "No source detected. Please manually enter...";
  } else {
    /* DO SOMETHING FOR ONE OR MORE MATCHES */
    source = determineSrc(parsedFont.match(sourceRegex));
    url = source.url;
    prefix = source.prefix;
  }

  var extractedFont = determineWeight({
    family: family.replace(/"|'/g, ""),
    style: style,
    weight: weight,
    src: url,
    prefix: prefix,
  });
  return extractedFont;
}

function determineSrc(src = []) {
  if (!src.length) {
    return "No source detected! Please manually enter...";
  } else {
    for (let option of src) {
      let result = extractSourceURL(option);
      return result;
    }
    return "TESTING SOURCES";
  }
}

function extractSourceURL(source = "") {
  var format;

  source.includes(".woff2")
    ? (format = "woff2")
    : source.includes(".woff")
    ? (format = "woff")
    : source.includes(".ttf")
    ? (format = "ttf")
    : source.includes(".otf")
    ? (format = "otf")
    : source.includes(".eot")
    ? (format = "eot")
    : (format = "unknown");

  let searchString = new RegExp(String.raw`[^\s("']+\.${format}[^\s)"']*`, "g"),
    prefix = `data:application/x-font-${format};base64,`,
    resultUrl = source.match(searchString);
  return {
    url: resultUrl[0],
    prefix: prefix,
  };
}

function determineWeight(font = {}) {
  var THIN = /thin/gi,
    HAIRLINE = /hairline/gi,
    LIGHT = /light/gi,
    BOOK = /book/gi,
    NORMAL = /normal/gi,
    REGULAR = /regular/gi,
    MEDIUM = /medium/gi,
    DEMI = /demi/gi,
    SEMI = /semi(?![-_\s]*condensed)/gi,
    BOLD = /bold/gi,
    BLACK = /black/gi,
    HEAVY = /heavy/gi,
    ULTRA = /ultra/gi,
    EXTRA = /extra/gi,
    declaredWeight = font.weight,
    weightRegex = /\d{3}[\s*\d{3}]*/gi,
    weight,
    fontWeights = {
      thin: 100,
      hairline: 100,
      extra_light: 200,
      ultra_light: 200,
      light: 300,
      book: 300,
      normal: 400,
      regular: 400,
      medium: 500,
      semi_bold: 600,
      demi_bold: 600,
      demi: 600,
      bold: 700,
      extra_bold: 800,
      ultra_bold: 800,
      black: 900,
      heavy: 900,
      extra_black: 900,
      ultra_black: 900,
    };

  if (weightRegex.exec(declaredWeight)) {
    /* MULTIPLE WEIGHTS */
    weight = declaredWeight;
  } else if (parseInt(declaredWeight)) {
    /* Font already an integer - assuming correct */
    weight = parseInt(declaredWeight);
  } else if (declaredWeight !== "normal" && declaredWeight !== "regular") {
    /* assumed correct weight labels */
    weight = fontWeights[declaredWeight];
  } else {
    /* Likely default weight added in - checking for more deets */
    /* CHECK FONT NAME FOR WEIGHT CLUES */
    var isThin = !!THIN.exec(font.family),
      isHairline = !!HAIRLINE.exec(font.family),
      isLight = !!LIGHT.exec(font.family),
      isBook = !!BOOK.exec(font.family),
      isNormal = !!NORMAL.exec(font.family),
      isRegular = !!REGULAR.exec(font.family),
      isMedium = !!MEDIUM.exec(font.family),
      isDemi = !!DEMI.exec(font.family),
      isSemi = !!SEMI.exec(font.family),
      isBold = !!BOLD.exec(font.family),
      isBlack = !!BLACK.exec(font.family),
      isHeavy = !!HEAVY.exec(font.family),
      isExtra = !!EXTRA.exec(font.family),
      isUltra = !!ULTRA.exec(font.family);

    isThin
      ? (weight = fontWeights.thin)
      : isHairline
      ? (weight = fontWeights.hairline)
      : (isExtra && isLight) || (isUltra && isLight)
      ? (weight = fontWeights.extra_light)
      : isLight
      ? (weight = fontWeights.light)
      : isBook
      ? (weight = fontWeights.book)
      : isNormal || isRegular
      ? (weight = fontWeights.normal)
      : isMedium
      ? (weight = fontWeights.medium)
      : isDemi || isSemi
      ? (weight = fontWeights.demi_bold)
      : (isExtra && isBold) || (isUltra && isBold)
      ? (weight = fontWeights.extra_bold)
      : isBold && !isDemi && !isSemi
      ? (weight = fontWeights.bold)
      : (isExtra && isBlack) ||
        (isUltra && isBlack) ||
        (isExtra && isHeavy) ||
        (isUltra && isHeavy)
      ? (weight = fontWeights.ultra_black)
      : isBlack || isHeavy
      ? (weight = fontWeights.heavy)
      : null;
  }
  font.weight = weight;
  return font;
}
let $fontModal = jQuery(".bx-modal_container .mint-theme.ember-view"),
$fontFaceTextField = $fontModal.find(".font-input.ember-text-area");

$fontFaceTextField.on("input", function () {
  let font = extractFont($(this).val());
  $fontModal.children().each(function () {
    if ($(this).has("label")) {
      if ($(this).children("label").text() == "Family") {
        $(this).children("div").text(font.family);
      } else if ($(this).children("label").text() == "Style") {
        $(this).children("div").text(font.style);
      } else if ($(this).children("label").text() == "Weight") {
        $(this).children("div").text(font.weight);
      } else if ($(this).children("label").text() == "Stack") {
        if (font.family.includes(" ")) {
          $(this).children("input").val(`"${font.family}",`);
        } else {
          $(this).children("input").val(`${font.family},`);
        }
      } else if ($(this).children("label").text() == "Reference URL") {
        $(this).children("input").val(font.src);
      } else if ($(this).children("label").text() == "Font") {
        $(this).find("div textarea").val(font.prefix);
      }
    }
  });
});
}

jQuery(".bare-btn.bare-btn__text").on("click", function () {setTimeout(doTheThing, 100);});
})();

