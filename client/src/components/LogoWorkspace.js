import React, { Component } from 'react';
import { LogoElementDefaults } from './GoLogoLoConstants';

// THIS IS HOW WE DISPLAY THE LOGO, IN THIS COMPONENT
class LogoWorkspace extends Component {
    
    componentDidMount(){
        /*
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");

        this.props.logo.elements.forEach( (element, index) => {
            if (element.elementType === LogoElementDefaults.LogoText.TYPE){
                console.log(element);
                ctx.font = element.fontSize.toString() + "px Robaaaoto";
                ctx.fillStyle = element.color;
                ctx.fillText(element.text, element.offsetLeft, element.offsetTop);
                ctx.fill();
            } 
        })
        */
    }

    render() {
        const styles = {
            container: {
                backgroundColor: this.props.logo.backgroundColor,
                borderStyle: "solid",
                borderColor: this.props.logo.borderColor,
                borderRadius: this.props.logo.borderRadius.toString() + "pt",
                borderWidth: this.props.logo.borderThickness.toString() + "pt",
                padding: this.props.logo.padding.toString() + "pt",
                margin: this.props.logo.margin.toString() + "pt",
                position: this.props.position,
                width: this.props.logo.width.toString() + "px",
                maxWidth: "70vw",
                height: this.props.logo.length.toString() + "px",
                maxHeight: "48vw",
                overflow: "auto",
                whiteSpace: "pre-wrap",
                zIndex: "0"
            }
        }
        return (
            <div className="col s8">
                <div ref="canvas" style={ styles.container }>
                    {this.props.logo.elements.map( (element, index) => 
                    (element.elementType == LogoElementDefaults.LogoText.TYPE ?
                    (
                        <div key={index} style={{ position:"absolute", left:element.offsetLeft.toString()+"px", 
                        top:element.offsetTop.toString()+"px", fontSize:element.fontSize.toString()+"px", 
                        color:element.color, zIndex:(index+1).toString() }}>
                            {element.text}
                        </div>
                    )
                    :
                    (
                        <img key={index} src={element.url} height={element.length.toString()+"px"} 
                        width={element.width.toString()+"px"} style={{ position:"absolute", left:element.offsetLeft.toString()+"px", 
                        top:element.offsetTop.toString()+"px", zIndex:(index+1).toString() }} />
                    )
                    ))}
                </div>
            </div>
        )
    }
}

export default LogoWorkspace