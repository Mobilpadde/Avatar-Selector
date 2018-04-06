import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router-dom';

import history from './history';
import Home from './Home';

render(
    <Router history={history}>
        <div>
            <Route exact path='/' component={Home}/>
            <Route path='/:avatar' render={({ match }) => <Home selected={parseInt(match.params.avatar, 10)}/>}/>
        </div>
    </Router>,
    document.getElementById('root')
);
