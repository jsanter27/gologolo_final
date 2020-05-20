import React, { Component } from 'react';
import '../App.css';
import authService from '../services/authService';
import { AuthContext } from '../context/AuthContext';

class RegisterScreen extends Component{

    constructor(){
        super();

        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            message: null,
        }
    }

    static contextType = AuthContext;

    componentDidMount(){
        if (this.context.isAuthenticated){
            this.props.history.push("/");
        }
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            message: this.state.message
        });
    }

    handlePasswordChange = (event) => {
        this.setState({
            username: this.state.username,
            password: event.target.value,
            confirmPassword: this.state.confirmPassword,
            message: this.state.message
        });
    }

    handleConfirmPasswordChange = (event) => {
        this.setState({
            username: this.state.username,
            password: this.state.password,
            confirmPassword: event.target.value,
            message: this.state.message
        });
    }

    setMessage = (message) => {
        this.setState({
            username: this.state.username,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            message: message
        });
    }

    attemptRegister = (event) => {
        event.preventDefault();
        authService.register({username:this.state.username, password:this.state.password}).then(data => {
            if(!data.message.msgError){
                this.setMessage(data.message.msgBody);
                authService.login({username:this.state.username, password:this.state.password}).then(data => {
                    if (data.isAuthenticated){
                        this.context.setAuth(data.user, data.isAuthenticated);
                        this.props.history.push("/");
                    }
                });
            }
            else {
                this.setMessage(data.message.msgBody);
            }
        });
    }

    render(){
        let buttonDisabled = false;
        let buttonClass = "btn btn-success";
        if (this.state.username.trim()=== "" || this.state.password.trim() === "" || this.state.password.trim().length < 4 || this.state.password !== this.state.confirmPassword){
            buttonDisabled=true;
            buttonClass += " disabled";
        }
        return(
            <div className="container">
                <div style={{position:"absolute", left:((window.screen.width/2)-180).toString()+"px", marginTop:"20pt"}}>
                    <div className="container row">
                        <div className="col s8">
                            <div id="home_banner_container" style={{display:"inline-block", paddingLeft:"11pt", paddingRight:"10pt"}}>
                                goLogoLo
                            </div>
                        </div>
                    </div>
                    <div className="container row" style={{position:"absolute", left:"20%", maxWidth:"65%" , marginTop:"10pt"}}>
                        <div className="panel-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="username">Email:</label>
                                    <input type="email" className="form-control" name="username" placeholder="Email" value={this.state.username} onChange={this.handleUsernameChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input type="password" className="form-control" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password:</label>
                                    <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange}/>
                                </div>
                                <div className="row" style={{position:"absolute", left:"34pt", marginTop:"10pt"}}>
                                    <button type="button" disabled={buttonDisabled} className={buttonClass} onClick={this.attemptRegister} style={{marginLeft:"3pt"}}>Register</button>
                                    <button type="button" className="btn btn-secondary" onClick={() => this.props.history.push("/login")} style={{marginLeft:"3pt"}}>Back</button>
                                </div>
                            </form>
                            <div style={{position:"absolute", top:"175%", left:"12pt"}}>
                                {this.state.message ? this.state.message : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterScreen;