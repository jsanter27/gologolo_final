import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import TextEditWorkspace from './TextEditWorkspace';

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            fontSize
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
                            <div className="panel panel-default">
                                <div className="row">
                                    <div className="panel-body" style={{marginTop:"36pt"}}>
                                        <dl>
                                            <dt>Text:</dt>
                                            <dd style={{maxWidth:"15vw", overflowX:"auto"}}>{data.logo.text}</dd>
                                            <dt>Color:</dt>
                                            <dd>{data.logo.color}</dd>
                                            <dt>Font Size:</dt>
                                            <dd>{data.logo.fontSize}</dd>
                                            <dt>Background Color:</dt>
                                            <dd>{data.logo.backgroundColor}</dd>
                                            <dt>Border Color:</dt>
                                            <dd>{data.logo.borderColor}</dd>
                                            <dt>Border Radius:</dt>
                                            <dd>{data.logo.borderRadius}</dd>
                                            <dt>Border Thickness:</dt>
                                            <dd>{data.logo.borderThickness}</dd>
                                            <dt>Padding:</dt>
                                            <dd>{data.logo.padding}</dd>
                                            <dt>Margin:</dt>
                                            <dd>{data.logo.margin}</dd>
                                            <dt>Last Updated:</dt>
                                            <dd>{data.logo.lastUpdate}</dd>
                                        </dl>
                                        <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                            {(removeLogo, { loading, error }) => (
                                                <div>
                                                    <form
                                                        onSubmit={e => {
                                                            e.preventDefault();
                                                            removeLogo({ variables: { id: data.logo._id } });
                                                        }}>
                                                        <Link to={`/edit/${data.logo._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                    <button type="submit" className="btn btn-danger">Delete</button>
                                                    </form>
                                                    {loading && <p>Loading...</p>}
                                                    {error && <p>Error :( Please try again</p>}
                                                </div>
                                            )}
                                        </Mutation>
                                    </div>
                                    {/*Display the Logo in this component*/}
                                    <TextEditWorkspace
                                        text={data.logo.text}
                                        color={data.logo.color}
                                        fontSize={data.logo.fontSize}
                                        backgroundColor={data.logo.backgroundColor}
                                        borderColor={data.logo.borderColor}
                                        borderRadius={data.logo.borderRadius}
                                        borderThickness={data.logo.borderThickness}
                                        padding={data.logo.padding}
                                        margin={data.logo.margin}
                                        sectionTitle="View Logo"
                                        history={this.props.history}
                                    />
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