import React, { Component } from 'react';
import { LogoElementDefaults } from './GoLogoLoConstants';
import { Rnd } from 'react-rnd';

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
                position: this.props.position,
                width: this.props.logo.width.toString() + "px",
                maxWidth: "70vw",
                height: this.props.logo.length.toString() + "px",
                maxHeight: "48vw",
                overflow: "hidden",
                whiteSpace: "pre-wrap",
                zIndex: "0"
            }
        }
        return (
            <div className="col s8" style={{margin:this.props.logo.margin.toString() + "pt"}}>
                <div className="row">
                    <h2>{this.props.logo.name}</h2>
                </div>
                <div className="row">
                    <div ref="canvas" style={ styles.container }>
                        {this.props.logo.elements.map( (element, index) => 
                        (element.elementType === LogoElementDefaults.LogoText.TYPE ?
                        (
                            <Rnd disableDragging={!this.props.canEdit} enableResizing={{
                                bottom:false,
                                bottomLeft:false,
                                bottomRight:false,
                                left:false,
                                right:false,
                                top:false,
                                topLeft:false,
                                topRight:false}} 
                            position={{x:element.offsetLeft, y:element.offsetTop}} 
                            style={{zIndex:(index+1).toString()}} 
                            onDragStart={() => this.props.changeFocusedElement(index)} 
                            onDragStop={(event, data) => this.props.changePosition(index, data.x, data.y)}
                            key={index}>
                                <div style={{ fontSize:element.fontSize.toString()+"px", 
                                color:element.color, whiteSpace:"pre-wrap" }} onClick={() => this.props.changeFocusedElement(index)}>
                                    {element.text}
                                </div>
                            </Rnd>
                        )
                        :
                        (
                            <Rnd disableDragging={!this.props.canEdit} enableResizing={{
                                bottom:this.props.canEdit,
                                bottomLeft:this.props.canEdit,
                                bottomRight:this.props.canEdit,
                                left:this.props.canEdit,
                                right:this.props.canEdit,
                                top:this.props.canEdit,
                                topLeft:this.props.canEdit,
                                topRight:this.props.canEdit}}  
                            position={{x:element.offsetLeft, y:element.offsetTop}} 
                            style={{zIndex:(index+1).toString()}} 
                            onDragStart={() => this.props.changeFocusedElement(index)} 
                            onDragStop={(event, data) => this.props.changePosition(index, data.x, data.y)} 
                            onResizeStart={() => this.props.changeFocusedElement(index)}
                            onResize={(event, direction, ref, delta, position) => this.props.changeImageSize(index, ref.offsetWidth, ref.offsetHeight)}
                            key={index}>
                                <img alt="" src={element.url} height={element.length.toString()+"px"} 
                                width={element.width.toString()+"px"} onClick={() => this.props.changeFocusedElement(index)} />
                            </Rnd>
                        )
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default LogoWorkspace