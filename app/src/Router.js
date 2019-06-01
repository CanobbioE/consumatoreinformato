import {MuiThemeProvider} from '@material-ui/core/styles';
import {BrowserRouter, Route} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';

import {properties} from './config/Properties';
import Globals from './config/Globals';
import reducers from './reducers';
import Home from './containers/Home';
import About from './containers/About';
import Contatti from './containers/Contatti';
import Iscrizione from './containers/Iscrizione';
import Payment from './containers/Payment';
import Login from './containers/Login';
import NavBar from './components/NavBar';
import Logo from './components/Logo';
import Personal from './containers/PersonalArea';
import Admin from './containers/Admin';

import './index.css';

const store = createStore(
	reducers,
	{
		// A preloaded state
	},
	applyMiddleware(reduxThunk),
);

class Router extends Component {
	render() {
		return (
			<MuiThemeProvider theme={properties.theme}>
				<Provider className="bg-white" store={store}>
					<Logo />
					<BrowserRouter>
						<NavBar />
						<div>
							<Route exact path={Globals.routes.home} component={Home} />
							<Route exact path={Globals.routes.about} component={About} />
							<Route exact path={Globals.routes.contatti} component={Contatti} />
							<Route exact path={Globals.routes.iscrizione} component={Iscrizione} />
							<Route exact path={Globals.routes.login} component={Login} />
							<Route exact path={Globals.routes.payment} component={Payment} />
							<Route exact path={Globals.routes.personal} component={Personal} />
							<Route exact path={Globals.routes.admin} component={Admin} />
						</div>
					</BrowserRouter>
					{/*TODO: footer */}
				</Provider>
			</MuiThemeProvider>
		);
	}
}

export default Router;
