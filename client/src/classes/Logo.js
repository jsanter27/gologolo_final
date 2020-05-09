
export class Logo {
    constructor(name, length, width, elements, backgroundColor, borderColor, borderRadius, borderThickness, padding, margin){
        this.name = name;
        this.length = length;
        this.width = width;
        this.elements = elements;
        this.backgroundColor = backgroundColor;
        this.borderColor = borderColor;
        this.borderRadius = borderRadius;
        this.borderThickness = borderThickness;
        this.padding = padding;
        this.margin = margin;
    }

    /*
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
    */
}