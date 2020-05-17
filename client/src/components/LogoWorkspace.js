import React, { Component } from 'react';
import { LogoElementDefaults } from './GoLogoLoConstants';
import { Rnd } from 'react-rnd';
import * as html2canvas from 'html2canvas';

// THIS IS HOW WE DISPLAY THE LOGO, IN THIS COMPONENT
class LogoWorkspace extends Component {

    exportLogo = () => {
        const logo = this.logoDiv;
        html2canvas(logo).then((canvas) => {
            const imgURL = canvas.toDataURL("image/png");
            window.open(imgURL);
        });
    }

    render() {
        const styles = {
            container: {
                backgroundColor: this.props.logo.backgroundColor,
                borderStyle: "solid",
                borderColor: this.props.logo.borderColor,
                borderRadius: this.props.logo.borderRadius.toString() + "pt",
                borderWidth: this.props.logo.borderThickness.toString() + "pt",
                padding: "0pt",
                position: this.props.position,
                top: "35pt",
                width: this.props.logo.width.toString() + "px",
                maxWidth: "70vw",
                height: this.props.logo.length.toString() + "px",
                maxHeight: "48vw",
                overflow: "hidden",
                whiteSpace: "pre-wrap",
                zIndex: "0"
            }
        }
        let displayExport = "";
        if (this.props.canExport){
            displayExport = "initial";
        }
        else {
            displayExport = "none";
        }
        return (
            <div className="col s8" style={{margin:this.props.logo.margin.toString() + "pt"}}>
                <div className="row">
                    <h2>{this.props.logo.name}</h2>
                    <button type="button" className="btn btn-warning" style={{marginTop:"3pt", position:"absolute", 
                    left:(this.props.logo.width-150).toString() + "px" , display:displayExport}} onClick={this.exportLogo}>Export</button>
                    <button type="button" className="btn btn-secondary" style={{marginTop:"3pt", position:"absolute", 
                    left:(this.props.logo.width-75).toString() + "px"}} onClick={() => this.props.history.push("/")}>Home</button>
                </div>
                <div className="row">
                    <div ref={ref => this.logoDiv = ref} style={ styles.container }>
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
                                color:element.color, whiteSpace:"pre-wrap" }} onClick={() => this.props.canEdit ? this.props.changeFocusedElement(index) : {}}>
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
                                width={element.width.toString()+"px"} onClick={() => this.props.canEdit ? this.props.changeFocusedElement(index) : {}} />
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