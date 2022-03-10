javascript: (() => {
  var fontList = [],
    currentStep = 0,
    lastStep = fontList.length,
    stylesheetIterationActive = false,
    wkndDarkBlue = "#303D78",
    wkndLightBlue = "#3D54CC",
    wkndGreen = "#24B79D",
    wkndRed = "#FF4133",
    wkndYellow = "#FFBB00",
    black = "black",
    white = "white",
    itWorked =
      "https://c.tenor.com/yvMdPappqVwAAAAM/hell-yeah-it-worked-derrick-boner.gif",
    ohHiMarch = "https://pbs.twimg.com/media/D0lACr6VsAEj8iV.png";

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
      // throw Error("No font face detected");
      console.log("No font face detected...");
      return result;
    } else {
      var fontArray = allFonts.trim().split("@font-face"),
        filteredArray = fontArray.filter(
          (n) => !!n && n.includes("font-family")
        );
      // console.log("fontArray in getFonts():", fontArray);
      // console.log("filteredArray in getFonts():", filteredArray);
      // FOR EACH FONT, EXTRACT THE INFO FROM IT. IF THE STYLE IS NOT "NORMAL", ONLY ADD IF IT HAS A UNIQUE FONT-FAMILY
      for (var font of filteredArray) {
        var fontObject = extractFont(font);
        if (fontObject.style === "italic" || fontObject.style === "oblique") {
          // TRY THE CONDITION BELOW INSTEAD
          // if (fontObject.style !== "normal") {
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
    if (!fonts) {
      return;
    }
    // console.log("fonts in findLatinTags(): ", fonts);
    /* Check for Latin fonts */
    var languagesRegex = /([\/+\*+\s+\w\-\s+\*+\/+\s*]*)?@font-face\s*({[\w\d\s:';\-\/.+,()%_"]+})/gi,
      extractedContent = fonts.match(languagesRegex);
    // console.log(
    //   "extractedContent in fintLatinTags(): ",
    //   fonts.match(languagesRegex)
    // );
    var allFonts = "";
    /* IF THERE ARE FONTS WITH LANGUAGE TAGS, SAVE ONLY THE LATIN ONES, AND REMOVE THE TAG */
    for (var result of extractedContent) {
      if (result.includes("/*")) {
        if (result.includes("latin") && !result.includes("-ext")) {
          allFonts += result;
        }
      } else {
        allFonts += result;
      }
    }
    var removeTagRegex = /@font-face\s*({[\w\d\s:';\-\/.+,()%_"]+})/gi;
    var allFontsTagRemoved = allFonts.match(removeTagRegex);
    return allFontsTagRemoved.join();
  }

  function extractFont(fontFace = "") {
    // console.log("Font in extractFont(): ", fontFace);
    if (!fontFace) {
      // throw Error("No font detected");
      console.log("No font detected in extractFont()...");
    }
    var simplifiedFont = fontFace.replace(/(\r\n|\n|\r)/gm, " "),
      familyRegex = /family:\s*([^;]+);/gi,
      family = familyRegex.exec(simplifiedFont)[1],
      styleRegex = /style:\s*([^;]+);/gi,
      weightRegex = /weight:\s*([^;]+)/gi,
      sourceRegex = /src:\s*([^;]+)/gi,
      source = "",
      declaredStyle,
      style,
      declaredWeight,
      weight,
      declaredURL,
      url,
      prefix,
      declaration = "@font-face " + fontFace;

    /* Check for weight attribute, and if it is numerical, turn it into a number, otherwise set as "normal" */
    if (simplifiedFont.match(weightRegex)) {
      weightExtract = weightRegex.exec(simplifiedFont);
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
    if (simplifiedFont.match(styleRegex)) {
      styleExtract = styleRegex.exec(simplifiedFont);
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

    // Check for source attribute
    if (!simplifiedFont.match(sourceRegex).length) {
      /* DO SOMETHING FOR NO MATCHES */
      source = "No source detected. Please manually enter...";
      prefix = "No source detected. Please manually enter...";
    } else {
      /* DO SOMETHING FOR ONE OR MORE MATCHES */
      source = determineSrc(simplifiedFont.match(sourceRegex).join());
      declaredURL = source.url;
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

  function extractSourceURL(src = "") {
    var format;

    src.includes(".woff2")
      ? (format = "woff2")
      : src.includes(".woff")
      ? (format = "woff")
      : src.includes(".ttf")
      ? (format = "ttf")
      : src.includes(".otf")
      ? (format = "otf")
      : src.includes(".eot")
      ? (format = "eot")
      : (format = "unknown");

    var searchString = new RegExp(
        String.raw`[^\s("']+\.${format}[^\s)"']*`,
        "g"
      ),
      prefix = `data:application/x-font-${format};base64,`,
      resultUrl = src.match(searchString);
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

  function stopIteration() {
    currentStep = 0;
    fontList = [];
    lastStep = fontList.length;
    stylesheetIterationActive = false;
    $(".bare-btn.bare-btn__text").text(`New Font`);
    // if (jQuery(".font-input.ember-text-area:not('.input-wrap_input')").length) {
    //   jQuery(".font-input.ember-text-area:not('.input-wrap_input')").val("");
    //   jQuery(".font-input.ember-text-area:not('.input-wrap_input')").trigger(
    //     "input"
    //   );
    // }
  }

  // let url = "https://expectful.com/wp-content/themes/expectful/fonts/sfprowoff/SF-Pro-Display-Medium.woff2"

  function base64Converter(url = "") {
    let base64String = "";
    if (!url) {
      console.log("No URL found.");
    } else {
      fetch(url)
        .then((response) => response.blob())
        .then((font) => {
          const reader = new FileReader();
          reader.onload = function () {
            console.log("Base 64 conversion inside onload function:", this.result);
            return this.result;
            // base64String = this.result;
          };
          reader.readAsDataURL(font);
        });
    }
  }

  // base64Converter(url);

  function showFinale(image = ohHiMarch) {
    if (!jQuery(".fontastic_finale").length) {
      var finaleContainer = document.createElement("div"),
        finaleImg = document.createElement("img"),
        finaleShroud = document.createElement("div");

      finaleImg.src = image;
      finaleImg.style.cursor = "pointer";
      finaleImg.onclick = function () {
        jQuery(".fontastic_finale").remove();
      };

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

  /* DEFINE APP ELEMENTS */
  var weightError = document.createElement("p"),
    stackError = document.createElement("p"),
    sourceError = document.createElement("p"),
    stylesheetHelperBtn = document.createElement("button"),
    stylesheetAbortBtn = document.createElement("button"),
    stylesheetShroud = document.createElement("div"),
    stylesheetDiv = document.createElement("div"),
    stylesheetTextElement = document.createElement("textarea"),
    stylesheetTextElementLabel = document.createElement("label"),
    stylesheetSubmitBtn = document.createElement("button"),
    stylesheetCloseBtn = document.createElement("button"),
    logoImg = document.createElement("img"),
    runningNoticeDiv = document.createElement("div"),
    noticeSpan = document.createElement("span"),
    logoBlueURL = "https://i.ibb.co/JR9sbFN/fontastic-logo-blue.png",
    counterDiv = document.createElement("div"),
    counterText = document.createElement("h5");

  counterDiv.className = "fontastic_counter_container";
  counterText.className = "fontastic_counter_text";
  counterText.style.marginTop = "-25px";
  counterText.style.marginBottom = "10px";
  counterText.style.fontSize = "16px";
  counterText.style.fontWeight = "bold";
  counterText.style.color = wkndGreen;

  weightError.className = "weight_error_text";
  weightError.style.color = wkndLightBlue;
  weightError.style.fontSize = ".7em";
  weightError.style.fontStyle = "italic";
  weightError.style.textAlign = "right";

  stackError.className = "stack_error_text";
  stackError.style.color = wkndLightBlue;
  stackError.style.fontSize = ".7em";
  stackError.style.fontStyle = "italic";
  stackError.style.textAlign = "right";

  sourceError.className = "source_error_text";
  sourceError.style.color = wkndLightBlue;
  sourceError.style.fontSize = ".7em";
  sourceError.style.fontStyle = "italic";
  sourceError.style.textAlign = "right";

  stylesheetHelperBtn.className = "stylesheet_helper_button";
  stylesheetHelperBtn.innerText = "Let's try a whole stylesheet!";
  stylesheetHelperBtn.style.color = white;
  stylesheetHelperBtn.style.fontWeight = "bold";
  stylesheetHelperBtn.style.backgroundColor = wkndLightBlue;
  stylesheetHelperBtn.style.height = "40px";
  stylesheetHelperBtn.style.margin = "10px auto";
  stylesheetHelperBtn.style.padding = "0 20px";
  stylesheetHelperBtn.style.border = "none";

  stylesheetAbortBtn.className = "stylesheet_abort_button";
  stylesheetAbortBtn.innerText = "Clear stylesheet";
  stylesheetAbortBtn.style.color = white;
  stylesheetAbortBtn.style.fontWeight = "bold";
  stylesheetAbortBtn.style.backgroundColor = wkndRed;
  stylesheetAbortBtn.style.height = "40px";
  stylesheetAbortBtn.style.margin = "10px auto";
  stylesheetAbortBtn.style.padding = "0 20px";
  stylesheetAbortBtn.style.border = "none";
  stylesheetAbortBtn.onclick = function () {
    stopIteration();
    jQuery(".bx-modal_close").click();
  };

  stylesheetShroud.className = "fontastic_shroud";
  stylesheetShroud.style.position = "absolute";
  stylesheetShroud.style.top = "0";
  stylesheetShroud.style.left = "0";
  stylesheetShroud.style.width = "100vw";
  stylesheetShroud.style.height = "100vh";
  stylesheetShroud.style.zIndex = "9999999";
  stylesheetShroud.style.backgroundColor = "rgba(0,0,0,.7)";

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

  stylesheetTextElementLabel.setAttribute("for", "stylesheet_helper_textarea");
  stylesheetTextElementLabel.innerText = "Enter Stylesheet Here:";
  stylesheetTextElementLabel.style.color = white;
  stylesheetTextElementLabel.style.marginBottom = "20px";
  stylesheetTextElementLabel.style.fontSize = "18px";
  stylesheetTextElementLabel.style.fontWeight = "600";

  stylesheetSubmitBtn.innerText = "Let's give it a go!";
  stylesheetSubmitBtn.style.padding = "10px";
  stylesheetSubmitBtn.style.fontWeight = "bold";
  stylesheetSubmitBtn.style.backgroundColor = white;
  stylesheetSubmitBtn.style.color = wkndLightBlue;
  stylesheetSubmitBtn.style.outlineOffset = "2px";
  stylesheetSubmitBtn.style.outlineColor = wkndGreen;
  stylesheetSubmitBtn.style.border = "none";

  stylesheetCloseBtn.className = "close_stylesheet";
  stylesheetCloseBtn.innerText = "Close";
  stylesheetCloseBtn.style.marginTop = "10px";
  stylesheetCloseBtn.style.padding = "10px";
  stylesheetCloseBtn.style.fontWeight = "bold";
  stylesheetCloseBtn.style.backgroundColor = white;
  stylesheetCloseBtn.style.color = wkndLightBlue;
  stylesheetCloseBtn.style.border = "none";
  stylesheetCloseBtn.style.outlineColor = wkndRed;
  stylesheetCloseBtn.style.outlineOffset = "2px";

  runningNoticeDiv.className = "fontastic_logo_container";
  runningNoticeDiv.style.backgroundColor = wkndYellow;
  runningNoticeDiv.style.position = "absolute";
  runningNoticeDiv.style.zIndex = "999999999";
  runningNoticeDiv.style.right = "0";
  runningNoticeDiv.style.bottom = "0";
  runningNoticeDiv.style.display = "flex";
  runningNoticeDiv.style.alignItems = "center";
  runningNoticeDiv.style.padding = "3px 8px";
  runningNoticeDiv.style.cursor = "pointer";
  runningNoticeDiv.style.color = wkndDarkBlue;
  runningNoticeDiv.style.borderRadius = "5px 0 0 0";
  runningNoticeDiv.style.border = `1px solid ${wkndDarkBlue}`;

  logoImg.src = logoBlueURL;
  logoImg.className = "fontastic_logo";
  logoImg.style.width = "60px";
  logoImg.style.paddingBottom = "4px";
  logoImg.style.paddingRight = "3px";
  logoImg.style.paddingTop = "2px";

  noticeSpan.innerText = "is active. To disable, please refresh this page.";
  noticeSpan.style.fontWeight = "600";
  noticeSpan.style.fontSize = "10px";

  function fontastic() {
    var $fontModal = jQuery(".bx-modal_container .mint-theme.ember-view"),
      $fontModalContainer = jQuery(".bx-modal_container"),
      $fontFaceTextField = $fontModal.find(
        ".font-input.ember-text-area:not('.input-wrap_input')"
      ),
      base64 = "",
      updatedURL = "";


    if ($fontModalContainer.length) {
      $fontModalContainer.css("max-height", "98%");
      $fontModalContainer.css("padding-bottom", "20px");
      if (!jQuery(".fontastic_counter_container").length) {
        counterDiv.append(counterText);
        $fontModalContainer.prepend(counterDiv);
      }
      if (stylesheetIterationActive) {
        counterText.innerText = `Stylesheet active. Font ${
          currentStep + 1
        } of ${lastStep}`;
        counterText.style.color = wkndGreen;
        $fontFaceTextField.val(fontList[currentStep].declaration);
        $fontFaceTextField.trigger("input");
      } else {
        counterText.innerText = "Stylesheet not active";
        counterText.style.color = wkndDarkBlue;
      }
    }

    if (!jQuery(".stylesheet_helper_button").length) {
      if (stylesheetIterationActive) {
        $fontModalContainer.children("[id*='ember']").append("<br>");
        $fontModalContainer
          .children("[id*='ember']")
          .append(stylesheetAbortBtn);
      } else {
        $fontModalContainer.children("[id*='ember']").append("<br>");
        $fontModalContainer
          .children("[id*='ember']")
          .append(stylesheetHelperBtn);
      }
    }

    /* On font submit */
    jQuery(".create-btn.flat-btn.flat-btn__primary").on("click", function () {
      // console.log("Next font");
      if (currentStep + 1 < lastStep) {
        // console.log(
        //   "Moving to the next step in click listener for '.create-btn.flat-btn.flat-btn__primary' in fontastic()"
        // );
        for (var font of fontList) {
          var currentFont = fontList[currentStep];
          if (font.family === currentFont.family && !font.stack) {
            font.stack = currentFont.stack;
          }
        }
        // console.log("fontList line 531:", fontList);
        stylesheetIterationActive = true;
        currentStep++;
        //   MAKE THE NEW FONT BUTTON SAY SOMETHING ELSE LIKE "NEXT FONT (2 OF 9)", AND ON CLICK, ACTIVATE THE NEXT FONT (TIMEOUT MAY BE UNNECESSARY THIS WAY)
        $(".bare-btn.bare-btn__text").text(
          `Next font (${currentStep + 1} of ${lastStep})`
        );
      } else {
        // console.log(
        //   "Stopping Iteration in click listener for '.create-btn.flat-btn.flat-btn__primary' at the end of fontastic()..."
        // );
        if (stylesheetIterationActive) {
          showFinale(itWorked);
        }
        stopIteration();
        // setTimeout(showFinale, 700);
      }
    });

    var stylesheetInput;

    stylesheetSubmitBtn.onclick = function () {
      stylesheetIterationActive = true;
      stylesheetInput = stylesheetTextElement.value;
      stylesheetParsedFonts = getFonts(stylesheetInput);
      fontList = stylesheetParsedFonts;
      lastStep = fontList.length;
      console.log("I have saved your items, friend: ", fontList);
      counterText.innerText = `Stylesheet iteration active: ${
        currentStep + 1
      } of ${lastStep}.`;
      counterText.style.color = wkndGreen;
      stylesheetTextElement.value = "";
      jQuery(".close_stylesheet").click();
      $fontFaceTextField.val(fontList[currentStep].declaration);
      $fontFaceTextField.trigger("input");
      if (jQuery(".stylesheet_helper_button").length) {
        jQuery(".stylesheet_helper_button").remove();
        $fontModalContainer
          .children("[id*='ember']")
          .append(stylesheetAbortBtn);
      }
    };

    stylesheetCloseBtn.onclick = function () {
      jQuery(".fontastic_shroud").remove();
      jQuery(".stylesheet_helper_container").remove();
    };

    $fontFaceTextField.on("input, change", function () {
      sourceError.innerText = "";
      if (!$(this).val()) {
        return;
      }
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
                weightError.innerHTML = `This font weight appears to be <b>${font.weight}</b>. If so, please update the font-weight in the declaration above.`;
              }
            }
          } else if ($(this).children("label").text() == "Stack") {
            if (!jQuery(".stack_error_text").length) {
              $(this).append(stackError);
            }
            stackError.innerText = "";
            if (fontList[currentStep] && fontList[currentStep].stack) {
              $(this).children("input").val(fontList[currentStep].stack);
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
              .on("input", function (e) {
                stackError.innerText = "";
                console.log("e.target.value in stack input: ", e.target.value);
                if (!$(this).val().endsWith("serif")) {
                  stackError.innerText = "Please use a valid font stack.";
                }
                if (fontList[currentStep]) {
                  fontList[currentStep].stack = e.target.value;
                }
                font.stack = e.target.value;
                currentStack = font.stack;
              });
          } else if ($(this).children("label").text() == "Reference URL") {
            var sourceInput = $(this).children("input");
            sourceInput.val(font.src);
            if (!jQuery(".source_error_text").length) {
              $(this).append(sourceError);
            }
            $(this)
              .children("input")
              .on("input", function () {
                var format,
                  source = sourceInput.val();
                if (!urlRegex.exec(source)) {
                  sourceError.innerText = "Please enter a valid URL.";
                } else {
                  sourceError.innerText = "";
                  updatedURL = source;
                  font.updatedURL = updatedURL;
                  // console.log("base64 inside input.on() function at bottom: ", base64);
                }
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
            if (base64) {
              $(this)
                .find("div textarea")
                .val(prefix + base64);
            } else {
              $(this).find("div textarea").val(prefix);
            }
          }
        }
      });
    });

    // $fontFaceTextField.trigger("input");

    /* LOGIC FOR STYLESHEET ITERATION */
    stylesheetHelperBtn.onclick = function () {
      if (!jQuery(".stylesheet_helper_container").length) {
        stylesheetDiv.append(stylesheetTextElementLabel);
        stylesheetDiv.append(stylesheetTextElement);
        stylesheetDiv.append(stylesheetSubmitBtn);
        stylesheetDiv.append(stylesheetCloseBtn);
        stylesheetShroud.append(stylesheetDiv);
        jQuery("body").append(stylesheetShroud);
        stylesheetTextElement.focus();
      }
    };
    runningNoticeDiv.onclick = function () {
      showFinale(ohHiMarch);
    };
    runningNoticeDiv.append(logoImg);
    runningNoticeDiv.append(noticeSpan);
    if (!jQuery(".fontastic_logo_container").length) {
      jQuery("body").append(runningNoticeDiv);
    }
  }

  fontastic();
  jQuery(".bare-btn.bare-btn__text").on("click", function () {
    // console.log("Next font clicked. State:");
    // console.log("Iteration active?", stylesheetIterationActive);
    // console.log("fontList:", fontList);
    // console.log("currentStep:", currentStep);
    // console.log("lastStep:", lastStep);
    setTimeout(fontastic, 100);
  });
})();

/* WORK ON LAST FONT IN STYLESHEET - fixed 3/8/2022 */
/* WORK ON "SKIP FONT" BUTTON IN CASE YOU FIND A FONT YOU DON'T NEED IN THE MIDDLE OF A STYLESHEET */
