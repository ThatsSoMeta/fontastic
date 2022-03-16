
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

var houseOfNoa = `

@font-face {
  font-family:"filson-soft";
  src:url("https://use.typekit.net/af/5fe107/00000000000000003b9ade62/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("woff2"),url("https://use.typekit.net/af/5fe107/00000000000000003b9ade62/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("woff"),url("https://use.typekit.net/af/5fe107/00000000000000003b9ade62/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("opentype");
  font-display:auto;font-style:normal;font-weight:500;font-stretch:normal;
  }
  
  @font-face {
  font-family:"filson-soft";
  src:url("https://use.typekit.net/af/277d7a/00000000000000003b9ade63/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("woff2"),url("https://use.typekit.net/af/277d7a/00000000000000003b9ade63/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("woff"),url("https://use.typekit.net/af/277d7a/00000000000000003b9ade63/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("opentype");
  font-display:auto;font-style:normal;font-weight:400;font-stretch:normal;
  }
  
`

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

var oatsOvernight = `
@font-face {
  font-family: "sui-generis";
  src: url("https://use.typekit.net/af/4c997e/000000000000000077359629/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3")
      format("woff2"),
    url("https://use.typekit.net/af/4c997e/000000000000000077359629/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3")
      format("woff"),
    url("https://use.typekit.net/af/4c997e/000000000000000077359629/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3")
      format("opentype");
  font-display: auto;
  font-style: normal;
  font-weight: 400;
  font-stretch: normal;
}

@font-face {
  font-family: "sui-generis";
  src: url("https://use.typekit.net/af/da5775/00000000000000007735962a/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3")
      format("woff2"),
    url("https://use.typekit.net/af/da5775/00000000000000007735962a/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3")
      format("woff"),
    url("https://use.typekit.net/af/da5775/00000000000000007735962a/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3")
      format("opentype");
  font-display: auto;
  font-style: italic;
  font-weight: 400;
  font-stretch: normal;
}

@font-face {
  font-family: "sui-generis";
  src: url("https://use.typekit.net/af/a2456e/00000000000000007735962b/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3")
      format("woff2"),
    url("https://use.typekit.net/af/a2456e/00000000000000007735962b/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3")
      format("woff"),
    url("https://use.typekit.net/af/a2456e/00000000000000007735962b/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3")
      format("opentype");
  font-display: auto;
  font-style: normal;
  font-weight: 700;
  font-stretch: normal;
}

@font-face {
  font-family: "sui-generis";
  src: url("https://use.typekit.net/af/0afbfd/00000000000000007735962c/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i7&v=3")
      format("woff2"),
    url("https://use.typekit.net/af/0afbfd/00000000000000007735962c/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i7&v=3")
      format("woff"),
    url("https://use.typekit.net/af/0afbfd/00000000000000007735962c/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i7&v=3")
      format("opentype");
  font-display: auto;
  font-style: italic;
  font-weight: 700;
  font-stretch: normal;
}

@font-face {
  font-family: "brandon-grotesque";
  src: url("https://use.typekit.net/af/1da05b/0000000000000000000132df/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3")
      format("woff2"),
    url("https://use.typekit.net/af/1da05b/0000000000000000000132df/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3")
      format("woff"),
    url("https://use.typekit.net/af/1da05b/0000000000000000000132df/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3")
      format("opentype");
  font-display: auto;
  font-style: normal;
  font-weight: 400;
  font-stretch: normal;
}

@font-face {
  font-family: "brandon-grotesque";
  src: url("https://use.typekit.net/af/32d3ee/0000000000000000000132e0/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3")
      format("woff2"),
    url("https://use.typekit.net/af/32d3ee/0000000000000000000132e0/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3")
      format("woff"),
    url("https://use.typekit.net/af/32d3ee/0000000000000000000132e0/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3")
      format("opentype");
  font-display: auto;
  font-style: italic;
  font-weight: 400;
  font-stretch: normal;
}

@font-face {
  font-family: "brandon-grotesque";
  src: url("https://use.typekit.net/af/8f4e31/0000000000000000000132e3/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3")
      format("woff2"),
    url("https://use.typekit.net/af/8f4e31/0000000000000000000132e3/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3")
      format("woff"),
    url("https://use.typekit.net/af/8f4e31/0000000000000000000132e3/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3")
      format("opentype");
  font-display: auto;
  font-style: normal;
  font-weight: 700;
  font-stretch: normal;
}

@font-face {
  font-family: "brandon-grotesque";
  src: url("https://use.typekit.net/af/383ab4/0000000000000000000132e4/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i7&v=3")
      format("woff2"),
    url("https://use.typekit.net/af/383ab4/0000000000000000000132e4/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i7&v=3")
      format("woff"),
    url("https://use.typekit.net/af/383ab4/0000000000000000000132e4/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i7&v=3")
      format("opentype");
  font-display: auto;
  font-style: italic;
  font-weight: 700;
  font-stretch: normal;
}

@font-face {
  font-family: "futura-pt";
  src: url("https://use.typekit.net/af/309dfe/000000000000000000010091/27/l?subset_id=2&fvd=n7&v=3")
      format("woff2"),
    url("https://use.typekit.net/af/309dfe/000000000000000000010091/27/d?subset_id=2&fvd=n7&v=3")
      format("woff"),
    url("https://use.typekit.net/af/309dfe/000000000000000000010091/27/a?subset_id=2&fvd=n7&v=3")
      format("opentype");
  font-display: auto;
  font-style: normal;
  font-weight: 700;
  font-stretch: normal;
}

@font-face {
  font-family: "futura-pt";
  src: url("https://use.typekit.net/af/eb729a/000000000000000000010092/27/l?subset_id=2&fvd=i7&v=3")
      format("woff2"),
    url("https://use.typekit.net/af/eb729a/000000000000000000010092/27/d?subset_id=2&fvd=i7&v=3")
      format("woff"),
    url("https://use.typekit.net/af/eb729a/000000000000000000010092/27/a?subset_id=2&fvd=i7&v=3")
      format("opentype");
  font-display: auto;
  font-style: italic;
  font-weight: 700;
  font-stretch: normal;
}

@font-face {
  font-family: "futura-pt";
  src: url("https://use.typekit.net/af/9b05f3/000000000000000000013365/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3")
      format("woff2"),
    url("https://use.typekit.net/af/9b05f3/000000000000000000013365/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3")
      format("woff"),
    url("https://use.typekit.net/af/9b05f3/000000000000000000013365/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3")
      format("opentype");
  font-display: auto;
  font-style: normal;
  font-weight: 400;
  font-stretch: normal;
}

@font-face {
  font-family: "futura-pt";
  src: url("https://use.typekit.net/af/cf3e4e/000000000000000000010095/27/l?subset_id=2&fvd=i4&v=3")
      format("woff2"),
    url("https://use.typekit.net/af/cf3e4e/000000000000000000010095/27/d?subset_id=2&fvd=i4&v=3")
      format("woff"),
    url("https://use.typekit.net/af/cf3e4e/000000000000000000010095/27/a?subset_id=2&fvd=i4&v=3")
      format("opentype");
  font-display: auto;
  font-style: italic;
  font-weight: 400;
  font-stretch: normal;
}

@font-face {
  font-family: "futura-pt-condensed";
  src: url("https://use.typekit.net/af/6f8764/000000000000000000012039/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3")
      format("woff2"),
    url("https://use.typekit.net/af/6f8764/000000000000000000012039/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3")
      format("woff"),
    url("https://use.typekit.net/af/6f8764/000000000000000000012039/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3")
      format("opentype");
  font-display: auto;
  font-style: normal;
  font-weight: 400;
  font-stretch: normal;
}

@font-face {
  font-family: "futura-pt-condensed";
  src: url("https://use.typekit.net/af/082b7c/00000000000000000001203a/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3")
      format("woff2"),
    url("https://use.typekit.net/af/082b7c/00000000000000000001203a/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3")
      format("woff"),
    url("https://use.typekit.net/af/082b7c/00000000000000000001203a/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3")
      format("opentype");
  font-display: auto;
  font-style: italic;
  font-weight: 400;
  font-stretch: normal;
}

@font-face {
  font-family: "futura-pt-condensed";
  src: url("https://use.typekit.net/af/64e0cf/00000000000000000001203d/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3")
      format("woff2"),
    url("https://use.typekit.net/af/64e0cf/00000000000000000001203d/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3")
      format("woff"),
    url("https://use.typekit.net/af/64e0cf/00000000000000000001203d/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3")
      format("opentype");
  font-display: auto;
  font-style: normal;
  font-weight: 700;
  font-stretch: normal;
}

@font-face {
  font-family: "futura-pt-condensed";
  src: url("https://use.typekit.net/af/e6a9c1/00000000000000000001203e/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i7&v=3")
      format("woff2"),
    url("https://use.typekit.net/af/e6a9c1/00000000000000000001203e/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i7&v=3")
      format("woff"),
    url("https://use.typekit.net/af/e6a9c1/00000000000000000001203e/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i7&v=3")
      format("opentype");
  font-display: auto;
  font-style: italic;
  font-weight: 700;
  font-stretch: normal;
}

@font-face {
  font-family: "oswald";
  src: url("https://use.typekit.net/af/d81a8f/00000000000000007735a0e3/30/l?subset_id=2&fvd=n4&v=3")
      format("woff2"),
    url("https://use.typekit.net/af/d81a8f/00000000000000007735a0e3/30/d?subset_id=2&fvd=n4&v=3")
      format("woff"),
    url("https://use.typekit.net/af/d81a8f/00000000000000007735a0e3/30/a?subset_id=2&fvd=n4&v=3")
      format("opentype");
  font-display: auto;
  font-style: normal;
  font-weight: 400;
  font-stretch: normal;
}

@font-face {
  font-family: "oswald";
  src: url("https://use.typekit.net/af/b22996/00000000000000007735a0e8/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3")
      format("woff2"),
    url("https://use.typekit.net/af/b22996/00000000000000007735a0e8/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3")
      format("woff"),
    url("https://use.typekit.net/af/b22996/00000000000000007735a0e8/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3")
      format("opentype");
  font-display: auto;
  font-style: normal;
  font-weight: 300;
  font-stretch: normal;
}

@font-face {
  font-family: "oswald";
  src: url("https://use.typekit.net/af/c3ea41/00000000000000007735a0f1/30/l?subset_id=2&fvd=n2&v=3")
      format("woff2"),
    url("https://use.typekit.net/af/c3ea41/00000000000000007735a0f1/30/d?subset_id=2&fvd=n2&v=3")
      format("woff"),
    url("https://use.typekit.net/af/c3ea41/00000000000000007735a0f1/30/a?subset_id=2&fvd=n2&v=3")
      format("opentype");
  font-display: auto;
  font-style: normal;
  font-weight: 200;
  font-stretch: normal;
}

@font-face {
  font-family: "montserrat";
  src: url("https://use.typekit.net/af/32b0e4/00000000000000007735a185/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3")
      format("woff2"),
    url("https://use.typekit.net/af/32b0e4/00000000000000007735a185/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3")
      format("woff"),
    url("https://use.typekit.net/af/32b0e4/00000000000000007735a185/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3")
      format("opentype");
  font-display: auto;
  font-style: normal;
  font-weight: 400;
  font-stretch: normal;
}

@font-face {
  font-family: "source-sans-pro";
  src: url("https://use.typekit.net/af/61f808/00000000000000003b9b3d63/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3")
      format("woff2"),
    url("https://use.typekit.net/af/61f808/00000000000000003b9b3d63/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3")
      format("woff"),
    url("https://use.typekit.net/af/61f808/00000000000000003b9b3d63/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3")
      format("opentype");
  font-display: auto;
  font-style: normal;
  font-weight: 400;
  font-stretch: normal;
}

@font-face {
  font-family: "source-sans-pro";
  src: url("https://use.typekit.net/af/422d60/00000000000000003b9b3d67/27/l?subset_id=2&fvd=n7&v=3")
      format("woff2"),
    url("https://use.typekit.net/af/422d60/00000000000000003b9b3d67/27/d?subset_id=2&fvd=n7&v=3")
      format("woff"),
    url("https://use.typekit.net/af/422d60/00000000000000003b9b3d67/27/a?subset_id=2&fvd=n7&v=3")
      format("opentype");
  font-display: auto;
  font-style: normal;
  font-weight: 700;
  font-stretch: normal;
}

@font-face {
  font-family: "sofia-pro";
  src: url("https://use.typekit.net/af/5e6988/00000000000000007735a163/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3")
      format("woff2"),
    url("https://use.typekit.net/af/5e6988/00000000000000007735a163/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3")
      format("woff"),
    url("https://use.typekit.net/af/5e6988/00000000000000007735a163/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3")
      format("opentype");
  font-display: auto;
  font-style: normal;
  font-weight: 400;
  font-stretch: normal;
}

@font-face {
  font-family: "industry";
  src: url("https://use.typekit.net/af/b5c0af/00000000000000007735a652/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n6&v=3")
      format("woff2"),
    url("https://use.typekit.net/af/b5c0af/00000000000000007735a652/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n6&v=3")
      format("woff"),
    url("https://use.typekit.net/af/b5c0af/00000000000000007735a652/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n6&v=3")
      format("opentype");
  font-display: auto;
  font-style: normal;
  font-weight: 600;
  font-stretch: normal;
}

@font-face {
  font-family: "futura-pt-bold";
  src: url("https://use.typekit.net/af/053fc9/00000000000000003b9af1e4/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3")
      format("woff2"),
    url("https://use.typekit.net/af/053fc9/00000000000000003b9af1e4/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3")
      format("woff"),
    url("https://use.typekit.net/af/053fc9/00000000000000003b9af1e4/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3")
      format("opentype");
  font-display: auto;
  font-style: normal;
  font-weight: 700;
  font-stretch: normal;
}

@font-face {
  font-family: "futura-pt-bold";
  src: url("https://use.typekit.net/af/72575c/00000000000000003b9af1e5/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i7&v=3")
      format("woff2"),
    url("https://use.typekit.net/af/72575c/00000000000000003b9af1e5/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i7&v=3")
      format("woff"),
    url("https://use.typekit.net/af/72575c/00000000000000003b9af1e5/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i7&v=3")
      format("opentype");
  font-display: auto;
  font-style: italic;
  font-weight: 700;
  font-stretch: normal;
}
`;

var bloomingdalesExamples = `@font-face {
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
}`
module.exports = {'language': withLanguageTags}