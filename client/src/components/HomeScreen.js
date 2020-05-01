import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_LOGOS = gql`
  {
    logos {
      _id
      text
      lastUpdate
    }
  }
`;

class HomeScreen extends Component {

    render() {
        return (
            <Query fetchPolicy={"network-only"} pollInterval={250} query={GET_LOGOS}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <div className="container row">
                            <div className="col s4" style={{textAlign:"right"}}>
                                <h3>Recent Work</h3>
                                {/*Sort the Logos by Last Update Here*/}
                                {data.logos.sort((a, b) => b.lastUpdate > a.lastUpdate).map((logo, index) => (
                                    <div key={index} className='home_logo_link'
                                        style={{ cursor: "pointer" }}>
                                        <button className="btn btn-secondary" style={{marginBottom:"8pt"}} onClick={() => this.props.history.push("/view/"+logo._id)}>{logo.text}</button>
                                    </div>
                                ))}
                            </div>
                            <div className="col s8">
                                <div id="home_banner_container">
                                    goLogoLo
                                </div>
                                <div style={{textAlign:"center", marginTop:"12pt"}}>
                                    <button className="btn btn-success" onClick={() => this.props.history.push("/create")}>Add Logo</button>
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
