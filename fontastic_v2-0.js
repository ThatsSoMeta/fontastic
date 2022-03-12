var fontList = [],
  currentStep = 0,
  lastStep = fontList.length,
  stylesheetIterationActive = false,
  prefix = "",
  currentSource = "",
  wkndDarkBlue = "#303D78",
  wkndLightBlue = "#3D54CC",
  wkndGreen = "#24B79D",
  wkndRed = "#FF4133",
  wkndYellow = "#FFBB00",
  wkndSand = "#F4EAE1",
  wkndBrown = "#CC9965",
  black = "#000",
  white = "#FFF",
  errorTextFontSize = "10px",
  errorTextColor = wkndLightBlue,
  buttonHeight = "40px",
  buttonFontSize = "12px",
  itWorked =
    "https://c.tenor.com/yvMdPappqVwAAAAM/hell-yeah-it-worked-derrick-boner.gif",
  ohHiMarch = "https://pbs.twimg.com/media/D0lACr6VsAEj8iV.png",
  fontasticLogoBlack = "https://i.ibb.co/564nZpv/Fontastic-logo-black.png",
  fontasticLogoBlue = "https://i.ibb.co/Dt9sgBV/fontastic-logo-blue.png",
  fontasticLogoWhite = "https://i.ibb.co/5GKQ48R/Fontastic-logo-white.png";

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
  // console.log("allFonts in getFonts(): ", allFonts);
  allFonts = findLatinTags(allFonts);
  if (!allFonts) {
    throw Error("No font face detected in getFonts().");
  } else {
    var fontArray = allFonts.trim().split("@font-face"),
      filteredArray = fontArray.filter((n) => !!n && n.includes("font-family"));
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
  /* Check for Latin fonts */
  // console.log("fonts in findLatinTags:", fonts);
  var languagesRegex = /(\/\*\s*\w+-?\w*\s*\*\/\s*)?@font-face\s*({[\w\d\s:'";\-\/.+,()%_=?&#]+})/gi,
    extractedContent = fonts.match(languagesRegex),
    removeTagRegex = /@font-face\s*({[\w\d\s:';\-\/.+,()%_"=?&#]+})/gi;
  // console.log("extractedContent in findLatinTags(): ", extractedContent);
  var allFonts = "";
  /* IF THERE ARE FONTS WITH LANGUAGE TAGS, SAVE ONLY THE LATIN ONES, AND REMOVE THE TAG */
  for (var result of extractedContent) {
    // console.log("In extractedContent loop. Current font: ", result);
    if (result.includes("/*")) {
      if (result.includes("latin") && !result.includes("-ext")) {
        console.log("We will keep this one: ", result);
        console.log("Let's take the language tag off now instead of waiting.");
        var resultNoTag = result.match(removeTagRegex);
        console.log(resultNoTag);
        allFonts += resultNoTag[0];
      }
    } else {
      console.log("No language detected, so we will keep this, too.");
      allFonts += result;
    }
  }
  console.log("Now let's see what string we are passing along: ", allFonts);
  // var allFontsTagRemoved = allFonts.match(removeTagRegex);
  return allFonts;
}

function extractFont(fontFace = "") {
  if (!fontFace) {
    throw Error("No font detected inside of extractFont().");
  }
  var simplifiedFont = fontFace.replace(/(\r\n|\n|\r)/gm, " "),
    familyRegex = /family:\s*([^;]+);/gi,
    family = familyRegex.exec(simplifiedFont)[1],
    styleRegex = /style:\s*([^;]+);/gi,
    weightRegex = /weight:\s*([^;]+)/gi,
    sourceRegex = /src:\s*([\w\d\s:'\-\/.+,()%_"=?&#]+)/gi,
    source = "",
    declaredStyle,
    style,
    declaredWeight,
    weight,
    declaredURL,
    url,
    declaration = "@font-face " + fontFace.trim(),
    declarationStart = declaration.slice(0, -2).trim(),
    declarationEnd = declaration.slice(-1);

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
      if (!declarationStart.endsWith(";")) {
        declarationStart += ";";
      }
      if (!declarationEnd.endsWith("}")) {
        declarationEnd += "}";
      }
      declarationStart += "\nfont-weight: normal;\n";
    }
  }

  if (simplifiedFont.match(styleRegex)) {
    styleExtract = styleRegex.exec(simplifiedFont);
    style = styleExtract[1];
    declaredStyle = style;
  } else {
    style = "normal";
    declaredStyle = undefined;
    if (!declaration.includes("font-style")) {
      if (!declarationStart.endsWith(";")) {
        declarationStart += ";";
      }
      if (!declarationEnd.endsWith("}")) {
        declarationEnd += "}";
      }
      declarationStart += "\nfont-style: normal;\n";
    }
  }

  declaration = declarationStart + declarationEnd;
  // console.log("Declaration before removing double semicolons: ", declaration);
  // declaration = declaration.replace(/;\s*;/g, ";");
  // declaration = declaration.replace(/;[\s,]*}/g, ";\n}");
  // console.log("Declaration after removing double semicolons & other extra punctuation: ", declaration);

  // console.log(
  //   "simplifiedFont.match(sourceRegex) in extractFont(): ",
  //   simplifiedFont.match(sourceRegex)
  // );
  if (!simplifiedFont.match(sourceRegex).length) {
    source = "No source detected. Please manually enter...";
  } else {
    source = determineSrc(simplifiedFont.match(sourceRegex).join());
    // console.log("source in extractFont():", source);
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
  // console.log("src in extractSourceURL(): ", src);

  src.includes("woff2")
    ? (format = "woff2")
    : src.includes("woff")
    ? (format = "woff")
    : src.includes("ttf") || src.includes("truetype")
    ? (format = "ttf")
    : src.includes("otf")
    ? (format = "otf")
    : src.includes("eot") || src.includes("embedded-opentype")
    ? (format = "eot")
    : (format = "unknown");
  /* REMOVED PERIOD FROM ABOVE CHECK BECAUSE SOME URLS DON'T HAVE THE FORMAT, BUT IT IS STILL AVAILABLE IN THE format() PORTION */

  // console.log("Format in extractSourceURL(): ", format);
  var sourceURLRegex = new RegExp(
      String.raw`url\(['"]?([\w\d:\/\-.&%#$_=]*)['"]?\)\s*format\(['"]?${format}['"]?\)`,
      "gi"
    ),
    prefix = `data:application/x-font-${format};base64,`;
  srcMatchList = sourceURLRegex.exec(src);
  // console.log("scrMatchList in extractSourceURL(): ", srcMatchList);
  return {
    url: srcMatchList[1],
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
}

/* <3 Huge help from Triona, Nyssa, and https://pqina.nl/blog/convert-a-file-to-a-base64-string-with-javascript/ */
async function base64Converter(url = "") {
  console.log("Running base64Converter...");
  if (!url) {
    console.log("No URL found in base64Converter.");
  } else {
    console.log("URL:", url);
    await fetch(url)
      .then((response) => response.blob())
      .then((font) => {
        const reader = new FileReader();
        reader.onload = function () {
          const base64String = reader.result
            .replace("data:", "")
            .replace(/^.+,/, "");
          jQuery("textarea:last()").val(prefix + base64String);
        };
        reader.readAsDataURL(font);
      })
      .catch((error) => {
        console.error("Error:", error);
        base64Error.innerText =
          "Looks like this URL isn't working. Please try a different URL or skip this font.";
        base64Btn.disabled = true;
        base64Btn.style.opacity = ".5";
      });
  }
}

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

function skipFont() {
  console.log("skipFont() running...");
  console.log("Current step: ", currentStep);
  console.log("Last step: ", lastStep);
  if (!$fontFaceTextField) {
    var $fontFaceTextField = jQuery("textarea:first()");
  }

  if (!stylesheetIterationActive) {
    console.error("There is no font to skip.");
  } else if (currentStep + 1 < lastStep) {
    currentStep++;
    $fontFaceTextField.val(fontList[currentStep].declaration);
    $fontFaceTextField.trigger("input");
    counterText.innerText = `Stylesheet iteration active: ${
      currentStep + 1
    } of ${lastStep}`;
  } else {
    console.log("Stopping iteration");
    stopIteration();
    jQuery(".bx-modal_close").click();
  }
}

/* DEFINE APP ELEMENTS */
var weightError = document.createElement("p"),
  sourceError = document.createElement("p"),
  base64Error = document.createElement("p"),
  stackError = document.createElement("p"),
  counterText = document.createElement("h5"),
  stylesheetButtonsDiv = document.createElement("div"),
  stylesheetShroud = document.createElement("div"),
  runningNoticeDiv = document.createElement("div"),
  stylesheetDiv = document.createElement("div"),
  counterDiv = document.createElement("div"),
  stylesheetHelperBtn = document.createElement("button"),
  stylesheetSubmitBtn = document.createElement("button"),
  stylesheetAbortBtn = document.createElement("button"),
  stylesheetCloseBtn = document.createElement("button"),
  skipFontBtn = document.createElement("button"),
  base64Btn = document.createElement("button"),
  stylesheetTextElement = document.createElement("textarea"),
  stylesheetTextElementLabel = document.createElement("label"),
  logoImg = document.createElement("img"),
  noticeSpan = document.createElement("span"),
  logoBlueURL = "https://i.ibb.co/JR9sbFN/fontastic-logo-blue.png",
  fontasticButtons = [
    skipFontBtn,
    stylesheetAbortBtn,
    stylesheetCloseBtn,
    stylesheetHelperBtn,
    stylesheetSubmitBtn,
    base64Btn,
  ],
  fontasticErrors = [stackError, weightError, sourceError, base64Error];

/* ERROR STYLES */
for (var error of fontasticErrors) {
  error.style.color = errorTextColor;
  error.style.fontSize = errorTextFontSize;
  error.style.fontStyle = "italic";
  error.style.textAlign = "right";
  error.style.margin = "0";
}

weightError.className = "weight_error_text";
stackError.className = "stack_error_text";
sourceError.className = "source_error_text";
base64Error.className = "base64_error_text";
base64Error.style.width = "98%";
base64Error.style.marginTop = "10px";

/* BUTTON STYLES */
for (var button of fontasticButtons) {
  button.style.color = white;
  button.style.fontWeight = "bold";
  button.style.fontSize = buttonFontSize;
  button.style.height = buttonHeight;
  button.style.margin = "10px auto";
  button.style.padding = "0 20px";
  button.style.border = "none";
  button.style.outlineOffset = "2px";
  button.style.opacity = "1";
}

stylesheetSubmitBtn.className = "fontastic_stylesheet_submit_button";
stylesheetSubmitBtn.innerText = "Let's give it a go!";
stylesheetSubmitBtn.style.backgroundColor = white;
stylesheetSubmitBtn.style.color = wkndDarkBlue;
stylesheetSubmitBtn.style.outlineColor = wkndGreen;

stylesheetCloseBtn.className = "close_stylesheet";
stylesheetCloseBtn.innerText = "Close";
stylesheetCloseBtn.style.backgroundColor = white;
stylesheetCloseBtn.style.color = wkndLightBlue;
stylesheetCloseBtn.style.outlineColor = wkndRed;

stylesheetHelperBtn.className = "stylesheet_helper_button";
stylesheetHelperBtn.innerText = "Let's try a whole stylesheet!";
stylesheetHelperBtn.style.backgroundColor = wkndLightBlue;

base64Btn.className = "fontastic_b64_button";
base64Btn.innerText = "Get base64";
base64Btn.style.backgroundColor = wkndGreen;
base64Btn.style.padding = "0 15px";

stylesheetAbortBtn.className = "stylesheet_abort_button";
stylesheetAbortBtn.innerText = "Clear stylesheet";
stylesheetAbortBtn.style.backgroundColor = wkndBrown;
stylesheetAbortBtn.style.margin = "10px 5px";
stylesheetAbortBtn.onclick = function () {
  stopIteration();
  jQuery(".bx-modal_close").click();
};

skipFontBtn.className = "fontastic_skip_font";
skipFontBtn.innerText = "Skip Font";
skipFontBtn.style.backgroundColor = wkndRed;
skipFontBtn.style.margin = "10px 5px";
skipFontBtn.onclick = function () {
  console.log("Skip font activated");
  skipFont();
};

counterDiv.className = "fontastic_counter_container";
counterText.className = "fontastic_counter_text";
counterText.style.marginTop = "-25px";
counterText.style.marginBottom = "10px";
counterText.style.fontSize = "16px";
counterText.style.fontWeight = "bold";
counterText.style.color = wkndGreen;

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

runningNoticeDiv.className = "fontastic_logo_container";
runningNoticeDiv.style.backgroundColor = black;
runningNoticeDiv.style.color = white;
runningNoticeDiv.style.position = "absolute";
runningNoticeDiv.style.zIndex = "999999999";
runningNoticeDiv.style.right = "0";
runningNoticeDiv.style.bottom = "0";
runningNoticeDiv.style.display = "flex";
runningNoticeDiv.style.alignItems = "center";
runningNoticeDiv.style.padding = "3px 8px";
runningNoticeDiv.style.cursor = "pointer";
runningNoticeDiv.style.borderRadius = "5px 0 0 0";

logoImg.src = fontasticLogoWhite;
logoImg.className = "fontastic_logo";
logoImg.style.width = "75px";
logoImg.style.padding = "2px";

noticeSpan.innerText = "is active. To disable, please refresh this page.";
noticeSpan.style.fontWeight = "600";
noticeSpan.style.fontSize = "10px";

function fontastic() {
  var $fontModal = jQuery(".bx-modal_container .mint-theme.ember-view"),
    $fontModalContainer = jQuery(".bx-modal_container"),
    $fontFaceTextField = $fontModal.find(
      ".font-input.ember-text-area:not('.input-wrap_input')"
    ),
    updatedURL = "";

  if ($fontModalContainer.length) {
    $fontModalContainer.css("max-height", "99%");
    $fontModalContainer.css("padding-bottom", "10px");

    if (!jQuery(".fontastic_b64_button").length) {
      $fontModal
        .find("div.slat:not(.slat__taller):has('textarea:last()') label")
        .append(base64Btn);
      base64Btn.disabled = true;
      base64Btn.style.opacity = ".5";
    }
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
      if (currentStep > 0) {
        $fontFaceTextField.trigger("input");
      }
    } else {
      counterText.innerText = "Stylesheet not active";
      counterText.style.color = wkndDarkBlue;
    }
  }

  if (!jQuery(".stylesheet_helper_button").length) {
    if (stylesheetIterationActive) {
      $fontModalContainer.children("[id*='ember']").append("<br>");
      $fontModalContainer.children("[id*='ember']").append(stylesheetAbortBtn);
    } else {
      $fontModalContainer.children("[id*='ember']").append("<br>");
      $fontModalContainer.children("[id*='ember']").append(stylesheetHelperBtn);
    }
  }

  /* On font submit */
  jQuery(".create-btn.flat-btn.flat-btn__primary").on("click", function () {
    if (currentStep + 1 < lastStep) {
      for (var font of fontList) {
        var currentFont = fontList[currentStep];
        if (font.family === currentFont.family && !font.stack) {
          font.stack = currentFont.stack;
        }
      }
      stylesheetIterationActive = true;
      currentStep++;
      $(".bare-btn.bare-btn__text").text(
        `Next font (${currentStep + 1} of ${lastStep})`
      );
    } else {
      if (stylesheetIterationActive) {
        showFinale(itWorked);
      }
      stopIteration();
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
    } of ${lastStep}`;
    counterText.style.color = wkndGreen;
    stylesheetTextElement.value = "";
    jQuery(".close_stylesheet").click();
    $fontFaceTextField.val(fontList[currentStep].declaration);
    $fontFaceTextField.trigger("input");
    if (jQuery(".stylesheet_helper_button").length) {
      jQuery(".stylesheet_helper_button").remove();
      stylesheetButtonsDiv.append(stylesheetAbortBtn, skipFontBtn);
      $fontModalContainer
        .children("[id*='ember']")
        .append(stylesheetButtonsDiv);
    }
  };

  stylesheetCloseBtn.onclick = function () {
    jQuery(".fontastic_shroud").remove();
    jQuery(".stylesheet_helper_container").remove();
  };

  $fontFaceTextField.on("input", function () {
    sourceError.innerText = "";
    weightError.innerHTML = "";
    stackError.innerText = "";
    base64Error.innerText = "";

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
        } else if ($(this).children("label").text() == "Weight") {
          if (!jQuery(".weight_error_text").length) {
            $(this).append(weightError);
          }
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
          base64Btn.onclick = function () {
            base64Converter(sourceInput.val());
          };
          base64Btn.disabled = false;
          base64Btn.style.opacity = "1";
          $(this)
            .children("input")
            .on("input", function (e) {
              var format;
              base64Error.innerText = "";
              if (!!e.target.value.match(urlRegex)) {
                sourceError.innerText = "";
                updatedURL = e.target.value;
                font.updatedURL = e.target.value;
                currentSource = e.target.value;
                base64Btn.disabled = false;
                base64Btn.style.opacity = "1";
              } else {
                sourceError.innerText = "Please enter a valid URL.";
                base64Btn.disabled = false;
                base64Btn.style.opacity = ".5";
              }
              font.declaration.includes("woff2")
                ? (format = "woff2")
                : font.declaration.includes("woff")
                ? (format = "woff")
                : font.declaration.includes("ttf") ||
                  font.declaration.includes("truetype")
                ? (format = "ttf")
                : font.declaration.includes("otf")
                ? (format = "otf")
                : font.declaration.includes("eot") ||
                  font.declaration.includes("embedded-opentype")
                ? (format = "eot")
                : (format = "unknown");

              prefix = `data:application/x-font-${format};base64,`;
              if (!urlRegex.exec(sourceInput.val())) {
                sourceError.innerText = "Please enter a valid URL";
                base64Btn.disabled = true;
                base64Btn.style.opacity = ".5";
              } else {
                sourceError.innerText = "";
                base64Btn.disabled = false;
                base64Btn.style.opacity = "1";
              }
            });
        } else if (
          $(this).children("label").text() == "Font" ||
          $(this).children("label").text() == "FontGet base64"
        ) {
          if (!jQuery(".base64_error_text").length) {
            $(this).append(base64Error);
          }
          if (!jQuery(".fontastic_b64_button").length) {
            $(this).children("label").append(base64Btn);
          }
        }
      }
    });
  });

  $fontFaceTextField.trigger("input");

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
    showFinale();
  };
  if (!jQuery(".fontastic_logo_container").length) {
    runningNoticeDiv.append(logoImg);
    runningNoticeDiv.append(noticeSpan);
    jQuery("body").append(runningNoticeDiv);
  }
}
fontastic();
jQuery(".bare-btn.bare-btn__text").on("click", function () {
  setTimeout(fontastic, 100);
});

/* WORK ON "SKIP FONT" BUTTON IN CASE YOU FIND A FONT YOU DON'T NEED IN THE MIDDLE OF A STYLESHEET - completed 3/11/22 */
/* FOR FONTS WITH PARTIAL URLS, PULL IN URL PREFIX TO IDENTICAL FAMILY NAMES */
/* WHAT IF DECLARATION IS MISSING CLOSING SEMICOLON? ADD FIX TO extractFont() PLEASE - fixed 3/11/22 */
