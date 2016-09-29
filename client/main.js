
/*
import '/imports/startup/client';
import '/imports/startup/both';
*/
//import bootstrap from 'bootstrap-sass'

//import { bootstrap-sass } from 'bootstrap-sass';
import 'bootstrap-sass';
import '/imports/ui/css';


import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/client/routes.jsx';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('app'));
});


