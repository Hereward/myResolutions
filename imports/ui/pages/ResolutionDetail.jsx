import React, {Component} from 'react';
//import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Resolutions } from '../../api/resolutions.js';
import { Images } from '../../api/images.js';
import UploadForm from '../components/UploadForm.jsx';

export default class ResolutionDetail extends React.Component {
	constructor() {
		super();
		this.state = {
			subscription: {
				resolutions: Meteor.subscribe("userResolutions")
			}
		};
	}

	componentWillUnmount() {
		this.state.subscription.resolutions.stop();
	}

	resolution() {

		return Resolutions.findOne(this.props.id);
	}

	render() {
		let res = this.resolution();

		if(!res) {
			return(<div>Loading....</div>);
		}

		return (
			<div>
				<h1>{res.text}</h1>
				<UploadForm resolution={res} />
			</div>
		)
	}
}