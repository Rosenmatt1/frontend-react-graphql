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

/*A fragment such <> allows to wrap cildren elements without adding a new DOM node*/

const Root = () => (
    <Query query={ME_QUERY}>
        {({ data, loading, error }) => {
            if (loading) return <Loading loading={loading}/>
            if (error) return <Error error={error}/>
            const currentUser = data.me

            return (
                <Router>
                    <>
                        <Header currentUser={currentUser}/>
                        <Switch>
                            <Route exact path="/" component={App} />
                            <Route path="/profile/:id" component={Profile} />
                        </Switch>
                    </>
                </Router>
            )
        }}
    </Query>
)

//allows to query for current user
const ME_QUERY = gql`
    {
        me {
            id 
            username
            email
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
