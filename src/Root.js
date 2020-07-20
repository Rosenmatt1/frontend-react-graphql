import React from "react";
import { Query } from "react-apollo";
import { gql } from 'apollo-boost'; //allows to parse
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import withRoot from "./withRoot";
import App from './pages/App';
import Profile from './pages/Profile';
import Header from './components/Shared/Header';
import Loading from './components/Shared/Loading';
import Error from './components/Shared/Error';

export const UserContext = React.createContext()

/*A fragment such <> allows to wrap cildren elements without adding a new DOM node*/

const Root = () => (
    <Query query={ME_QUERY}>
        {({ data, loading, error }) => {
            if (loading) return <Loading loading={loading} />
            if (error) return <Error error={error} />
            const currentUser = data.me

            return (
                <Router>
                    <UserContext.Provider value={currentUser}>
                        <Header currentUser={currentUser} />
                        <Switch>
                            <Route exact path="/" component={App} />
                            <Route path="/profile/:id" component={Profile} />
                        </Switch>
                    </UserContext.Provider>
                </Router>
            )
        }}
    </Query>
)

//allows to query for current user
export const ME_QUERY = gql`
    {
        me {
            id 
            username
            email
            likeSet {
                track {
                    id
                }
            }
        }
    }
`

// const GET_TRACKS_QUERY = gql`
//     {
//         tracks {
//             id 
//             title
//             description 
//             url
//         }
//     }
// `


export default withRoot(Root);
