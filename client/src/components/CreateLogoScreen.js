import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { LogoDefaults, LogoElementDefaults } from './GoLogoLoConstants';
import LogoWorkspace from './LogoWorkspace';
import { Logo } from '../classes/Logo';
import { LogoElement } from '../classes/LogoElement';

const ADD_LOGO = gql`
    mutation addLogo(
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
        addLogo(
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
            margin: $margin
        ){
            _id 
        }
    }
`;

class CreateLogoScreen extends Component {

    constructor(){
        super();

        // INITIALIZES THE STATE WITH DEFAULT LOGO VALUES
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
            logo: defaultLogo,
            addText: "",
            editText: "",
            editColor: LogoElementDefaults.LogoText.COLOR,
            editFontSize: LogoElementDefaults.LogoText.FONT_SIZE,
            addURL: "",
            editURL: "",
            focusedElement: null,
        }
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
            logo: newLogo,
            addText: "",
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement
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
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: "",
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement
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
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: "",
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement
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
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement
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
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement
        })
    }

    handleChangeFocusedElement = (elementIndex) => {
        if (this.state.logo.elements[elementIndex].elementType === LogoElementDefaults.LogoText.TYPE){
            this.setState({
                logo: this.state.logo,
                addText: this.state.addText,
                editText: this.state.logo.elements[elementIndex].text,
                editColor: this.state.logo.elements[elementIndex].color,
                editFontSize: this.state.logo.elements[elementIndex].fontSize,
                addURL: this.state.addURL,
                editURL: this.state.editURL,
                focusedElement: elementIndex
            })
        }
        else{
            this.setState({
                logo: this.state.logo,
                addText: this.state.addText,
                editText: this.state.editText,
                editColor: this.state.editColor,
                editFontSize: this.state.editFontSize,
                addURL: this.state.addURL,
                editURL: this.state.logo.elements[elementIndex].url,
                focusedElement: elementIndex
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
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement+1
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
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement-1
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
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: null
        })
    }

    handleChangeAddText = (event) => {
        this.setState({
            logo: this.state.logo,
            addText: event.target.value,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement
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
            logo: newLogo,
            addText: this.state.addText,
            editText: event.target.value,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement
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
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: event.target.value,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement
        });
    }

    handleChangeEditFontSize = (event) => {
        let newElements = this.state.logo.elements.slice();
        newElements[this.state.focusedElement].fontSize = event.target.value;
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
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: event.target.value,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement
        });
    }

    handleChangeAddURL = (event) => {
        this.setState({
            logo: this.state.logo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: event.target.value,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement
        });
    }

    handleChangeEditURL = (event) => {
        this.setState({
            logo: this.state.logo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: event.target.value,
            focusedElement: this.state.focusedElement
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
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement
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
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement
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
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement
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
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement
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
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement
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
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement
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
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement
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
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement
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
            logo: newLogo,
            addText: this.state.addText,
            editText: this.state.editText,
            editColor: this.state.editColor,
            editFontSize: this.state.editFontSize,
            addURL: this.state.addURL,
            editURL: this.state.editURL,
            focusedElement: this.state.focusedElement
        });
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

        // BUTTON CONDITIONS
        
        let buttonDisabled = false;
        let buttonClass = "btn btn-success";
        if (this.state.logo.name.trim() === ""){
            buttonDisabled = true;
            buttonClass += " disabled";
        }
        let addTextButtonDisabled = false;
        let addTextButtonClass = "btn btn-secondary";
        if (this.state.addText.trim() === ""){
            addTextButtonDisabled = true;
            addTextButtonClass += " disabled";
        }
        let addImageButtonDisabled = false;
        let addImageButtonClass = "btn btn-secondary";
        if (this.state.addURL.trim() === ""){
            addImageButtonDisabled = true;
            addImageButtonClass += " disabled";
        }
        let upButtonDisabled = false;
        let upButtonClass = "btn btn-secondary";
        let downButtonDisabled = false;
        let downButtonClass = "btn btn-secondary";
        let deleteElementButtonDisabled = false;
        let deleteElementButtonClass = "btn btn-danger";
        if (this.state.focusedElement == null){
            upButtonDisabled = true;
            upButtonClass += " disabled";
            downButtonDisabled = true;
            downButtonClass += " disabled";
            deleteElementButtonDisabled = true;
            deleteElementButtonClass += " disabled";
        }
        else{
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
            <Mutation mutation={ADD_LOGO} onCompleted={data => this.props.history.push("/" + this.props.match.params.username + "/view/" + data.addLogo._id)}> 
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="row">
                                <div className="panel-body" style={{marginRight:"10pt", width:"15vw"}}>
                                    <div style={{marginBottom:"8pt", border:"solid", padding:"3pt", borderRadius:"2%", backgroundColor:"#e3dc84"}}>
                                        <h2 style={{textAlign:"center"}}>Create Logo</h2>
                                    </div>
                                    <form onSubmit={e => {
                                        e.preventDefault();
                                        addLogo({ variables: {
                                            user: this.props.match.params.username, 
                                            name: this.state.logo.name, 
                                            length: this.state.logo.length, 
                                            width: this.state.logo.width,
                                            elements: this.state.logo.elements,
                                            backgroundColor: this.state.logo.backgroundColor, 
                                            borderColor: this.state.logo.borderColor,
                                            borderRadius: this.state.logo.borderRadius, 
                                            borderThickness: this.state.logo.borderThickness, 
                                            padding: this.state.logo.padding, 
                                            margin: this.state.logo.margin } });

                                        name.value = LogoDefaults.NAME;
                                        length.value = LogoDefaults.LENGTH.toString();
                                        width.value = LogoDefaults.WIDTH.toString();
                                        backgroundColor.value = LogoDefaults.BACKGROUND_COLOR;
                                        borderColor.value = LogoDefaults.BORDER_COLOR;
                                        borderRadius.value = LogoDefaults.BORDER_RADIUS.toString();
                                        borderThickness.value = LogoDefaults.BORDER_THICKNESS.toString();
                                        padding.value = LogoDefaults.PADDING.toString();
                                        margin.value = LogoDefaults.MARGIN.toString();
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
                                            <button type="submit" disabled={buttonDisabled} className={buttonClass} style={{marginRight:"3pt"}}>Submit</button>
                                            <button type="button" className="btn btn-danger" onClick={() => this.props.history.push("/"+this.props.match.params.username)}>Cancel</button>
                                            <div style={{overflowWrap:"break-word"}}>
                                                <label htmlFor="buttonError" style={{marginLeft:"3pt"}}>{buttonDisabled ? "Error: Empty Logo Name" : ""}</label>
                                            </div>
                                        </div>
                                    </form>
                                    {loading && <p>Loading...</p>}
                                    {error && <p>Error :( Please try again</p>}
                                </div>
                                <LogoWorkspace
                                    logo={this.state.logo}
                                    position="absolute"
                                    canEdit={true}
                                    changePosition={this.handleChangeElementPosition}
                                    changeFocusedElement={this.handleChangeFocusedElement}
                                    changeImageSize={this.handleChangeImageSize}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;