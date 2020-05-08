import { LogoElementDefaults } from '../components/GoLogoLoConstants';

class LogoElement {
    constructor(elementType){
        this.elementType = elementType;
        this.offsetLeft = LogoElementDefaults.OFFSET_LEFT;
        this.offsetTop = LogoElementDefaults.OFFSET_TOP;
        if (elementType == LogoElementDefaults.LogoText.TYPE){
            this.text = LogoElementDefaults.LogoText.TEXT;
            this.color = LogoElementDefaults.LogoText.COLOR;
            this.fontSize = LogoElementDefaults.LogoText.FONT_SIZE;
        } 
        else if (elementType == LogoElementDefaults.LogoImage.TYPE) {
            this.url = LogoElementDefaults.LogoImage.URL;
            this.length = LogoElementDefaults.LogoImage.LENGTH;
            this.width = LogoElementDefaults.LogoImage.WIDTH;
        }
        else {
            throw new Error("Invalid Logo Element Type");
        }
    }
}

export default LogoElement;