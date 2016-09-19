import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import AppContainer from '../../ui/containers/AppContainer.jsx';
import ResolutionsContainer from '../../ui/containers/ResolutionsContainer.jsx';
import Index from '../../ui/pages/Index.jsx';
import About from '../../ui/pages/About.jsx';
import ResolutionDetail from '../../ui/pages/ResolutionDetail.jsx';
import MainLayout from '../../ui/layouts/MainLayout.jsx';


export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={ResolutionsContainer} />
      <Route path="/about" component={About} />
      <Route path="/resolutions/:id" component={ResolutionDetail} />
    </Route>
  </Router>
);


/*
Meteor.startup( () => {
  render(
    <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={Index} />
      <Route path="/about" component={About} />
      <Route path="/resolutions/:id" component={ResolutionDetail} />
    </Route>
  </Router>, 
    document.getElementById( 'app' ) 
  );
});
*/




/*
import React from 'react';
import {mount} from 'react-mounter';

import {MainLayout} from '../../ui/layouts/MainLayout.jsx';
import Index from '../../ui/pages/Index.jsx';
import About from '../../ui/pages/About.jsx';
import ResolutionDetail from '../../ui/pages/ResolutionDetail.jsx';


FlowRouter.route('/', { 
	action() {
		mount(MainLayout, {
			content: (<Index />)
		});
    }
});

FlowRouter.route('/about', {
    action() {
        mount(MainLayout, {
            content: (<About />)
        })
    }
});

FlowRouter.route('/resolutions/:id', {
	action(params) {
		mount(MainLayout, {
			content: (<ResolutionDetail id={params.id} />)
		})
	}
});
*/



