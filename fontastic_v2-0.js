javascript: (() => {
  var currentStep = 0,
  endingPoint,
  stylesheetIterationActive = false,
  fontList;
  function fontastic() {
    var wkndDarkBlue = "#303D78",
    wkndLightBlue = "#3D54CC",
    wkndGreen = "#24B79D",
    wkndRed = "#FF4133",
    wkndYellow = "#FFBB00",
    black = "black",
    white = "white";

    if (jQuery(".bx-modal_container").length) {
      jQuery(".bx-modal_container").css("max-height", "98%");
      jQuery(".bx-modal_container").css("padding-bottom", "20px");
    }

    /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes */
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
      var result = [];
      allFonts = findLatinTags(allFonts);
      if (!allFonts) {
        throw Error("No font face detected");
      } else {
        var fontArray = allFonts.trim().split("@font-face"),
          filteredArray = fontArray.filter(
            (n) => !!n && n.includes("font-family")
          );
        // console.log("fontArray in getFonts():", fontArray);
        // console.log("filteredArray in getFonts():", filteredArray);
        for (var font of filteredArray) {
          var fontObject = extractFont(font);
          if (fontObject.style === "italic" || fontObject.style === "oblique") {
            var filter = result.filter(
              (element) => element.family === fontObject.family
            );
            if (
              !filter.find(
                (elem) =>
                  elem.family === fontObject.family &&
                  elem.weight === fontObject.weight
              )
            ) {
              result.push(fontObject);
            }
          } else {
            result.push(fontObject);
          }
        }
      }
      // console.log("Font list in getFonts(): ", result);
      return result;
    }

    function findLatinTags(fonts = "") {
      console.log("fonts in findLatinTags(): ", fonts);
      /* Check for Latin fonts */
      var languagesRegex = /([\/+\*+\s+\w\-\s+\*+\/+\s*]*)?@font-face\s*({[\w\d\s:';\-\/.+,()%]+})/gi,
        extractedContent = fonts.match(languagesRegex);
      console.log("extractedContent in fintLatinTags(): ", fonts.match(languagesRegex));
      var  allFonts = "";
      // console.log("extractedContent in findLatinTags():", extractedContent);
      for (var result of extractedContent) {
        if (result.includes("/*")) {
          if (result.includes("latin") && !result.includes("-ext")) {
            allFonts += result;
          }
        } else {
          allFonts += result;
        }
      }
      var removeTagRegex = /@font-face\s*{[\w\s\d\.\*\/,:;'"\-\+()\[\]]+}/gi;
      // console.log("allFonts in findLatinTags(): ", allFonts);
      return allFonts;
    }

    function extractFont(fontFace = "") {
      // console.log("Font in extractFont(): ", fontFace);
      if (!fontFace) {
        throw Error("No font detected");
      }
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
        prefix,
        declaration = "@font-face " + fontFace;

      /* Check for weight attribute, and if it is numerical, turn it into a number, otherwise set as "normal" */
      if (parsedFont.match(weightRegex)) {
        weightExtract = weightRegex.exec(parsedFont);
        weight = parseInt(weightExtract[1])
          ? parseInt(weightExtract[1])
          : weightExtract[1];
        declaredWeight = weight;
      } else {
        weight = "normal";
        declaredWeight = weight;
        if (!declaration.includes("font-weight")) {
          declaration =
            declaration.slice(0, -2) +
            "\nfont-weight: normal;\n" +
            declaration.slice(-1);
        }
      }

      /* Check for style attribute, otherwise set as "normal" */
      if (parsedFont.match(styleRegex)) {
        styleExtract = styleRegex.exec(parsedFont);
        style = styleExtract[1];
        declaredStyle = style;
      } else {
        style = "normal";
        declaredStyle = undefined;
        if (!declaration.includes("font-style")) {
          declaration =
            declaration.slice(0, -2) +
            "\nfont-style: normal;\n" +
            declaration.slice(-1);
        }
      }

      if (!parsedFont.match(sourceRegex).length) {
        /* DO SOMETHING FOR NO MATCHES */
        source = "No source detected. Please manually enter...";
        prefix = "No source detected. Please manually enter...";
      } else {
        /* DO SOMETHING FOR ONE OR MORE MATCHES */
        source = determineSrc(parsedFont.match(sourceRegex).join());
        url = source.url;
        prefix = source.prefix;
      }

      var extractedFont = determineWeight({
        family: family.replace(/"|'/g, ""),
        declaredStyle,
        style,
        declaredWeight,
        weight,
        src: url,
        prefix,
        declaration,
        stack: null,
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
      $fontFaceTextField = $fontModal.find(
        ".font-input.ember-text-area:not('.input-wrap_input')"
      );

      var weightError = document.createElement("p");
    weightError.className = "weight_error_text";
    weightError.style.color = wkndLightBlue;
    weightError.style.fontSize = ".7em";
    weightError.style.fontStyle = "italic";
    weightError.style.textAlign = "right";

    var stackError = document.createElement("p");
    stackError.className = "stack_error_text";
    stackError.style.color = wkndLightBlue;
    stackError.style.fontSize = ".7em";
    stackError.style.fontStyle = "italic";
    stackError.style.textAlign = "right";

    var sourceError = document.createElement("p");
    sourceError.className = "source_error_text";
    sourceError.style.color = wkndLightBlue;
    sourceError.style.fontSize = ".7em";
    sourceError.style.fontStyle = "italic";
    sourceError.style.textAlign = "right";

    var stylesheetHelperButton = document.createElement("button");
    stylesheetHelperButton.className = "stylesheet_helper_button";
    stylesheetHelperButton.innerText = "Let's try a whole stylesheet!";
    stylesheetHelperButton.style.color = "white";
    stylesheetHelperButton.style.fontWeight = "bold";
    stylesheetHelperButton.style.backgroundColor = wkndDarkBlue;
    stylesheetHelperButton.style.height = "40px";
    stylesheetHelperButton.style.margin = "10px auto";
    stylesheetHelperButton.style.padding = "0 20px";
    stylesheetHelperButton.style.border = "none";
    if (!jQuery(".stylesheet_helper_button").length) {
      jQuery(".bx-modal_container").children("[id*='ember']").append("<br>");
      jQuery(".bx-modal_container")
        .children("[id*='ember']")
        .append(stylesheetHelperButton);
        stylesheetIterationActive = true;
    }

    
    var stylesheetShroud = document.createElement("div");
    stylesheetShroud.className = "fontastic_shroud";
    stylesheetShroud.style.position = "absolute";
    stylesheetShroud.style.top = "0";
    stylesheetShroud.style.left = "0";
    stylesheetShroud.style.width = "100vw";
    stylesheetShroud.style.height = "100vh";
    stylesheetShroud.style.zIndex = "9999999";
    stylesheetShroud.style.backgroundColor = "rgba(0,0,0,.7)";
    
    var stylesheetDiv = document.createElement("div");
    stylesheetDiv.className = "stylesheet_helper_container";
    stylesheetDiv.style.width = "600px";
    stylesheetDiv.style.height = "80vh";
    stylesheetDiv.style.zIndex = "100000000";
    stylesheetDiv.style.top = "calc(50vh - 40vh)";
    stylesheetDiv.style.left = "calc(50vw - 300px)";
    stylesheetDiv.style.position = "flex";
    stylesheetDiv.style.position = "absolute";
    stylesheetDiv.style.display = "flex";
    stylesheetDiv.style.flexDirection = "column";
    stylesheetDiv.style.padding = "20px";
    stylesheetDiv.style.justifyContent = "space-between";
    stylesheetDiv.style.alignItems = "center";
    stylesheetDiv.style.backgroundColor = wkndDarkBlue;
    
    var stylesheetTextElement = document.createElement("textarea");
    stylesheetTextElement.id = "stylesheet_helper_textarea";
    stylesheetTextElement.className = "stylesheet_helper_textarea";
    stylesheetTextElement.style.marginBottom = "20px";
    stylesheetTextElement.style.flexGrow = "2";
    stylesheetTextElement.style.width = "calc(100% - 20px)";
    stylesheetTextElement.style.border = "none";
    stylesheetTextElement.style.backgroundColor = black;
    stylesheetTextElement.style.color = white;
    stylesheetTextElement.style.outlineColor = wkndGreen;
    stylesheetTextElement.style.outlineOffset = "2px";
    stylesheetTextElement.style.fontFamily = "monospace";
    stylesheetTextElement.style.fontSize = "16px";
    
    var stylesheetTextElementLabel = document.createElement("label");
    stylesheetTextElementLabel.setAttribute(
      "for",
      "stylesheet_helper_textarea"
      );
      stylesheetTextElementLabel.innerText = "Enter Stylesheet Here:";
      stylesheetTextElementLabel.style.color = white;
      stylesheetTextElementLabel.style.marginBottom = "20px";
      stylesheetTextElementLabel.style.fontSize = "18px";
      stylesheetTextElementLabel.style.fontWeight = "600";
      
      var stylesheetInput,
      stylesheetSubmit = document.createElement("button");
      stylesheetSubmit.innerText = "Let's give it a go!";
      stylesheetSubmit.style.padding = "10px";
      stylesheetSubmit.style.fontWeight = "bold";
      stylesheetSubmit.style.backgroundColor = white;
      stylesheetSubmit.style.color = wkndDarkBlue;
      stylesheetSubmit.style.outlineOffset = "2px";
      stylesheetSubmit.style.outlineColor = wkndGreen;
      stylesheetSubmit.style.border = "none";
      
      stylesheetSubmit.onclick = function () {
        stylesheetInput = stylesheetTextElement.value;
        stylesheetParsedFonts = getFonts(stylesheetInput);
        console.log("I have saved your items, friend: ", stylesheetParsedFonts);
        stylesheetTextElement.value = "";
        stylesheetIterationActive = true;
        endingPoint = stylesheetParsedFonts.length - 1;
        jQuery(".close_stylesheet").click();
        fontList = stylesheetParsedFonts;
        $fontFaceTextField.val(fontList[0].declaration);
        $fontFaceTextField.trigger("input");
      };
      
      var closeBtn = document.createElement("button");
      closeBtn.className = "close_stylesheet";
      closeBtn.innerText = "Close";
      closeBtn.style.margin = "10px";
      closeBtn.style.padding = "10px";
      closeBtn.style.fontWeight = "bold";
      closeBtn.style.backgroundColor = white;
      closeBtn.style.color = wkndDarkBlue;
      closeBtn.style.border = "none";
      closeBtn.style.outlineColor = wkndRed;
      closeBtn.style.outlineOffset = "2px";
      closeBtn.onclick = function () {
        jQuery(".fontastic_shroud").remove();
        jQuery(".stylesheet_helper_container").remove();
        stylesheetIterationActive = false;
      };

      $fontFaceTextField.on("input", function () {
      var font = getFonts($(this).val())[0],
        prefix = font.prefix,
        urlRegex = /http[s]*:\/{2}[\w\d]+[.\w\d]+[.\w\d]*[\/\w\d.]*/gi;
      if (!font.declaredWeight || !font.declaredStyle) {
        $(this).val(font.declaration);
      }
      $fontModal.children().each(function () {
        if ($(this).has("label")) {
          if ($(this).children("label").text() == "Family") {
            $(this).children("div").text(font.family);
          } else if ($(this).children("label").text() == "Style") {
          } else if ($(this).children("label").text() == "Weight") {
            if (!jQuery(".weight_error_text").length) {
              $(this).append(weightError);
            }
            weightError.innerHTML = "";
            if (font.weight !== font.declaredWeight) {
              if (font.declaredWeight === undefined) {
                weightError.innerHTML = `Please add a font-weight to the declaration above. <b>Suggestion: ${font.weight}</b>.`;
              } else if (font.declaredWeight === "normal") {
                weightError.innerHTML = `This font weight appears to be <b>${font.weight}</b>. If so, please manually update the font-weight in the declaration above.`;
              }
            }
          } else if ($(this).children("label").text() == "Stack") {
            if (!jQuery(".stack_error_text").length) {
              $(this).append(stackError);
            }
            stackError.innerText = "";
            if (font.stack) {
              $(this).children("input").val(font.stack);
            } else {
              if (font.family.includes(" ")) {
                $(this).children("input").val(`"${font.family}",`);
              } else {
                $(this).children("input").val(`${font.family},`);
              }
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
            if (!jQuery(".source_error_text").length) {
              $(this).append(sourceError);
            }
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

    jQuery(".create-btn.flat-btn.flat-btn__primary").on("click", function () {
      console.log("Next font");
      if (currentStep < endingPoint) {
        currentStep++;
      } else {
        currentStep = 0;
        stylesheetIterationActive = false;
        showFinale();
      }
    });

    function showFinale() {
      if (!jQuery(".fontastic_finale").length) {
        var finaleContainer = document.createElement("div"),
          finaleImg = document.createElement("img"),
          finaleShroud = document.createElement("div");
        
        finaleImg.src = "https://i.ibb.co/G7BJ423/we-did-it.png";
        finaleImg.style.cursor = "pointer";
        finaleImg.onclick = function () {
          jQuery(".fontastic_finale").remove();
        }

        finaleShroud.className = "fontastic_finale";
        finaleShroud.style.background = `radial-gradient(rgba(0,0,0,.75), rgba(48, 61, 120, .75), rgba(61, 84, 204, .75), rgba(36, 183, 157, .75), rgba(255, 187, 0, .75), rgba(255, 65, 51, .75))`;
        finaleShroud.style.top = "0";
        finaleShroud.style.left = "0";
        finaleShroud.style.width = "100vw";
        finaleShroud.style.height = "100vh";
        finaleShroud.style.zIndex = "9999999";
        finaleShroud.style.position = "absolute";
        finaleShroud.style.display = "flex";
        finaleShroud.style.alignItems = "center";
        finaleShroud.style.justifyContent = "center";

        finaleContainer.append(finaleImg);
        finaleShroud.append(finaleContainer);
        jQuery("body").append(finaleShroud);
      } else {
        jQuery(".fontastic_finale").remove();
      }
    }

    /* LOGIC FOR STYLESHEET ITERATION */
    stylesheetHelperButton.onclick = function () {
      if (!jQuery(".stylesheet_helper_container").length) {
        stylesheetDiv.append(stylesheetTextElementLabel);
        stylesheetDiv.append(stylesheetTextElement);
        stylesheetDiv.append(stylesheetSubmit);
        stylesheetDiv.append(closeBtn);
        stylesheetShroud.append(stylesheetDiv);
        jQuery("body").append(stylesheetShroud);
        stylesheetTextElement.focus();
      }
    };

    /* CREATE NOTICE TAB AT BOTTOM OF SCREEN */
    var logoBlackURL = "https://i.ibb.co/BnBH3xW/Fontastic-logo-black.png",
      logoImg = document.createElement("img"),
      runningNoticeDiv = document.createElement("div"),
      noticeSpan = document.createElement("span");

    runningNoticeDiv.style.backgroundColor = wkndYellow;
    runningNoticeDiv.className = "fontastic_logo_container";
    runningNoticeDiv.style.position = "absolute";
    runningNoticeDiv.style.zIndex = "999999999";
    runningNoticeDiv.style.right = "0";
    runningNoticeDiv.style.bottom = "0";
    runningNoticeDiv.style.display = "flex";
    runningNoticeDiv.style.alignItems = "center";
    runningNoticeDiv.style.padding = "3px 8px";
    runningNoticeDiv.style.cursor = "pointer";
    runningNoticeDiv.style.borderRadius = "5px 0 0 0";
    runningNoticeDiv.style.border = "1px solid black";
    runningNoticeDiv.onclick = function () {
      showFinale();
    };

    logoImg.src = logoBlackURL;
    logoImg.className = "fontastic_logo";
    logoImg.style.width = "75px";

    noticeSpan.innerText = "is active. To disable, please refresh this page.";
    noticeSpan.style.fontWeight = "600";
    noticeSpan.style.fontSize = "10px";
    noticeSpan.style.color = black;

    runningNoticeDiv.append(logoImg);
    runningNoticeDiv.append(noticeSpan);
    if (!jQuery(".fontastic_logo_container").length) {
      jQuery("body").append(runningNoticeDiv);
    }
  }
  fontastic();
  jQuery(".bare-btn.bare-btn__text").on("click", function () {
    setTimeout(fontastic, 100);
  });
})();

var withSomeLanguageTags = `
    /* latin-ext */
    @font-face {
    font-family: 'DM Serif Display';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/dmserifdisplay/v5/-nFnOHM81r4j6k0gjAW3mujVU2B2G_5x0vrx52jJ3Q.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }
    /* latin */
    @font-face {
    font-family: 'DM Serif Display';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/dmserifdisplay/v5/-nFnOHM81r4j6k0gjAW3mujVU2B2G_Bx0vrx52g.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    "@font-face  {
      font-family: 'DM Serif Display';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/dmserifdisplay/v5/-nFnOHM81r4j6k0gjAW3mujVU2B2G_Bx0vrx52g.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* latin */
      "
    /* devanagari */
    @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLDz8Z11lFd2JQEl8qw.woff2) format('woff2');
    unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
    }
    /* latin-ext */
    @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLDz8Z1JlFd2JQEl8qw.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }
    /* latin */
    @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLDz8Z1xlFd2JQEk.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    /* devanagari */
    @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiEyp8kv8JHgFVrJJbecnFHGPezSQ.woff2) format('woff2');
    unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
    }
    /* latin-ext */
    @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiEyp8kv8JHgFVrJJnecnFHGPezSQ.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }
    /* latin */
    @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    
    /* devanagari */
    @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLEj6Z11lFd2JQEl8qw.woff2) format('woff2');
    unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
    }
    /* latin-ext */
    @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLEj6Z1JlFd2JQEl8qw.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }
    @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLEj6Z1xlFd2JQEk.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    /* devanagari */
    @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLCz7Z11lFd2JQEl8qw.woff2) format('woff2');
    unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
    }
    /* latin-ext */
    @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLCz7Z1JlFd2JQEl8qw.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }
    @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLCz7Z1xlFd2JQEk.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

`;