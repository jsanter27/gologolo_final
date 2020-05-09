import React, { Component } from 'react';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_LOGOS = gql`
    query getUserLogos($logoUser: String){
        getUserLogos(user: $logoUser){
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

class HomeScreen extends Component {

    render() {
        return (
            <Query fetchPolicy={"network-only"} pollInterval={250} query={GET_LOGOS} variables={{ logoUser: this.props.match.params.username}}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    return (
                        <div className="container row">
                            <div className="col s4" style={{textAlign:"right"}}>
                                <h3>Recent Work</h3>
                                {/*Sort the Logos by Last Update Here*/}
                                {data.getUserLogos.sort((a, b) => b.lastUpdate > a.lastUpdate).map((logo, index) => (
                                    <div key={index} className='home_logo_link'
                                        style={{ cursor: "pointer" }}>
                                        <button className="btn btn-secondary" style={{marginBottom:"8pt"}} onClick={() => this.props.history.push(this.props.match.params.username + "/view/" + logo._id)}>{logo.name}</button>
                                    </div>
                                ))}
                            </div>
                            <div className="col s8">
                                <div id="home_banner_container">
                                    goLogoLo
                                </div>
                                <div style={{textAlign:"center", marginTop:"12pt"}}>
                                    <button className="btn btn-success" onClick={() => this.props.history.push("/" + this.props.match.params.username + "/create")}>Add Logo</button>
                                </div>
                            </div>
                        </div>
                    );
                }
                }
            </Query >
        );
    }
}

export default HomeScreen;
