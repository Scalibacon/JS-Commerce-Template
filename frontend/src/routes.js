import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import LoginAdm from './components/LoginAdm';

function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/login/adm' exact component={LoginAdm}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;