import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import LogoWorkspace from './LogoWorkspace';
import { LogoDefaults } from './GoLogoLoConstants';
import { Logo } from '../classes/Logo';

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

    constructor(){
        super();

        // STATE IS ORIGINALLY UNINITIALIZED
        this.state = {initialized: false};
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
        );
        this.setState({
            id : this.state.id,
            user : this.state.user,
            logo : newLogo,
            initialized : this.state.initialized
        });
    }

    handleChangeLength = (event) => {
        let newLogo = new Logo(
            this.state.logo.name,
            event.target.value,
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
            logo : newLogo,
            initialized : this.state.initialized
        });
    }

    handleChangeWidth = (event) => {
        let newLogo = new Logo(
            this.state.logo.name,
            this.state.logo.length,
            event.target.value,
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
            logo : newLogo,
            initialized : this.state.initialized
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
        );
        this.setState({
            id : this.state.id,
            user : this.state.user,
            logo : newLogo,
            initialized : this.state.initialized
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
        );
        this.setState({
            id : this.state.id,
            user : this.state.user,
            logo : newLogo,
            initialized : this.state.initialized
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
            event.target.value,
            this.state.logo.borderThickness,
            this.state.logo.padding,
            this.state.logo.margin
        );
        this.setState({
            id : this.state.id,
            user : this.state.user,
            logo : newLogo,
            initialized : this.state.initialized
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
            event.target.value,
            this.state.logo.padding,
            this.state.logo.margin
        );
        this.setState({
            id : this.state.id,
            user : this.state.user,
            logo : newLogo,
            initialized : this.state.initialized
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
            event.target.value,
            this.state.logo.margin
        );
        this.setState({
            id : this.state.id,
            user : this.state.user,
            logo : newLogo,
            initialized : this.state.initialized
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
            event.target.value
        );
        this.setState({
            id : this.state.id,
            user : this.state.user,
            logo : newLogo,
            initialized : this.state.initialized
        });
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
                            id : data.getLogoByID._id,
                            user : data.getLogoByID.user,
                            logo : newLogo,
                            initialized : true
                        })
                    }

                    // IF TEXT IS EMPTY, PREVENT SUBMIT
                    let buttonDisabled = false;
                    if (this.state.initialized && this.state.logo.name.trim() === ""){
                        buttonDisabled = true;
                    }

                    return (
                        <Mutation mutation={UPDATE_LOGO} key={this.state.id} onCompleted={() => this.props.history.push(this.props.match.params.username+"/view/"+this.state.id)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
                                    <div className="panel panel-default">
                                        <div className="row">
                                            <div className="panel-body" style={{marginTop:"36pt"}}>                                            
                                                <form onSubmit={e => {
                                                    e.preventDefault();
                                                    updateLogo({ variables: { id: this.state.id, user: this.state.user, name: name.value, length: parseInt(length.value), width: parseInt(width.value),
                                                        elements: this.state.logo.elements, backgroundColor: backgroundColor.value, borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value),
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
                                                    <label htmlFor="buttonError" style={{marginLeft:"3pt", marginBottom:"12pt", maxWidth:"12vw", overflowWrap:"break-word"}}>{buttonDisabled ? "Error: Logo Text Empty" : ""}</label>
                                                </form>
                                                {loading && <p>Loading...</p>}
                                                {error && <p>Error :( Please try again</p>}
                                            </div>
                                            {/*Display the Logo in this component */}
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
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;