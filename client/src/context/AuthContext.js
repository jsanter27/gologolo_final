import React, {createContext} from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

/*
export default ({ children }) => {
    const [user, setUser] = useState(null);
}
*/

export default class AuthProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user : null,
            isAuthenticated : false,
            isLoaded : false
        };
    }

    setAuth = (user, isAuthenticated) => {
        this.setState({
            user : user,
            isAuthenticated : isAuthenticated,
            isLoaded : this.state.isLoaded
        });
    }

    componentDidMount(){
        authService.isAuthenticated().then(data => {
            this.setState({
                user : data.user,
                isAuthenticated : data.isAuthenticated,
                isLoaded : true
            });
        });
    }

    render(){
        return (
            <div>
                {!this.state.isLoaded ? <h1>Loading</h1> : 
                <AuthContext.Provider value={{user:this.state.user, isAuthenticated:this.state.isAuthenticated, setAuth:this.setAuth}}>
                    {this.props.children}
                </AuthContext.Provider>}
            </div>
        )
    }
}