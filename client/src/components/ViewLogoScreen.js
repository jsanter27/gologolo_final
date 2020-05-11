import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import LogoWorkspace from './LogoWorkspace';
import { Logo } from '../classes/Logo';

const GET_LOGO = gql`
    query logo($logoId: String) {
        getLogoByID(id: $logoId){
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

const DELETE_LOGO = gql`
    mutation removeLogo($id: String!) {
        removeLogo(id:$id) {
            _id
        }
    }
`;

class ViewLogoScreen extends Component {

    render() {
        return (
            <Query fetchPolicy={'network-only'} pollInterval={250} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <div className="container">
                            <div className="row">
                                <div>
                                    <LogoWorkspace
                                        logo={new Logo(
                                            data.getLogoByID.name,
                                            data.getLogoByID.length,
                                            data.getLogoByID.width,
                                            data.getLogoByID.elements,
                                            data.getLogoByID.backgroundColor,
                                            data.getLogoByID.borderColor,
                                            data.getLogoByID.borderRadius,
                                            data.getLogoByID.borderThickness,
                                            data.getLogoByID.padding,
                                            data.getLogoByID.margin
                                        )}
                                        position="absolute"
                                        canEdit={false}
                                    />
                                </div>
                            </div>
                            <div className="row" style={{position:"absolute", top:(data.getLogoByID.length+10).toString()+"px"}}>
                                <div className="panel-body" style={{marginTop:"36pt"}}>
                                    <Mutation mutation={DELETE_LOGO} key={data.getLogoByID._id} onCompleted={() => this.props.history.push('/' + this.props.match.params.username)}>
                                        {(removeLogo, { loading, error }) => (
                                            <div>
                                                <form
                                                    onSubmit={e => {
                                                        e.preventDefault();
                                                        removeLogo({ variables: { id: data.getLogoByID._id } });
                                                    }}>
                                                    <Link to={`/${this.props.match.params.username}/edit/${data.getLogoByID._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                    <button type="submit" className="btn btn-danger">Delete</button>
                                                    <button type="button" className="btn btn-warning" style={{marginLeft:"3pt"}}>Export</button>
                                                    <Link to={`/${this.props.match.params.username}/`} className="btn btn-dark" style={{marginLeft:"3pt"}}>Home</Link>&nbsp;
                                                </form>
                                                {loading && <p>Loading...</p>}
                                                {error && <p>Error :( Please try again</p>}
                                            </div>
                                        )}
                                    </Mutation>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default ViewLogoScreen;