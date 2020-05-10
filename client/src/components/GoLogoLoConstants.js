// CONSTANTS FOR THE DEFAULT LOGO VALUES AND THEIR RESPECTIVE MIN/MAXs
export const LogoDefaults = {
    NAME: "goLogoLo Logo",
    
    LENGTH: 400,
    LENGTH_MIN: 200,
    LENGTH_MAX: 720,
    WIDTH: 800,
    WIDTH_MIN: 200,
    WIDTH_MAX: 1080,

    BACKGROUND_COLOR: "#FFFFFF",

    BORDER_COLOR: "#000000",

    BORDER_RADIUS: 12,
    BORDER_RADIUS_MIN: 0,
    BORDER_RADIUS_MAX: 24,

    BORDER_THICKNESS: 12,
    BORDER_THICKNESS_MIN: 0,
    BORDER_THICKNESS_MAX: 48,

    PADDING: 12,
    PADDING_MIN: 0,
    PADDING_MAX: 100,

    MARGIN: 0,
    MARGIN_MIN: 0,
    MARGIN_MAX: 100
}

// CONSTANTS FOR LOGOELEMENTS
export const LogoElementDefaults = {
    OFFSET_LEFT: 0,
    OFFSET_TOP: 0,
    LogoText: {
        TYPE: "Text",
        TEXT: "goLogoLo",
        COLOR: "#FF0000",
        FONT_SIZE: 24,
        FONT_SIZE_MIN: 4,
        FONT_SIZE_MAX: 100
    },
    LogoImage: {
        TYPE: "Image",
        URL: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1920px-SNice.svg.png",
        LENGTH: 1200,
        WIDTH: 1200
    }
}

// USED FOR STYLING SOME COMPONENTS
export const GoLogoLoStyles = {
    homeLink : {
        textAlign : "right",
    },

    sectionTitle : {
        margin: "0 auto"
    },

    heading : {
        textAlign : "center",
        marginTop : "10pt"
    }
}