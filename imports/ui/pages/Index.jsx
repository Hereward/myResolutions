import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { Resolutions } from '../../api/resolutions.js';

import ResolutionsForm from '../components/ResolutionsForm.jsx';
import ResolutionSingle from '../components/ResolutionSingle.jsx';
import { Images } from '../../api/images.js';


export default class Index extends TrackerReact(React.Component) {

    constructor() {
		super();
		const resolutionsSub = Meteor.subscribe("userResolutions");
		const imagesSub = Meteor.subscribe('allImages');

		this.state = {
			imagesReady: imagesSub.ready(),
			resolutionsReady: resolutionsSub.ready(),
			subscription: {
				resolutions: resolutionsSub,
				images: imagesSub
			}
		};
    }


    componentWillUnmount() {
		this.state.subscription.resolutions.stop();
		this.state.subscription.images.stop();
    }


	getMyResolutions() {
		let output = Array();
		let myResolutions = Resolutions.find().fetch();
		myResolutions.forEach(
			(resolution, index) => {
				let link = '';
				if (resolution.image_id) {
					console.log(`Image ID = ${resolution.image_id}`);
					let Obj = Images.findOne({ _id: resolution.image_id });
					if (Obj) {
						link = Obj.link();
						console.log(`LINK = ${link}`);
					}
				}
				output.push(<ResolutionSingle key={resolution._id} resolution={resolution} link={link} />);
			}
		);

		return output;
	}


	render() {
		return (
			<ReactCSSTransitionGroup
				component="div"
				transitionName="route"
				transitionEnterTimeout={600}
				transitionAppearTimeout={600}
				transitionLeaveTimeout={400}
				transitionAppear={true}>
				<h1>My Resolutions</h1>
				<ResolutionsForm />
				<ReactCSSTransitionGroup
                    component="ul"
                    className="resolutions"
                    transitionName="resolutionLoad"
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={400}>
					{this.getMyResolutions() }
				</ReactCSSTransitionGroup>
			</ReactCSSTransitionGroup>
		);

	}
}
