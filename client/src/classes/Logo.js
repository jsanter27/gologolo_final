import { LogoDefaults } from '../components/GoLogoLoConstants';
import { LogoElement } from './LogoElement';

class Logo {
    constructor(){
        this.name = LogoDefaults.TEXT_VALUE;
        this.length = LogoDefaults.LENGTH;
        this.width = LogoDefaults.WIDTH;
        this.elements = [LogoElement];
        this.backgroundColor = LogoDefaults.BACKGROUND_COLOR;
        this.borderColor = LogoDefaults.BORDER_COLOR;
        this.borderRadius = LogoDefaults.BORDER_RADIUS;
        this.borderThickness = LogoDefaults.BORDER_THICKNESS;
        this.padding = LogoDefaults.PADDING;
        this.margin = LogoDefaults.MARGIN;
    }

    addElementToBottom(element){
        if (!element){
            return;
        }
        this.elements.unshift(element);
        return;
    }

    addElementToTop(element){
        if (!element){
            return;
        }
        this.elements.push(element);
        return;
    }

    moveElementToBottom(element){
        if (!element){
            return;
        }
        let desiredElement = null;
        for (i = 0; i < this.elements.length; i++){
            if (this.elements[i] == element){
                desiredElement = this.elements.splice(i, 1)[0];
                this.addElementToBottom(desiredElement);
                break;
            }
        }
        return;
    }

    moveElementToTop(element){
        if (!element){
            return;
        }
        let desiredElement = null;
        for (i = 0; i < this.elements.length; i++){
            if (this.elements[i] == element){
                desiredElement = this.elements.splice(i, 1)[0];
                this.addElementToTop(desiredElement);
                break;
            }
        }
        return;
    }

    removeElement(element){
        if (!element){
            return;
        }

        this.elements = this.elements.filter((e) => e != element);
    }
}

export default Logo;