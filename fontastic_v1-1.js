/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes */
javascript: (() => {
  function doTheThing() {
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

    function getFonts(allFonts = "") {
      // console.log("getFonts(): allFonts: ", allFonts);
      var result = [];
      allFonts = findLatinTags(allFonts);
      if (!allFonts) {
        throw Error("No fonts detected...");
      } else {
        var fontArray = allFonts.trim().split("@font-face"),
          filteredArray = fontArray.filter((n) => !!n);
        for (var font of filteredArray) {
          result.push(extractFont(font));
        }
      }
      return result;
    }

    function findLatinTags(fonts = "") {
      /* Check for Latin fonts */
      var languagesRegex = /\/+\*+\s+latin\s+\*+\/+\s*@font-face\s*({[\w\d\s:';\-\/.+,()]+})/gi,
        extractedContent = fonts.match(languagesRegex);
      // console.log("findLatinTags(): fonts: ", fonts);
      if (extractedContent) {
        /* remove language tag from result: */
        var removeTagRegex = /@font-face\s*{[\w\s\d\.\*\/,:;'"\-\+()\[\]]+}/gi,
          stringifyContent = extractedContent.join(" "),
          newFonts = stringifyContent.match(removeTagRegex).join(" ");
        return newFonts;
      } else {
        return fonts;
      }
    }

    function extractFont(fontFace = "") {
      if (!fontFace) {
        throw Error("extractFont(): No font detected");
      }
      // console.log("extractFont(): fontFace: ", fontFace);
      var parsedFont = fontFace.replace(/(\r\n|\n|\r)/gm, " "),
        familyRegex = /family:\s*([^;]+);/gi,
        family = familyRegex.exec(parsedFont)[1],
        styleRegex = /style:\s*([^;]+);/gi,
        weightRegex = /weight:\s*([^;]+)/gi,
        sourceRegex = /src:\s*([^;]+)/gi,
        source = "",
        declaredStyle,
        style,
        declaredWeight,
        weight,
        url,
        prefix;

      /* Check for weight attribute, and if it is numerical, turn it into a number, otherwise set as "normal" */
      // console.log("extractFont(): parsedFont.match(weightRegex): ", parsedFont.match(weightRegex));
      // console.log()
      if (parsedFont.match(weightRegex)) {
        weightExtract = weightRegex.exec(parsedFont);
        weight = parseInt(weightExtract[1])
          ? parseInt(weightExtract[1])
          : weightExtract[1];
        declaredWeight = weight;
      } else {
        weight = "normal";
        declaredWeight = undefined;
      }

      /* Check for style attribute, otherwise set as "normal" */
      // console.log("extractFont(): parsedFont.match(styleRegex): ", parsedFont.match(styleRegex));
      if (parsedFont.match(styleRegex)) {
        styleExtract = styleRegex.exec(parsedFont);
        style = styleExtract[1];
        declaredStyle = style;
      } else {
        style = "normal";
        declaredStyle = undefined;
      }

      // console.log("extractFont(): parsedFont.match(sourceRegex): ", parsedFont.match(sourceRegex));
      if (!parsedFont.match(sourceRegex).length) {
        /* DO SOMETHING FOR NO MATCHES */
        source = "No source detected. Please manually enter...";
        prefix = "No source detected. Please manually enter...";
      } else {
        /* DO SOMETHING FOR ONE OR MORE MATCHES */
        // console.log("extractFont(): determineSrc(parsedFont.match(sourceRegex).join()): ", determineSrc(parsedFont.match(sourceRegex).join()));
        // console.log("extractFont(): parsedFont.match(sourceRegex): ", parsedFont.match(sourceRegex));
        source = determineSrc(parsedFont.match(sourceRegex).join());
        url = source.url;
        prefix = source.prefix;
      }

      var extractedFont = determineWeight({
        family: family.replace(/"|'/g, ""),
        declaredStyle: declaredStyle,
        style: style,
        declaredWeight: declaredWeight,
        weight: weight,
        src: url,
        prefix: prefix,
      });
      return extractedFont;
    }

    function determineSrc(src = "") {
      var result = "";
      if (!src.length) {
        return "No source detected! Please manually enter...";
      } else {
        result = extractSourceURL(src);
      }
      return result;
    }

    function extractSourceURL(source = "") {
      var format;
      // console.log("extractSourceURL(): source: ", source);

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

      var searchString = new RegExp(
          String.raw`[^\s("']+\.${format}[^\s)"']*`,
          "g"
        ),
        prefix = `data:application/x-font-${format};base64,`,
        resultUrl = source.match(searchString);
        // console.log("extractSourceURL(): searchString: ", searchString);
        // console.log("extractSourceURL(): source.match(searchString): ", source.match(searchString));
        // console.log("Result URL:", resultUrl);
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
          : (weight = fontWeights.normal);
      }
      font.weight = weight;
      return font;
    }

    var $fontModal = jQuery(".bx-modal_container .mint-theme.ember-view"),
      $fontFaceTextField = $fontModal.find(".font-input.ember-text-area");

    var weightError = document.createElement("p");
    weightError.className = "weight_error_text";
    weightError.style.color = "slateblue";
    weightError.style.fontSize = ".7em";
    weightError.style.fontStyle = "italic";
    weightError.style.textAlign = "right";

    var styleError = document.createElement("p");
    styleError.className = "style_error_text";
    styleError.style.color = "slateblue";
    styleError.style.fontSize = ".7em";
    styleError.style.fontStyle = "italic";
    styleError.style.textAlign = "right";

    var stackError = document.createElement("p");
    stackError.className = "stack_error_text";
    stackError.style.color = "slateblue";
    stackError.style.fontSize = ".7em";
    stackError.style.fontStyle = "italic";
    stackError.style.textAlign = "right";

    var sourceError = document.createElement("p");
    sourceError.className = "source_error_text";
    sourceError.style.color = "slateblue";
    sourceError.style.fontSize = ".7em";
    sourceError.style.fontStyle = "italic";
    sourceError.style.textAlign = "right";

    $fontFaceTextField.on("input", function () {
      // console.log($(this).val());
      var font = getFonts($(this).val())[0],
        prefix = font.prefix,
        urlRegex = /http[s]*:\/{2}[\w\d]+[.\w\d]+[.\w\d]*[\/\w\d.]*/gi;
      $fontModal.children().each(function () {
        if ($(this).has("label")) {
          if ($(this).children("label").text() == "Family") {
            $(this).children("div").text(font.family);
          } else if ($(this).children("label").text() == "Style") {
            $(this).children("div").text(font.declaredStyle);
            $(this).append(styleError);
            styleError.innerText = "";
            if (font.style !== font.declaredStyle) {
              styleError.innerText = `Please add a font-style to the declaration above.`;
            }
          } else if ($(this).children("label").text() == "Weight") {
            $(this).children("div").text(font.declaredWeight);
            $(this).append(weightError);
            weightError.innerHTML = "";
            if (font.weight !== font.declaredWeight) {
              if (font.declaredWeight === undefined) {
                weightError.innerHTML = `Please add a font-weight to the declaration above. <b>Suggestion: ${font.weight}</b>.`;
              } else if (font.declaredWeight === "normal") {
                weightError.innerHTML = `This font weight appears to be <b>${font.weight}</b>. If so, please manually update the font-weight in the declaration above.`;
              }
            }
          } else if ($(this).children("label").text() == "Stack") {
            $(this).append(stackError);
            stackError.innerText = "";
            if (font.family.includes(" ")) {
              $(this).children("input").val(`"${font.family}",`);
            } else {
              $(this).children("input").val(`${font.family},`);
            }
            if ($(this).children("input").val().endsWith(",")) {
              stackError.innerText = "Please use a valid font stack.";
            }
            $(this)
              .children("input")
              .on("input", function () {
                stackError.innerText = "";
                if ($(this).val().endsWith(",")) {
                  stackError.innerText = "Please use a valid font stack.";
                }
              });
          } else if ($(this).children("label").text() == "Reference URL") {
            var sourceInput = $(this).children("input");
            sourceInput.val(font.src);
            $(this).append(sourceError);
            sourceError.innerText = "";
            if (!urlRegex.exec(sourceInput.val())) {
              sourceError.innerText = "Please enter a valid URL.";
            }
            $(this)
              .children("input")
              .on("input", function () {
                var format,
                  source = sourceInput.val();
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
                prefix = `data:application/x-font-${format};base64,`;
                $fontModal.find("textarea").last().val(prefix);
                if (!urlRegex.exec(sourceInput.val())) {
                  sourceError.innerText = "Please enter a valid URL";
                } else {
                  sourceError.innerText = "";
                }
              });
          } else if ($(this).children("label").text() == "Font") {
            $(this).find("div textarea").val(prefix);
          }
        }
      });
    });
  }
  doTheThing();
  jQuery(".bare-btn.bare-btn__text").on("click", function () {
    setTimeout(doTheThing, 100);
  });
})();
/*
@font-face {
    font-family: 'Poppins';
    font-weight: normal;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLCz7Z1xlFd2JQEk.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: Caslon;
  src: url("/css/fonts/Caslon.eot?#iefix") format("embedded-opentype");
  src: url("/css/fonts/Caslon.ttf") format("truetype"),
    url("/css/fonts/Caslon.svg") format("svg"),
    url("/css/fonts/Caslon.woff") format("woff");
}
*/

/* MAKE CODE TO OPEN THE NEXT FONT EDITOR AND PRE-FILLS THE NEXT FONT */
/* FONT WEIGHT NOT SAVING AS NUMERICAL - added vtext to inform user */
/* IF MULTPILE SRC, USES FIRST WHICH IS NOT IDEAL - fixed by stringifying all src options together */
