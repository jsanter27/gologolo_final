import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class LoginScreen extends Component{

    constructor(){
        super();

        this.state = {
            username: ""
        }
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    goToHomeScreen = () => {
        if (this.state.username.trim() === ""){
            return;
        }
        this.props.history.push("/" + this.state.username);
    }

    render(){
        let buttonDisabled = false;
        let buttonClass = "btn btn-success";
        if (this.state.username.trim()===""){
            buttonDisabled=true;
            buttonClass += " disabled";
        }
        return(
            <div className="container">
                <div className="container row">
                    <div className="col s8">
                        <div id="home_banner_container" style={{left: "50%", marginRight: "50%"}}>
                            goLogoLo
                        </div>
                    </div>
                </div>
                <div className="container row">
                    <div className="panel-body">
                        <form onSubmit={this.goToHomeScreen}>
                            <div className="form-group">
                                <input type="text" className="form-control" name="username" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange}/>
                            </div>
                            <div className="row">
                                <button type="submit" disabled={buttonDisabled} className={buttonClass}>Log In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginScreen;