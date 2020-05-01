import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { LogoDefaults } from './GoLogoLoConstants';
import TextEditWorkspace from './TextEditWorkspace';

const ADD_LOGO = gql`
    mutation addLogo(
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderThickness: Int!,
        $padding: Int!,
        $margin: Int!) {
        addLogo(
            text: $text,
            color: $color,
            fontSize: $fontSize,
            backgroundColor: $backgroundColor,
            borderColor: $borderColor,
            borderRadius: $borderRadius,
            borderThickness: $borderThickness,
            padding: $padding,
            margin: $margin) {
            _id
        }
    }
`;

class CreateLogoScreen extends Component {

    constructor(){
        super();

        // INITIALIZES THE STATE WITH DEFAULT LOGO VALUES
        this.state = {
            text : LogoDefaults.TEXT_VALUE,
            color : LogoDefaults.TEXT_COLOR,
            fontSize : LogoDefaults.FONT_SIZE,
            backgroundColor : LogoDefaults.BACKGROUND_COLOR,
            borderColor : LogoDefaults.BORDER_COLOR,
            borderRadius : LogoDefaults.BORDER_RADIUS,
            borderThickness : LogoDefaults.BORDER_THICKNESS,
            padding : LogoDefaults.PADDING,
            margin : LogoDefaults.MARGIN
        }
    }

    // EVENT HANDLERS

    handleChangeText = (event) => {
        this.setState({
            text : event.target.value,
            color : this.state.color,
            fontSize : this.state.fontSize,
            backgroundColor : this.state.backgroundColor,
            borderColor : this.state.borderColor,
            borderRadius : this.state.borderRadius,
            borderThickness : this.state.borderThickness,
            padding : this.state.padding,
            margin : this.state.margin
        });
    }

    handleChangeColor = (event) => {
        this.setState({
            text : this.state.text,
            color : event.target.value,
            fontSize : this.state.fontSize,
            backgroundColor : this.state.backgroundColor,
            borderColor : this.state.borderColor,
            borderRadius : this.state.borderRadius,
            borderThickness : this.state.borderThickness,
            padding : this.state.padding,
            margin : this.state.margin
        });
    }

    handleChangeFontSize = (event) => {
        this.setState({
            text : this.state.text,
            color : this.state.color,
            fontSize : event.target.value,
            backgroundColor : this.state.backgroundColor,
            borderColor : this.state.borderColor,
            borderRadius : this.state.borderRadius,
            borderThickness : this.state.borderThickness,
            padding : this.state.padding,
            margin : this.state.margin
        });
    }

    handleChangeBackgroundColor = (event) => {
        this.setState({
            text : this.state.text,
            color : this.state.color,
            fontSize : this.state.fontSize,
            backgroundColor : event.target.value,
            borderColor : this.state.borderColor,
            borderRadius : this.state.borderRadius,
            borderThickness : this.state.borderThickness,
            padding : this.state.padding,
            margin : this.state.margin
        });
    }

    handleChangeBorderColor = (event) => {
        this.setState({
            text : this.state.text,
            color : this.state.color,
            fontSize : this.state.fontSize,
            backgroundColor : this.state.backgroundColor,
            borderColor : event.target.value,
            borderRadius : this.state.borderRadius,
            borderThickness : this.state.borderThickness,
            padding : this.state.padding,
            margin : this.state.margin
        });
    }

    handleChangeBorderRadius = (event) => {
        this.setState({
            text : this.state.text,
            color : this.state.color,
            fontSize : this.state.fontSize,
            backgroundColor : this.state.backgroundColor,
            borderColor : this.state.borderColor,
            borderRadius : event.target.value,
            borderThickness : this.state.borderThickness,
            padding : this.state.padding,
            margin : this.state.margin
        });
    }

    handleChangeBorderThickness = (event) => {
        this.setState({
            text : this.state.text,
            color : this.state.color,
            fontSize : this.state.fontSize,
            backgroundColor : this.state.backgroundColor,
            borderColor : this.state.borderColor,
            borderRadius : this.state.borderRadius,
            borderThickness : event.target.value,
            padding : this.state.padding,
            margin : this.state.margin
        });
    }

    handleChangePadding = (event) => {
        this.setState({
            text : this.state.text,
            color : this.state.color,
            fontSize : this.state.fontSize,
            backgroundColor : this.state.backgroundColor,
            borderColor : this.state.borderColor,
            borderRadius : this.state.borderRadius,
            borderThickness : this.state.borderThickness,
            padding : event.target.value,
            margin : this.state.margin
        });
    }

    handleChangeMargin = (event) => {
        this.setState({
            text : this.state.text,
            color : this.state.color,
            fontSize : this.state.fontSize,
            backgroundColor : this.state.backgroundColor,
            borderColor : this.state.borderColor,
            borderRadius : this.state.borderRadius,
            borderThickness : this.state.borderThickness,
            padding : this.state.padding,
            margin : event.target.value
        });
    }

    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderThickness, padding, margin;

        // IF TEXT IS EMPTY, DISABLE BUTTON
        let buttonDisabled = false;
        if (this.state.text.trim() === ""){
            console.log("button disabled");
            buttonDisabled = true;
        }
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={data => this.props.history.push('/view/' + data.addLogo._id)}> 
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="row">
                                <div className="panel-body" style={{marginTop:"36pt"}}>
                                    <form onSubmit={e => {
                                        e.preventDefault();
                                        addLogo({ variables: { 
                                            text: text.value, color: color.value, 
                                            fontSize: parseInt(fontSize.value), backgroundColor: backgroundColor.value, 
                                            borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value), 
                                            borderThickness: parseInt(borderThickness.value), padding: parseInt(padding.value), 
                                            margin: parseInt(margin.value) } });

                                        text.value = LogoDefaults.TEXT_VALUE;
                                        color.value = LogoDefaults.TEXT_COLOR;
                                        fontSize.value = LogoDefaults.FONT_SIZE;
                                        backgroundColor.value = LogoDefaults.BACKGROUND_COLOR;
                                        borderColor.value = LogoDefaults.BORDER_COLOR;
                                        borderRadius.value = LogoDefaults.BORDER_RADIUS;
                                        borderThickness.value = LogoDefaults.BORDER_THICKNESS;
                                        padding.value = LogoDefaults.PADDING;
                                        margin.value = LogoDefaults.MARGIN;
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
                                        <div className="row" style={{maxWidth:"15vw"}}>
                                            <button type="submit" disabled={buttonDisabled} className="btn btn-success" style={{marginBottom:"12pt"}}>Submit</button>
                                            <div style={{overflowWrap:"break-word"}}>
                                                <label htmlFor="buttonError" style={{marginLeft:"3pt"}}>{buttonDisabled ? "Error: Logo Text Empty" : ""}</label>
                                            </div>
                                        </div>
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
                                    sectionTitle="Create Logo"
                                    history={this.props.history}
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