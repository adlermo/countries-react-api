import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Main from '../pages/main/'
import Country from '../pages/country/'
import Border from '../pages/border/'

const Routes = () => (
    /* Call routes as a browser  -- BrowserRouter */
    <BrowserRouter>
        {/* Makes only one route to be called -- Switch */}
        <Switch>
            {/* defines components to show in each route -- Route */}
            <Route exact path='/' component={Main} />
            {/* show country info (by name)*/}
            <Route path='/country/:name' component={Country} />
            <Route path='/border/:name' component={Border} />
        </Switch>
    </BrowserRouter>
)

export default Routes