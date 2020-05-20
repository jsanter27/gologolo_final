import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import LogoWorkspace from './LogoWorkspace';
import { Logo } from '../classes/Logo';
import { AuthContext } from '../context/AuthContext';

const GET_LOGO = gql`
    query getLogoByID($logoId: String) {
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

    static contextType = AuthContext;

    componentDidMount(){
        if(!this.context.isAuthenticated){
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <Query fetchPolicy={'no-cache'} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    return (
                        <div className="container">
                            <div style={{position:"absolute", left:((window.screen.width/2)-(data.getLogoByID.width/2)).toString()+"px"}}>
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
                                            canExport={true}
                                            history={this.props.history}
                                            match={this.props.match}
                                        />
                                    </div>
                                </div>
                                <div className="row" style={{position:"absolute", top:(data.getLogoByID.length+10).toString()+"px", textAlign:"center"}}>
                                    <div className="panel-body" style={{marginTop:"36pt"}}>
                                        <Mutation mutation={DELETE_LOGO} key={data.getLogoByID._id} onCompleted={() => this.props.history.push('/')}>
                                            {(removeLogo, { loading, error }) => (
                                                <div>
                                                    <form
                                                        onSubmit={e => {
                                                            e.preventDefault();
                                                            removeLogo({ variables: { id: data.getLogoByID._id } });
                                                        }}>
                                                        <div>
                                                            <Link to={`/edit/${data.getLogoByID._id}`} className="btn btn-success" style={{position:'absolute', left:"5pt"}}>Edit</Link>&nbsp;
                                                            <button type="submit" className="btn btn-danger" style={{position:"absolute", left:"50pt"}}>Delete</button>
                                                        </div>
                                                    </form>
                                                    {loading && <p>Loading...</p>}
                                                    {error && <p>Error :( Please try again</p>}
                                                </div>
                                            )}
                                        </Mutation>
                                    </div>
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