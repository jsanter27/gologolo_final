import React, { Component } from 'react';
import '../App.css';
import { AuthContext } from '../context/AuthContext';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_USER = gql`
    query getUserByToken($resetPasswordToken: String!) {
        getUserByToken(resetPasswordToken: $resetPasswordToken){
            _id
            username
            password
            resetPasswordToken
            resetPasswordExpires
        }
    }
`;

const CHANGE_PASSWORD = gql`
    mutation changeUserPassword(
        $id: String!,
        $password: String!
    )
    {
        changeUserPassword(
            id: $id,
            password: $password,
        ) 
        {
            _id
        }
    }
`;


class ResetPasswordScreen extends Component{

    constructor(){
        super();

        this.state = {
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

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value,
            confirmPassword: this.state.confirmPassword,
            message: this.state.message
        });
    }

    handleConfirmPasswordChange = (event) => {
        this.setState({
            password: this.state.password,
            confirmPassword: event.target.value,
            message: this.state.message
        });
    }

    setMessage = (message) => {
        this.setState({
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            message: message
        });
    }

    render(){
        let buttonDisabled = false;
        let buttonClass = "btn btn-success";
        if (this.state.password.trim() === "" || this.state.password.trim().length < 4 || this.state.password !== this.state.confirmPassword){
            buttonDisabled=true;
            buttonClass += " disabled";
        }
        return(
            <Query fetchPolicy={'no-cache'} query={GET_USER} variables={{ resetPasswordToken: this.props.match.params.token.toString() }}>
                {({ loading, error, data }) => {
                
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    if (!data.getUserByToken){
                        this.props.history.push("/login");
                    }
                    if (data.getUserByToken.resetPasswordExpires < Date.now()){
                        this.props.history.push("/login");
                    }
                    
                    return (
                        <div className="container">
                            <div style={{position:"absolute", left:((window.screen.width/2)-180).toString()+"px", marginTop:"20pt"}}>
                                <div className="container row">
                                    <div className="col s8">
                                        <div id="home_banner_container" style={{display:"inline-block", paddingLeft:"11pt", paddingRight:"10pt"}}>
                                            goLogoLo
                                        </div>
                                    </div>
                                </div>
                                <Mutation mutation={CHANGE_PASSWORD} key={data.getUserByToken._id} onCompleted={() => this.props.history.push('/login')}>
                                    { (changeUserPassword, { loading, error }) => (   
                                        <div className="container row" style={{position:"absolute", left:"20%", maxWidth:"65%" , marginTop:"10pt"}}>
                                            <div className="panel-body">
                                                <form onSubmit={e=>{
                                                        e.preventDefault();
                                                        changeUserPassword({ variables : {id : data.getUserByToken._id, password : this.state.password }});
                                                    }
                                                }>
                                                    <div className="form-group">
                                                        <label htmlFor="password">New Password:</label>
                                                        <input type="password" className="form-control" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="confirmPassword">Confirm New Password:</label>
                                                        <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange}/>
                                                    </div>
                                                    <div className="row" style={{position:"absolute", left:"34pt", marginTop:"10pt"}}>
                                                        <button type="submit" disabled={buttonDisabled} className={buttonClass} onClick={this.attemptRegister} style={{marginLeft:"3pt"}}>Change</button>
                                                        <button type="button" className="btn btn-secondary" onClick={() => this.props.history.push("/login")} style={{marginLeft:"3pt"}}>Back</button>
                                                    </div>
                                                </form>
                                                <div style={{position:"absolute", top:"175%", left:"12pt"}}>
                                                    {loading && <p>Loading...</p>}
                                                    {error && <p>Error :( Please try again</p>}
                                                    {this.state.message ? this.state.message : null}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Mutation>
                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default ResetPasswordScreen;