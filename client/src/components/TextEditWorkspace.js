import React, { Component } from 'react';
import { GoLogoLoStyles } from './GoLogoLoConstants';

// THIS IS HOW WE DISPLAY THE LOGO, IN THIS COMPONENT
class TextEditWorkspace extends Component {
    render() {
        const styles = {
            container: {
                color: this.props.color,
                fontSize: this.props.fontSize + "pt",
                backgroundColor: this.props.backgroundColor,
                borderStyle: "solid",
                borderColor: this.props.borderColor,
                borderRadius: this.props.borderRadius + "pt",
                borderWidth: this.props.borderThickness + "pt",
                padding: this.props.padding + "pt",
                margin: this.props.margin + "pt",
                position: "fixed",
                maxWidth: "70vw",
                maxHeight: "40vw",
                overflow: "auto",
                whiteSpace: "pre-wrap"
            }
        }
        return (
            <div className="col s8">
                <div className="panel-heading">
                    <div className="row" style={GoLogoLoStyles.heading}>
                        <h3 className="panel-title" style={GoLogoLoStyles.sectionTitle}>
                            {this.props.sectionTitle}
                        </h3>
                        <h4 style={GoLogoLoStyles.homeLink}><button className="btn btn-secondary" onClick={() => this.props.history.push("/")}>Home</button></h4>
                    </div>
                </div>
                <div style={ styles.container }>
                    {this.props.text}
                </div>
            </div>
        )
    }
}

export default TextEditWorkspace