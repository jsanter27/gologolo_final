import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { LogoDefaults } from './GoLogoLoConstants';
import LogoWorkspace from './LogoWorkspace';
import { Logo } from '../classes/Logo';

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
            logo: defaultLogo
        }
    }

    // EVENT HANDLERS

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
        )
        this.setState({
            logo: newLogo
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
            logo: newLogo
        });
    }

    handleChangeWidth = (event) => {
        /* let value = event.target.value;
        if (value.trim() === ""){
            value = 0;
        }
        else{
            value = parseInt(event.target.value);
        } */
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
            logo: newLogo
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
            logo: newLogo
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
            logo: newLogo
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
            logo: newLogo
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
            logo: newLogo
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
            logo: newLogo
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
            logo: newLogo
        });
    }

    render() {
        let name, length, width, backgroundColor, borderColor, borderRadius, borderThickness, padding, margin;

        // IF TEXT IS EMPTY, DISABLE BUTTON
        
        let buttonDisabled = false;
        if (this.state.logo.name.trim() === "" || this.state.logo.length < LogoDefaults.LENGTH_MIN || this.state.logo.width < LogoDefaults.WIDTH_MIN){
            buttonDisabled = true;
        }
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={data => this.props.history.push("/" + this.props.match.params.username + "/view/" + data.addLogo._id)}> 
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="row">
                                <div className="panel-body" style={{marginRight:"10pt"}}>
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
                                        <div className="form-group">
                                            <label htmlFor="name">Name:</label>
                                            <input type="text" className="form-control" name="name" ref={node => {
                                                name = node;
                                            }} placeholder="Name" value={this.state.logo.name} onChange={this.handleChangeName} />
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
                                        <div className="row" style={{maxWidth:"15vw"}}>
                                            <button type="submit" disabled={buttonDisabled} className="btn btn-success" style={{marginBottom:"12pt"}}>Submit</button>
                                            <div style={{overflowWrap:"break-word"}}>
                                                <label htmlFor="buttonError" style={{marginLeft:"3pt"}}>{buttonDisabled ? "Error: Invalid Values" : ""}</label>
                                            </div>
                                        </div>
                                    </form>
                                    {loading && <p>Loading...</p>}
                                    {error && <p>Error :( Please try again</p>}
                                </div>
                                <LogoWorkspace
                                    logo={this.state.logo}
                                    position="absolute"
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