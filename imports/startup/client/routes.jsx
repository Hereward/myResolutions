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


