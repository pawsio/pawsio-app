import angular from 'angular';
import './scss/main.scss';
import components from './components';
import services from './services';
import uiRouter from 'angular-ui-router';
import defaultRoute from 'angular-ui-router-default';
import 'angular-ui-router/release/stateEvents';
import routes from './routes';
import dialog from 'ng-dialog';
import 'ng-dialog/css/ngDialog.css';
import 'ng-dialog/css/ngDialog-theme-default.css';
import http from './http';
import auth from './auth';


const app = angular.module('myApp', [
    components,
    services,
    uiRouter,
    angular.module('ui.router.state.events').name,
    defaultRoute,
    dialog
]);

app.config(routes);

const dev = 'https://pawsio.herokuapp.com/api';

// app.value('apiUrl', process.env.API_URL || '/api'); 
app.value('apiUrl', dev);
app.config(http);
app.run(auth);

