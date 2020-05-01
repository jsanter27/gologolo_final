import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import TextEditWorkspace from './TextEditWorkspace';
import { LogoDefaults } from './GoLogoLoConstants';

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            fontSize
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
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderThickness: Int!,
        $padding: Int!,
        $margin: Int!) {
            updateLogo(
                id: $id,
                text: $text,
                color: $color,
                fontSize: $fontSize,
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

    handleChangeText = (event) => {
        this.setState({
            id : this.state.id,
            text : event.target.value,
            color : this.state.color,
            fontSize : this.state.fontSize,
            backgroundColor : this.state.backgroundColor,
            borderColor : this.state.borderColor,
            borderRadius : this.state.borderRadius,
            borderThickness : this.state.borderThickness,
            padding : this.state.padding,
            margin : this.state.margin,
            initialized : this.state.initialized
        });
    }

    handleChangeColor = (event) => {
        this.setState({
            id : this.state.id,
            text : this.state.text,
            color : event.target.value,
            fontSize : this.state.fontSize,
            backgroundColor : this.state.backgroundColor,
            borderColor : this.state.borderColor,
            borderRadius : this.state.borderRadius,
            borderThickness : this.state.borderThickness,
            padding : this.state.padding,
            margin : this.state.margin,
            initialized : this.state.initialized
        });
    }

    handleChangeFontSize = (event) => {
        this.setState({
            id : this.state.id,
            text : this.state.text,
            color : this.state.color,
            fontSize : event.target.value,
            backgroundColor : this.state.backgroundColor,
            borderColor : this.state.borderColor,
            borderRadius : this.state.borderRadius,
            borderThickness : this.state.borderThickness,
            padding : this.state.padding,
            margin : this.state.margin,
            initialized : this.state.initialized
        });
    }

    handleChangeBackgroundColor = (event) => {
        this.setState({
            id : this.state.id,
            text : this.state.text,
            color : this.state.color,
            fontSize : this.state.fontSize,
            backgroundColor : event.target.value,
            borderColor : this.state.borderColor,
            borderRadius : this.state.borderRadius,
            borderThickness : this.state.borderThickness,
            padding : this.state.padding,
            margin : this.state.margin,
            initialized : this.state.initialized
        });
    }

    handleChangeBorderColor = (event) => {
        this.setState({
            id : this.state.id,
            text : this.state.text,
            color : this.state.color,
            fontSize : this.state.fontSize,
            backgroundColor : this.state.backgroundColor,
            borderColor : event.target.value,
            borderRadius : this.state.borderRadius,
            borderThickness : this.state.borderThickness,
            padding : this.state.padding,
            margin : this.state.margin,
            initialized : this.state.initialized
        });
    }

    handleChangeBorderRadius = (event) => {
        this.setState({
            id : this.state.id,
            text : this.state.text,
            color : this.state.color,
            fontSize : this.state.fontSize,
            backgroundColor : this.state.backgroundColor,
            borderColor : this.state.borderColor,
            borderRadius : event.target.value,
            borderThickness : this.state.borderThickness,
            padding : this.state.padding,
            margin : this.state.margin,
            initialized : this.state.initialized
        });
    }

    handleChangeBorderThickness = (event) => {
        this.setState({
            id : this.state.id,
            text : this.state.text,
            color : this.state.color,
            fontSize : this.state.fontSize,
            backgroundColor : this.state.backgroundColor,
            borderColor : this.state.borderColor,
            borderRadius : this.state.borderRadius,
            borderThickness : event.target.value,
            padding : this.state.padding,
            margin : this.state.margin,
            initialized : this.state.initialized
        });
    }

    handleChangePadding = (event) => {
        this.setState({
            id : this.state.id,
            text : this.state.text,
            color : this.state.color,
            fontSize : this.state.fontSize,
            backgroundColor : this.state.backgroundColor,
            borderColor : this.state.borderColor,
            borderRadius : this.state.borderRadius,
            borderThickness : this.state.borderThickness,
            padding : event.target.value,
            margin : this.state.margin,
            initialized : this.state.initialized
        });
    }

    handleChangeMargin = (event) => {
        this.setState({
            id : this.state.id,
            text : this.state.text,
            color : this.state.color,
            fontSize : this.state.fontSize,
            backgroundColor : this.state.backgroundColor,
            borderColor : this.state.borderColor,
            borderRadius : this.state.borderRadius,
            borderThickness : this.state.borderThickness,
            padding : this.state.padding,
            margin : event.target.value,
            initialized : this.state.initialized
        });
    }

    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderThickness, padding, margin;

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
                        this.setState({
                            id : data.logo._id,
                            text : data.logo.text,
                            color : data.logo.color,
                            fontSize : data.logo.fontSize,
                            backgroundColor : data.logo.backgroundColor,
                            borderColor : data.logo.borderColor,
                            borderRadius : data.logo.borderRadius,
                            borderThickness : data.logo.borderThickness,
                            padding : data.logo.padding,
                            margin : data.logo.margin,
                            initialized : true
                        })
                    }

                    // IF TEXT IS EMPTY, PREVENT SUBMIT
                    let buttonDisabled = false;
                    if (this.state.initialized && this.state.text.trim() === ""){
                        buttonDisabled = true;
                    }

                    return (
                        <Mutation mutation={UPDATE_LOGO} key={this.state.id} onCompleted={() => this.props.history.push(`/view/`+this.state.id)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
                                    <div className="panel panel-default">
                                        <div className="row">
                                            <div className="panel-body" style={{marginTop:"36pt"}}>                                            
                                                <form onSubmit={e => {
                                                    e.preventDefault();
                                                    updateLogo({ variables: { id: this.state.id, text: text.value, color: color.value, fontSize: parseInt(fontSize.value),
                                                        backgroundColor: backgroundColor.value, borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value),
                                                        borderThickness: parseInt(borderThickness.value), padding: parseInt(padding.value), margin: parseInt(margin.value) } });
                                                    text.value = this.state.text;
                                                    color.value = this.state.color;
                                                    fontSize.value = this.state.fontSize;
                                                    backgroundColor.value = this.state.backgroundColor;
                                                    borderColor.value = this.state.borderColor;
                                                    borderRadius.value = this.state.borderRadius;
                                                    borderThickness.value = this.state.borderThickness;
                                                    padding.value = this.state.padding;
                                                    margin.value = this.state.margin;
                                                }}>
                                                    <div className="form-group">
                                                        <label htmlFor="text">Text:</label>
                                                        <input type="text" className="form-control" name="text" ref={node => {
                                                            text = node;
                                                        }} placeholder="Text" value={this.state.text} onChange={this.handleChangeText} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="color">Color:</label>
                                                        <input type="color" className="form-control" name="color" ref={node => {
                                                            color = node;
                                                        }} placeholder="Color" value={this.state.color} onChange={this.handleChangeColor} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="fontSize">Font Size:</label>
                                                        <input type="range" className="form-control" name="fontSize" ref={node => {
                                                            fontSize = node;
                                                        }} min={LogoDefaults.FONT_SIZE_MIN} max={LogoDefaults.FONT_SIZE_MAX} value={this.state.fontSize} onChange={this.handleChangeFontSize} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="backgroundColor">Background Color:</label>
                                                        <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                            backgroundColor = node;
                                                        }} placeholder="Background Color" value={this.state.backgroundColor} onChange={this.handleChangeBackgroundColor} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="borderColor">Border Color:</label>
                                                        <input type="color" className="form-control" name="borderColor" ref={node => {
                                                            borderColor = node;
                                                        }} placeholder="Border Color" value={this.state.borderColor} onChange={this.handleChangeBorderColor} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="borderRadius">Border Radius:</label>
                                                        <input type="range" className="form-control" name="borderRadius" ref={node => {
                                                            borderRadius = node;
                                                        }} min={LogoDefaults.BORDER_RADIUS_MIN} max={LogoDefaults.BORDER_RADIUS_MAX} value={this.state.borderRadius} onChange={this.handleChangeBorderRadius} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="borderThickness">Border Thickness:</label>
                                                        <input type="range" className="form-control" name="borderThickness" ref={node => {
                                                            borderThickness = node;
                                                        }} min={LogoDefaults.BORDER_THICKNESS_MIN} max={LogoDefaults.BORDER_THICKNESS_MAX} value={this.state.borderThickness} onChange={this.handleChangeBorderThickness} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="padding">Padding:</label>
                                                        <input type="range" className="form-control" name="padding" ref={node => {
                                                            padding = node;
                                                        }} min={LogoDefaults.PADDING_MIN} max={LogoDefaults.PADDING_MAX} value={this.state.padding} onChange={this.handleChangePadding} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="margin">Margin:</label>
                                                        <input type="range" className="form-control" name="margin" ref={node => {
                                                            margin = node;
                                                        }} min={LogoDefaults.MARGIN_MIN} max={LogoDefaults.MARGIN_MAX} value={this.state.margin} onChange={this.handleChangeMargin} />
                                                    </div>
                                                    <div className="row" style={{marginBottom:"3pt", textAlign:"center"}}>
                                                        <button type="submit" disabled={buttonDisabled} className="btn btn-success" style={{marginRight:"3pt", marginLeft:"12pt"}}>Submit</button>
                                                        <button className="btn btn-danger" onClick={() => this.props.history.push("/view/"+this.state.id)}>Cancel</button>
                                                    </div>
                                                    <label htmlFor="buttonError" style={{marginLeft:"3pt", marginBottom:"12pt", maxWidth:"12vw", overflowWrap:"break-word"}}>{buttonDisabled ? "Error: Logo Text Empty" : ""}</label>
                                                </form>
                                                {loading && <p>Loading...</p>}
                                                {error && <p>Error :( Please try again</p>}
                                            </div>
                                            {/*Display the Logo in this component*/}
                                            <TextEditWorkspace
                                                text={this.state.text}
                                                color={this.state.color}
                                                fontSize={this.state.fontSize}
                                                backgroundColor={this.state.backgroundColor}
                                                borderColor={this.state.borderColor}
                                                borderRadius={this.state.borderRadius}
                                                borderThickness={this.state.borderThickness}
                                                padding={this.state.padding}
                                                margin={this.state.margin}
                                                sectionTitle="Edit Logo"
                                                history={this.props.history}
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