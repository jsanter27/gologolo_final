import { LogoElementDefaults } from '../components/GoLogoLoConstants';

export class LogoElement {
    constructor(elementType){
        this.elementType = elementType;
        this.offsetLeft = LogoElementDefaults.OFFSET_LEFT;
        this.offsetTop = LogoElementDefaults.OFFSET_TOP;
        if (elementType === LogoElementDefaults.LogoText.TYPE){
            this.text = LogoElementDefaults.LogoText.TEXT;
            this.color = LogoElementDefaults.LogoText.COLOR;
            this.fontSize = LogoElementDefaults.LogoText.FONT_SIZE;
        } 
        else if (elementType === LogoElementDefaults.LogoImage.TYPE) {
            this.url = LogoElementDefaults.LogoImage.URL;
            this.length = LogoElementDefaults.LogoImage.LENGTH;
            this.width = LogoElementDefaults.LogoImage.WIDTH;
        }
        else {
            throw new Error("Invalid Logo Element Type");
        }
    }

    static createLogoText(offsetLeft, offsetTop, text, color, fontSize){
        let element = new LogoElement(LogoElementDefaults.LogoText.TYPE);
        element.offsetLeft = offsetLeft;
        element.offsetTop = offsetTop;
        element.text = text;
        element.color = color;
        element.fontSize = fontSize;
        return element;
    }

    static createLogoImage(offsetLeft, offsetTop, url, length, width){
        let element = new LogoElement(LogoElementDefaults.LogoImage.TYPE);
        element.offsetLeft = offsetLeft;
        element.offsetTop = offsetTop;
        element.url = url;
        element.length = length;
        element.width = width;
        return element;
    }
}