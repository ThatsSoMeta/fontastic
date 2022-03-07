
let testFontFace = `@font-face {
    font-family: 'Inter_Book';
    font-style: normal;
    font-weight: normal;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/inter/v3/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2JL7W0Q5n-wU.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  
  @font-face {
    font-family: 'LatoRegular';
    font-style: normal;
    font-weight: normal;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/lato/v20/S6uyw4BMUTPHjx4wXiWtFCc.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }`;

let weirdExampleFonts = `
  @font-face {
    font-family: "NimbusSanNovReg";
    src: url("../fonts/nimbus_sans_novus.eot?#iefix") format("embedded-opentype"), url("../fonts/nimbus_sans_novus.woff") format("woff"), url("../fonts/nimbus_sans_novus.ttf") format("truetype"), url("../fonts/nimbus_sans_novus.svg#NimbusSansNovus-Regular") format("svg");
    font-style: normal;
    font-weight: normal;
    }

  @font-face {
      font-family: "futwora_extra_light";
      src: url("FutworaProWDW-Regular.eot");
      /* IE9 Compat Modes - THIS IS FROM HELLOSEEN.COM */
      src: url("https://cdn.shopify.com/s/files/1/0016/5144/1717/t/119/assets/FutworaProWDW-Regular.woff2") format("woff2"),
      url("FutworaProWDW-Regular.woff") format("woff");
      font-weight: normal;
      font-style: normal;
      font-display: auto;
      font-display: swap;
    }
    
    @font-face {
        font-family: "futwora_extra_heavy";
        src: url("FutworaProWDW-Regular.eot");
        /* IE9 Compat Modes - THIS IS FROM HELLOSEEN.COM */
        src: url("https://cdn.shopify.com/s/files/1/0016/5144/1717/t/119/assets/FutworaProWDW-Regular.woff2") format("woff2"),
        url("FutworaProWDW-Regular.woff") format("woff");
        font-weight: normal;
        font-style: normal;
        font-display: auto;
        font-display: swap;
    }
    
    @font-face {
        font-family: "futwora_pro_extrabold";
        src: url("FutworaProWDW-Regular.eot");
        /* IE9 Compat Modes - THIS IS FROM HELLOSEEN.COM */
        src: url("https://cdn.shopify.com/s/files/1/0016/5144/1717/t/119/assets/FutworaProWDW-Regular.woff2") format("woff2"),
        url("FutworaProWDW-Regular.woff") format("woff");
        font-weight: normal;
        font-style: normal;
        font-display: auto;
        font-display: swap;
    }
    
    @font-face {
        font-family: "futwora_extra_bold";
        src: url("FutworaProWDW-Regular.eot");
        /* IE9 Compat Modes - THIS IS FROM HELLOSEEN.COM */
        src: url("https://cdn.shopify.com/s/files/1/0016/5144/1717/t/119/assets/FutworaProWDW-Regular.woff2") format("woff2"),
        url("FutworaProWDW-Regular.woff") format("woff");
        font-weight: normal;
        font-style: normal;
        font-display: auto;
        font-display: swap;
    }
    `;
var singleFont = `@font-face {
        font-family: "futwora_extra-bold";
        src: url("FutworaProWDW-Regular.eot");
        /* IE9 Compat Modes - THIS IS FROM HELLOSEEN.COM */
        src: url("https://cdn.shopify.com/s/files/1/0016/5144/1717/t/119/assets/FutworaProWDW-Regular.woff2") format("woff2"),
        url("FutworaProWDW-Regular.woff") format("woff");
        font-weight: normal;
        font-style: normal;
        font-display: auto;
        font-display: swap;
      }`;

var proFlowers = `@font-face {
        font-family: NIB Light Italic;
        src: url("https://www.proflowers.com/merx/fonts/nib-light-italic-pro.ttf");
      }
      
      @font-face {
        font-family: Oldschool Grotesk Light;
        src: url("https://www.proflowers.com/merx/fonts/OldschoolGrotesk_W-Light.woff/tfberrTESTINGURL.html");
      }
      
      @font-face {
        font-family: Oldschool Grotesk Medium;
        src: url("https://www.proflowers.com/merx/fonts/OldschoolGrotesk_W-Medium.woff");
      }`;

var withLanguageTags = `
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
    /* latin */
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
    /* latin */
    @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLCz7Z1xlFd2JQEk.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

`;

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


module.exports = {'language': withLanguageTags}