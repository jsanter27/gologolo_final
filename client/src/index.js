import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import AuthProvider from './context/AuthContext';

// THESE ARE OUR REACT SCREENS, WHICH WE WILL ROUTE HERE
import HomeScreen from './components/HomeScreen';
import EditLogoScreen from './components/EditLogoScreen';
import CreateLogoScreen from './components/CreateLogoScreen';
import ViewLogoScreen from './components/ViewLogoScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import ResetPasswordScreen from './components/ResetPasswordScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen.js';

const client = new ApolloClient({ uri: 'http://localhost:3000/graphql' });

ReactDOM.render(
    <ApolloProvider client={client}>
        <AuthProvider>
            <Router>
                <div>
                    <Route exact path='/' component={HomeScreen} />
                    <Route path='/login' component={LoginScreen} />
                    <Route path='/register' component={RegisterScreen} />
                    <Route path="/forgot" component={ForgotPasswordScreen} />
                    <Route path='/reset/:token' component={ResetPasswordScreen} />
                    <Route path='/edit/:id' component={EditLogoScreen} />
                    <Route path='/create' component={CreateLogoScreen} />
                    <Route path='/view/:id' component={ViewLogoScreen} />
                </div>
            </Router>
        </AuthProvider>
    </ApolloProvider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://create-react-app.dev/docs/making-a-progressive-web-app/
serviceWorker.unregister();
