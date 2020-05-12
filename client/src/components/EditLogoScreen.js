import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import LogoWorkspace from './LogoWorkspace';
import { LogoDefaults, LogoElementDefaults } from './GoLogoLoConstants';
import { Logo } from '../classes/Logo';
import { LogoElement } from '../classes/LogoElement';

const GET_LOGO = gql`
    query logo($logoId: String) {
        getLogoByID(id: $logoId){
            _id
            user
            name
            length
            width
            elements{
                elementType
                offsetLeft
                offsetTop
                text
                color
                fontSize
                url
                length
                width
            }
            backgroundColor
            borderColor
            borderRadius
            borderThickness
            padding
            margin
            lastUpdate
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $user: String!,
        $name: String!,
        $length: Int!,
        $width: Int!,
        $elements: [logoElementInput],
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderThickness: Int!,
        $padding: Int!,
        $margin: Int!) {
            updateLogo(
                id: $id,
                user: $user,
                name: $name,
                length: $length,
                width: $width,
                elements: $elements,
                backgroundColor: $backgroundColor,
                borderColor: $borderColor,
                borderRadius: $borderRadius,
                borderThickness: $borderThickness,
                padding: $padding,
                margin: $margin) {
                    lastUpdate
                }
        }
`;

class EditLogoScreen extends Component {

    constructor(props){
        super(props);

        let defaultLogo = new Logo(
            LogoDefaults.NAME,
            LogoDefaults.LENGTH,
            LogoDefaults.WIDTH,
            [],
            LogoDefaults.BACKGROUND_COLOR,
            LogoDefaults.BORDER_COLOR,
            LogoDefaults.BORDER_RADIUS,
            LogoDefaults.BORDER_THICKNESS,
            LogoDefaults.PADDING,
            LogoDefaults.MARGIN
        );

        this.state = {
            id: this.props.match.params.id,
            user: this.props.match.params.username,
            logo: defaultLogo,
            addText: "",
            editText: "",
            editColor: LogoElementDefaults.LogoText.COLOR,
            editFontSize: LogoElementDefaults.LogoText.FONT_SIZE,
            addURL: "",
            editURL: "",
            focusedElement: null,
            initialized: false,
            oldElements: defaultLogo.elements.slice()
        };
    }

    // EVENT HANDLERS
    addText = () => {
        let logoText = LogoElement.createLogoText(this.state.logo.width/2, 
                    this.state.logo.length/2, this.state.addText, LogoElementDefaults.LogoText.COLOR,
                    LogoElementDefaults.LogoText.FONT_SIZE);

        let newElements = [logoText];
        newElements = this.state.logo.elements.concat(newElements);
        let newLogo = new Logo(
            this.state.logo.name,
            this.state.logo.length,
            this.state.logo.width,
            newElements,
            this.state.logo.backgroundColor,
            this.state.logo.borderColor,
            this.state.logo.borderRadius,
            this.state.logo.borderThickness,
            this.state.logo.padding,
            this.state.logo.margin
        );
        this.setState({
            id : this.state.id,
            user : this.state.user,
            logo: newLogo,
            addText: "",
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement,
            initialized: this.state.initialized,
            oldElements: this.state.oldElements
        });
    }

    addImage = () => {
        let logoImage = LogoElement.createLogoImage(Math.floor(this.state.logo.width/2), 
                    this.state.logo.length/2, this.state.addURL, this.state.logo.width/3,
                    this.state.logo.length/4);

        let newElements = [logoImage];
        newElements = this.state.logo.elements.concat(newElements);
        let newLogo = new Logo(
            this.state.logo.name,
            this.state.logo.length,
            this.state.logo.width,
            newElements,
            this.state.logo.backgroundColor,
            this.state.logo.borderColor,
            this.state.logo.borderRadius,
            this.state.logo.borderThickness,
            this.state.logo.padding,
            this.state.logo.margin
        )
        this.setState({
            id : this.state.id,
            user : this.state.user,
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: "",
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement,
            initialized: this.state.initialized,
            oldElements: this.state.oldElements
        })
    }

    handleEditImage = () => {
        let newElements = this.state.logo.elements.slice();
        newElements[this.state.focusedElement].url = this.state.editURL;
        let newLogo = new Logo(
            this.state.logo.name,
            this.state.logo.length,
            this.state.logo.width,
            newElements,
            this.state.logo.backgroundColor,
            this.state.logo.borderColor,
            this.state.logo.borderRadius,
            this.state.logo.borderThickness,
            this.state.logo.padding,
            this.state.logo.margin
        )
        this.setState({
            id : this.state.id,
            user : this.state.user,
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: "",
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement,
            initialized: this.state.initialized,
            oldElements: this.state.oldElements
        })
    }

    handleChangeElementPosition = (elementIndex, newX, newY) => {
        let newElements = this.state.logo.elements.slice();
        newElements[elementIndex].offsetLeft = newX;
        newElements[elementIndex].offsetTop = newY;
        let newLogo = new Logo(
            this.state.logo.name,
            this.state.logo.length,
            this.state.logo.width,
            newElements,
            this.state.logo.backgroundColor,
            this.state.logo.borderColor,
            this.state.logo.borderRadius,
            this.state.logo.borderThickness,
            this.state.logo.padding,
            this.state.logo.margin
        )
        this.setState({
            id : this.state.id,
            user : this.state.user,
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement,
            initialized: this.state.initialized,
            oldElements: this.state.oldElements
        })
    }

    handleChangeImageSize = (elementIndex, newWidth, newHeight) => {
        let newElements = this.state.logo.elements.slice();
        newElements[elementIndex].width = newWidth;
        newElements[elementIndex].length = newHeight;
        let newLogo = new Logo(
            this.state.logo.name,
            this.state.logo.length,
            this.state.logo.width,
            newElements,
            this.state.logo.backgroundColor,
            this.state.logo.borderColor,
            this.state.logo.borderRadius,
            this.state.logo.borderThickness,
            this.state.logo.padding,
            this.state.logo.margin
        )
        this.setState({
            id : this.state.id,
            user : this.state.user,
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement,
            initialized: this.state.initialized,
            oldElements: this.state.oldElements
        })
    }

    handleChangeFocusedElement = (elementIndex) => {
        if (this.state.logo.elements[elementIndex].elementType === LogoElementDefaults.LogoText.TYPE){
            this.setState({
                id : this.state.id,
                user : this.state.user,
                logo: this.state.logo,
                addText: this.state.addText,
                editText: this.state.logo.elements[elementIndex].text,
                editColor: this.state.logo.elements[elementIndex].color,
                editFontSize: this.state.logo.elements[elementIndex].fontSize,
                addURL: this.state.addURL,
                editURL: this.state.editURL,
                focusedElement: elementIndex,
                initialized: this.state.initialized,
                oldElements: this.state.oldElements
            })
        }
        else{
            this.setState({
                id : this.state.id,
                user : this.state.user,
                logo: this.state.logo,
                addText: this.state.addText,
                editText: this.state.editText,
                editColor: this.state.editColor,
                editFontSize: this.state.editFontSize,
                addURL: this.state.addURL,
                editURL: this.state.logo.elements[elementIndex].url,
                focusedElement: elementIndex,
                initialized: this.state.initialized,
                oldElements: this.state.oldElements
            })
        }
    }

    handleMoveUp = () => {
        let newElements = this.state.logo.elements.slice();
        let temp = newElements[this.state.focusedElement+1];
        newElements[this.state.focusedElement+1] = newElements[this.state.focusedElement];
        newElements[this.state.focusedElement] = temp;
        let newLogo = new Logo(
            this.state.logo.name,
            this.state.logo.length,
            this.state.logo.width,
            newElements,
            this.state.logo.backgroundColor,
            this.state.logo.borderColor,
            this.state.logo.borderRadius,
            this.state.logo.borderThickness,
            this.state.logo.padding,
            this.state.logo.margin
        )
        this.setState({
            id : this.state.id,
            user : this.state.user,
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement+1,
            initialized: this.state.initialized,
            oldElements: this.state.oldElements
        })
    }

    handleMoveDown = () => {
        let newElements = this.state.logo.elements.slice();
        let temp = newElements[this.state.focusedElement-1];
        newElements[this.state.focusedElement-1] = newElements[this.state.focusedElement];
        newElements[this.state.focusedElement] = temp;
        let newLogo = new Logo(
            this.state.logo.name,
            this.state.logo.length,
            this.state.logo.width,
            newElements,
            this.state.logo.backgroundColor,
            this.state.logo.borderColor,
            this.state.logo.borderRadius,
            this.state.logo.borderThickness,
            this.state.logo.padding,
            this.state.logo.margin
        )
        this.setState({
            id : this.state.id,
            user : this.state.user,
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement-1,
            initialized: this.state.initialized,
            oldElements: this.state.oldElements
        })
    }

    handleRemoveElement = () => {
        let newElements = this.state.logo.elements.slice();
        newElements.splice(this.state.focusedElement, 1);
        let newLogo = new Logo(
            this.state.logo.name,
            this.state.logo.length,
            this.state.logo.width,
            newElements,
            this.state.logo.backgroundColor,
            this.state.logo.borderColor,
            this.state.logo.borderRadius,
            this.state.logo.borderThickness,
            this.state.logo.padding,
            this.state.logo.margin
        )
        this.setState({
            id : this.state.id,
            user : this.state.user,
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: null,
            initialized: this.state.initialized,
            oldElements: this.state.oldElements
        })
    }

    handleChangeAddText = (event) => {
        this.setState({
            id : this.state.id,
            user : this.state.user,
            logo: this.state.logo,
            addText: event.target.value,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement,
            initialized: this.state.initialized,
            oldElements: this.state.oldElements
        });
    }

    handleChangeEditText = (event) => {
        let newElements = this.state.logo.elements.slice();
        newElements[this.state.focusedElement].text = event.target.value;
        let newLogo = new Logo(
            this.state.logo.name,
            this.state.logo.length,
            this.state.logo.width,
            newElements,
            this.state.logo.backgroundColor,
            this.state.logo.borderColor,
            this.state.logo.borderRadius,
            this.state.logo.borderThickness,
            this.state.logo.padding,
            this.state.logo.margin
        )
        this.setState({
            id : this.state.id,
            user : this.state.user,
            logo: newLogo,
            addText: this.state.addText,
            editText: event.target.value,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement,
            initialized: this.state.initialized,
            oldElements: this.state.oldElements
        });
    }

    handleChangeEditColor = (event) => {
        let newElements = this.state.logo.elements.slice();
        newElements[this.state.focusedElement].color = event.target.value;
        let newLogo = new Logo(
            this.state.logo.name,
            this.state.logo.length,
            this.state.logo.width,
            newElements,
            this.state.logo.backgroundColor,
            this.state.logo.borderColor,
            this.state.logo.borderRadius,
            this.state.logo.borderThickness,
            this.state.logo.padding,
            this.state.logo.margin
        )
        this.setState({
            id : this.state.id,
            user : this.state.user,
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: event.target.value,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement,
            initialized: this.state.initialized,
            oldElements: this.state.oldElements
        });
    }

    handleChangeEditFontSize = (event) => {
        let newElements = this.state.logo.elements.slice();
        newElements[this.state.focusedElement].fontSize = parseInt(event.target.value);
        let newLogo = new Logo(
            this.state.logo.name,
            this.state.logo.length,
            this.state.logo.width,
            newElements,
            this.state.logo.backgroundColor,
            this.state.logo.borderColor,
            this.state.logo.borderRadius,
            this.state.logo.borderThickness,
            this.state.logo.padding,
            this.state.logo.margin
        )
        this.setState({
            id : this.state.id,
            user : this.state.user,
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: event.target.value,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement,
            initialized: this.state.initialized,
            oldElements: this.state.oldElements
        });
    }

    handleChangeAddURL = (event) => {
        this.setState({
            id : this.state.id,
            user : this.state.user,
            logo: this.state.logo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: event.target.value,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement,
            initialized: this.state.initialized,
            oldElements: this.state.oldElements
        });
    }

    handleChangeEditURL = (event) => {
        this.setState({
            id : this.state.id,
            user : this.state.user,
            logo: this.state.logo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: event.target.value,
            focusedElement: this.state.focusedElement,
            initialized: this.state.initialized,
            oldElements: this.state.oldElements
        });
    }

    handleChangeName = (event) => {
        let newLogo = new Logo(
            event.target.value,
            this.state.logo.length,
            this.state.logo.width,
            this.state.logo.elements,
            this.state.logo.backgroundColor,
            this.state.logo.borderColor,
            this.state.logo.borderRadius,
            this.state.logo.borderThickness,
            this.state.logo.padding,
            this.state.logo.margin
        );
        this.setState({
            id : this.state.id,
            user : this.state.user,
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement,
            initialized: this.state.initialized,
            oldElements: this.state.oldElements
        });
    }

    handleChangeLength = (event) => {
        let newLogo = new Logo(
            this.state.logo.name,
            parseInt(event.target.value),
            this.state.logo.width,
            this.state.logo.elements,
            this.state.logo.backgroundColor,
            this.state.logo.borderColor,
            this.state.logo.borderRadius,
            this.state.logo.borderThickness,
            this.state.logo.padding,
            this.state.logo.margin
        )
        this.setState({
            id : this.state.id,
            user : this.state.user,
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement,
            initialized: this.state.initialized,
            oldElements: this.state.oldElements
        });
    }

    handleChangeWidth = (event) => {
        let newLogo = new Logo(
            this.state.logo.name,
            this.state.logo.length,
            parseInt(event.target.value),
            this.state.logo.elements,
            this.state.logo.backgroundColor,
            this.state.logo.borderColor,
            this.state.logo.borderRadius,
            this.state.logo.borderThickness,
            this.state.logo.padding,
            this.state.logo.margin
        )
        this.setState({
            id : this.state.id,
            user : this.state.user,
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement,
            initialized: this.state.initialized,
            oldElements: this.state.oldElements
        });
    }

    handleChangeBackgroundColor = (event) => {
        let newLogo = new Logo(
            this.state.logo.name,
            this.state.logo.length,
            this.state.logo.width,
            this.state.logo.elements,
            event.target.value,
            this.state.logo.borderColor,
            this.state.logo.borderRadius,
            this.state.logo.borderThickness,
            this.state.logo.padding,
            this.state.logo.margin
        )
        this.setState({
            id : this.state.id,
            user : this.state.user,
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement,
            initialized: this.state.initialized,
            oldElements: this.state.oldElements
        });
    }

    handleChangeBorderColor = (event) => {
        let newLogo = new Logo(
            this.state.logo.name,
            this.state.logo.length,
            this.state.logo.width,
            this.state.logo.elements,
            this.state.logo.backgroundColor,
            event.target.value,
            this.state.logo.borderRadius,
            this.state.logo.borderThickness,
            this.state.logo.padding,
            this.state.logo.margin
        )
        this.setState({
            id : this.state.id,
            user : this.state.user,
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement,
            initialized: this.state.initialized,
            oldElements: this.state.oldElements
        });
    }

    handleChangeBorderRadius = (event) => {
        let newLogo = new Logo(
            this.state.logo.name,
            this.state.logo.length,
            this.state.logo.width,
            this.state.logo.elements,
            this.state.logo.backgroundColor,
            this.state.logo.borderColor,
            parseInt(event.target.value),
            this.state.logo.borderThickness,
            this.state.logo.padding,
            this.state.logo.margin
        )
        this.setState({
            id : this.state.id,
            user : this.state.user,
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement,
            initialized: this.state.initialized,
            oldElements: this.state.oldElements
        });
    }

    handleChangeBorderThickness = (event) => {
        let newLogo = new Logo(
            this.state.logo.name,
            this.state.logo.length,
            this.state.logo.width,
            this.state.logo.elements,
            this.state.logo.backgroundColor,
            this.state.logo.borderColor,
            this.state.logo.borderRadius,
            parseInt(event.target.value),
            this.state.logo.padding,
            this.state.logo.margin
        )
        this.setState({
            id : this.state.id,
            user : this.state.user,
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement,
            initialized: this.state.initialized,
            oldElements: this.state.oldElements
        });
    }

    handleChangePadding = (event) => {
        let newLogo = new Logo(
            this.state.logo.name,
            this.state.logo.length,
            this.state.logo.width,
            this.state.logo.elements,
            this.state.logo.backgroundColor,
            this.state.logo.borderColor,
            this.state.logo.borderRadius,
            this.state.logo.borderThickness,
            parseInt(event.target.value),
            this.state.logo.margin
        )
        this.setState({
            id : this.state.id,
            user : this.state.user,
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement,
            initialized: this.state.initialized,
            oldElements: this.state.oldElements
        });
    }

    handleChangeMargin = (event) => {
        let newLogo = new Logo(
            this.state.logo.name,
            this.state.logo.length,
            this.state.logo.width,
            this.state.logo.elements,
            this.state.logo.backgroundColor,
            this.state.logo.borderColor,
            this.state.logo.borderRadius,
            this.state.logo.borderThickness,
            this.state.logo.padding,
            parseInt(event.target.value)
        )
        this.setState({
            id : this.state.id,
            user : this.state.user,
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement,
            initialized: this.state.initialized,
            oldElements: this.state.oldElements
        });
    }

    handleCancel = () => {
        let newLogo = new Logo(
            this.state.logo.name,
            this.state.logo.length,
            this.state.logo.width,
            this.state.oldElements,
            this.state.logo.backgroundColor,
            this.state.logo.borderColor,
            this.state.logo.borderRadius,
            this.state.logo.borderThickness,
            this.state.logo.padding,
            this.state.logo.margin
        )
        this.setState({
            id : this.state.id,
            user : this.state.user,
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement,
            initialized: this.state.initialized,
            oldElements: this.state.oldElements
        }, () => this.props.history.push("/"+this.props.match.params.username+"/view/"+this.props.match.params.id));
    }

    renderEditOptions = () => {
        if (this.state.focusedElement != null){
            let editImageButtonDisabled = false;
            let editImageButtonClass = "btn btn-secondary";
            if (this.state.editURL.trim() === ""){
                editImageButtonDisabled = true;
                editImageButtonClass += " disabled";
            }
            let {elementType} = this.state.logo.elements[this.state.focusedElement];
            if (elementType === LogoElementDefaults.LogoText.TYPE){
                return (
                    <div>
                        <div className="form-group">
                            <label htmlFor="editText">Text:</label>
                            <input type="text" className="form-control" name="editText" placeholder="Text" value={this.state.editText} onChange={this.handleChangeEditText} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="editColor">Color:</label>
                            <input type="color" className="form-control" name="editColor" placeholder="Color" value={this.state.editColor} onChange={this.handleChangeEditColor} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="editFontSize">Font Size: {this.state.editFontSize}</label>
                            <input type="range" className="form-control" name="editFontSize" placeholder="Color" value={this.state.editFontSize} onChange={this.handleChangeEditFontSize}
                            min={LogoElementDefaults.LogoText.FONT_SIZE_MIN.toString()} max={LogoElementDefaults.LogoText.FONT_SIZE_MAX.toString()}/>
                        </div>
                    </div>
                )
            }
            else if (elementType === LogoElementDefaults.LogoImage.TYPE){
                return (
                    <div>
                        <div className="form-group">
                            <label htmlFor="editURL">URL:</label>
                            <input type="text" className="form-control" name="editText" placeholder="Text" value={this.state.editURL} onChange={this.handleChangeEditText} />
                        </div>
                        <div style={{maxWidth:"15vw", textAlign:"center", marginBottom:"3pt"}}>
                            <button type="button" disabled={editImageButtonDisabled} className={editImageButtonClass} onClick={this.handleEditImage}>Update Image</button>
                        </div>
                    </div>
                )
            }
        }
    }


    render() {
        let name, length, width, backgroundColor, borderColor, borderRadius, borderThickness, padding, margin;

        return (
            /*SKIP PROPERTY ALLOWS THE LOGO TO ONLY BE QUERIED ONCE TO AVOID THE PAGE RELOADING REPEATEDLY*/
            <Query skip={this.state.initialized} fetchPolicy={'network-only'} pollInterval={250} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    // AFTER QUERYING THE DATA, INITIALIZE THE STATE WITH THE LOGO VALUES FROM THE DB
                    // USING THE STATE ALLOWS THE LOGO TO BE CHANGED LOCALLY UNTIL THE SUBMIT BUTTON IS PRESSED
                    // SUBMITTING THEN UPDATES THE LOGO IN THE DB
                    if (!this.state.initialized){
                        let newLogo = new Logo(
                            data.getLogoByID.name,
                            data.getLogoByID.length,
                            data.getLogoByID.width,
                            data.getLogoByID.elements,
                            data.getLogoByID.backgroundColor,
                            data.getLogoByID.borderColor,
                            data.getLogoByID.borderRadius,
                            data.getLogoByID.borderThickness,
                            data.getLogoByID.padding,
                            data.getLogoByID.margin
                        );
                        this.setState({
                            id: data.getLogoByID._id,
                            user: data.getLogoByID.user,
                            logo: newLogo,
                            addText: "",
                            editText: "",
                            editColor: LogoElementDefaults.LogoText.COLOR,
                            editFontSize: LogoElementDefaults.LogoText.FONT_SIZE,
                            addURL: "",
                            editURL: "",
                            focusedElement: null,
                            initialized: true,
                            oldElements: newLogo.elements.slice()
                        });
                    }
                    
                    // BUTTON CONDITIONS
                    
                    let buttonDisabled = false;
                    let buttonClass = "btn btn-success";
                    if (this.state.initialized && this.state.logo.name.trim() === ""){
                        buttonDisabled = true;
                        buttonClass += " disabled";
                    }
                    let addTextButtonDisabled = false;
                    let addTextButtonClass = "btn btn-secondary";
                    if (this.state.initialized && this.state.addText.trim() === ""){
                        addTextButtonDisabled = true;
                        addTextButtonClass += " disabled";
                    }
                    let addImageButtonDisabled = false;
                    let addImageButtonClass = "btn btn-secondary";
                    if (this.state.initialized && this.state.addURL.trim() === ""){
                        addImageButtonDisabled = true;
                        addImageButtonClass += " disabled";
                    }
                    let upButtonDisabled = false;
                    let upButtonClass = "btn btn-secondary";
                    let downButtonDisabled = false;
                    let downButtonClass = "btn btn-secondary";
                    let deleteElementButtonDisabled = false;
                    let deleteElementButtonClass = "btn btn-danger";
                    if (this.state.initialized && this.state.focusedElement == null){
                        upButtonDisabled = true;
                        upButtonClass += " disabled";
                        downButtonDisabled = true;
                        downButtonClass += " disabled";
                        deleteElementButtonDisabled = true;
                        deleteElementButtonClass += " disabled";
                    }
                    else if (this.state.initialized){
                        if (this.state.focusedElement === 0){
                            downButtonDisabled = true;
                            downButtonClass += " disabled";
                        }
                        if (this.state.focusedElement === this.state.logo.elements.length - 1){
                            upButtonDisabled = true;
                            upButtonClass += " disabled";
                        }
                    }

                    return (
                        <Mutation mutation={UPDATE_LOGO} key={this.state.id} onCompleted={() => this.props.history.push("/"+this.props.match.params.username+"/view/"+this.state.id)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
                                    <div className="panel panel-default">
                                        <div className="row">
                                            <div className="panel-body" style={{marginRight:"10pt", width:"15vw"}}>
                                                <div style={{marginBottom:"8pt", border:"solid", padding:"3pt", borderRadius:"2%", backgroundColor:"#e3dc84"}}>
                                                    <h2 style={{textAlign:"center"}}>Edit Logo</h2>
                                                </div>                                            
                                                <form onSubmit={e => {
                                                    e.preventDefault();
                                                    let inputElements = this.state.logo.elements.slice();
                                                    inputElements.forEach(e => {
                                                        delete e.__typename;
                                                    });
                                                    console.log(inputElements);
                                                    updateLogo({ variables: { id: this.state.id, user: this.state.user, name: name.value, length: parseInt(length.value), width: parseInt(width.value),
                                                        elements: inputElements, backgroundColor: backgroundColor.value, borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value),
                                                        borderThickness: parseInt(borderThickness.value), padding: parseInt(padding.value), margin: parseInt(margin.value) } });
                                                    name.value = this.state.logo.name;
                                                    length.value = this.state.logo.length;
                                                    width.value = this.state.logo.width;
                                                    backgroundColor.value = this.state.logo.backgroundColor;
                                                    borderColor.value = this.state.logo.borderColor;
                                                    borderRadius.value = this.state.logo.borderRadius;
                                                    borderThickness.value = this.state.logo.borderThickness;
                                                    padding.value = this.state.logo.padding;
                                                    margin.value = this.state.logo.margin;
                                                }}>
                                                    <div className="editbar" style={{overflowY:"scroll", maxHeight:"38vw", padding:"5pt", border:"solid", borderRadius:"5pt", backgroundColor:"#f0edc2"}}>
                                                        <div className="form-group">
                                                            <label htmlFor="name">Logo Name:</label>
                                                            <input type="text" className="form-control" name="name" ref={node => {
                                                                name = node;
                                                            }} placeholder="Name" value={this.state.logo.name} onChange={this.handleChangeName} />
                                                        </div>
                                                        <div style={{marginBottom:"10pt", border:"solid", padding:"3pt", borderRadius:"2%", backgroundColor:"#e3dc84"}}>
                                                            <h4 style={{textAlign:"center"}}>Add Text</h4>
                                                            <div className="form-group">
                                                                <label htmlFor="addText">Text:</label>
                                                                <input type="text" className="form-control" name="addText" placeholder="Text" value={this.state.addText} onChange={this.handleChangeAddText} />
                                                            </div>
                                                            <div style={{maxWidth:"15vw", textAlign:"center", marginBottom:"3pt"}}>
                                                                <button type="button" disabled={addTextButtonDisabled} className={addTextButtonClass} onClick={this.addText}>Add Text</button>
                                                            </div>
                                                        </div>
                                                        <div style={{marginBottom:"10pt", border:"solid", padding:"3pt", borderRadius:"2%", backgroundColor:"#e3dc84"}}>
                                                            <h4 style={{textAlign:"center"}}>Add Image</h4>
                                                            <div className="form-group">
                                                                <label htmlFor="addURL">Image URL:</label>
                                                                <input type="text" className="form-control" name="addURL" placeholder="URL" value={this.state.addURL} onChange={this.handleChangeAddURL} />
                                                            </div>
                                                            <div style={{maxWidth:"15vw", textAlign:"center", marginBottom:"3pt"}}>
                                                                <button type="button" disabled={addImageButtonDisabled} className={addImageButtonClass} onClick={this.addImage}>Add Image</button>
                                                            </div>
                                                        </div>
                                                        <div style={{marginBottom:"10pt", border:"solid", padding:"3pt", borderRadius:"2%", backgroundColor:"#e3dc84"}}>
                                                            <h4 style={{textAlign:"center"}}>Edit Element</h4>
                                                            <div className="form-group" style={{textAlign:"center"}}>
                                                                <h6>Selected Element: {this.state.focusedElement == null ? "None" : (this.state.logo.elements[this.state.focusedElement].elementType)}</h6>
                                                            </div>
                                                            {this.renderEditOptions()}
                                                            <div style={{maxWidth:"15vw", textAlign:"center", marginBottom:"3pt"}}>
                                                                <button type="button" disabled={upButtonDisabled} className={upButtonClass} onClick={this.handleMoveUp}>Move Up</button>
                                                            </div>
                                                            <div style={{maxWidth:"15vw", textAlign:"center", marginBottom:"3pt"}}>
                                                                <button type="button" disabled={downButtonDisabled} className={downButtonClass} onClick={this.handleMoveDown}>Move Down</button>
                                                            </div>
                                                            <div style={{maxWidth:"15vw", textAlign:"center", marginBottom:"3pt"}}>
                                                                <button type="button" disabled={deleteElementButtonDisabled} className={deleteElementButtonClass} onClick={this.handleRemoveElement}>Remove</button>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="width">Width: {this.state.logo.width}</label>
                                                            <input type="range" className="form-control" name="width" ref={node => {
                                                                width = node;
                                                            }} min={LogoDefaults.WIDTH_MIN} max={LogoDefaults.WIDTH_MAX} placeholder="Width" value={this.state.logo.width.toString()} onChange={this.handleChangeWidth} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="length">Height: {this.state.logo.length}</label>
                                                            <input type="range" className="form-control" name="length" ref={node => {
                                                                length = node;
                                                            }} min={LogoDefaults.LENGTH_MIN} max={LogoDefaults.LENGTH_MAX} placeholder="Height" value={this.state.logo.length.toString()} onChange={this.handleChangeLength} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="backgroundColor">Background Color:</label>
                                                            <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                                backgroundColor = node;
                                                            }} placeholder="Background Color" value={this.state.logo.backgroundColor} onChange={this.handleChangeBackgroundColor} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="borderColor">Border Color:</label>
                                                            <input type="color" className="form-control" name="borderColor" ref={node => {
                                                                borderColor = node;
                                                            }} placeholder="Border Color" value={this.state.logo.borderColor} onChange={this.handleChangeBorderColor} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="borderRadius">Border Radius: {this.state.logo.borderRadius}</label>
                                                            <input type="range" className="form-control" name="borderRadius" ref={node => {
                                                                borderRadius = node;
                                                            }} min={LogoDefaults.BORDER_RADIUS_MIN.toString()} max={LogoDefaults.BORDER_RADIUS_MAX.toString()} value={this.state.logo.borderRadius.toString()} onChange={this.handleChangeBorderRadius} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="borderThickness">Border Thickness: {this.state.logo.borderThickness}</label>
                                                            <input type="range" className="form-control" name="borderThickness" ref={node => {
                                                                borderThickness = node;
                                                            }} min={LogoDefaults.BORDER_THICKNESS_MIN.toString()} max={LogoDefaults.BORDER_THICKNESS_MAX.toString()} value={this.state.logo.borderThickness.toString()} onChange={this.handleChangeBorderThickness} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="padding">Padding: {this.state.logo.padding}</label>
                                                            <input type="range" className="form-control" name="padding" ref={node => {
                                                                padding = node;
                                                            }} min={LogoDefaults.PADDING_MIN.toString()} max={LogoDefaults.PADDING_MAX.toString()} value={this.state.logo.padding.toString()} onChange={this.handleChangePadding} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="margin">Margin: {this.state.logo.margin}</label>
                                                            <input type="range" className="form-control" name="margin" ref={node => {
                                                                margin = node;
                                                            }} min={LogoDefaults.MARGIN_MIN.toString()} max={LogoDefaults.MARGIN_MAX.toString()} value={this.state.logo.margin.toString()} onChange={this.handleChangeMargin} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group" style={{maxWidth:"15vw", textAlign:"center", marginTop:"5pt"}}>
                                                        <button type="submit" disabled={buttonDisabled} className={buttonClass} style={{marginRight:"3pt"}}>Save</button>
                                                        <button type="button" className="btn btn-danger" onClick={this.handleCancel}>Cancel</button>
                                                        <div style={{overflowWrap:"break-word"}}>
                                                            <label htmlFor="buttonError" style={{marginLeft:"3pt"}}>{buttonDisabled ? "Error: Empty Logo Name" : ""}</label>
                                                        </div>
                                                    </div>
                                                </form>
                                                {loading && <p>Loading...</p>}
                                                {error && <p>Error :( Please try again</p>}
                                            </div>
                                            {/*Display the Logo in this component */}
                                            <LogoWorkspace
                                                logo={this.state.logo}
                                                position="absolute"
                                                canEdit={true}
                                                canExport={false}
                                                changePosition={this.handleChangeElementPosition}
                                                changeFocusedElement={this.handleChangeFocusedElement}
                                                changeImageSize={this.handleChangeImageSize}
                                                history={this.props.history}
                                                match={this.props.match}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;