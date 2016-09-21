import React, {Component} from 'react';
//import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Resolutions } from '../../api/resolutions.js';
import { Images } from '../../api/images.js';
import UploadForm from '../components/UploadForm.jsx';

export default class ResolutionDetail extends React.Component {
	constructor() {
		super();
		/*?
		this.state = {
			subscription: {
				resolutions: Meteor.subscribe("userResolutions")
			}
		};
		*/
	}

	componentWillUnmount() {
		//this.state.subscription.resolutions.stop();
		this.props.resSub.stop();
		this.props.imgSub.stop();
	}

    /*
	resolution() {

		return Resolutions.findOne(this.props.id);
	}
	*/

	render() {
		//let res = this.resolution();

		if(!this.props.Resolution) {
			return(<div>Loading....</div>);
		}

		return (
			<div>
				<h1>{this.props.Resolution.text}</h1>
				<UploadForm {...this.props} />
			</div>
		)
	}
}

// loading={this.props.loading} myImages={this.props.myImages} Resolution={this.props.Resolution} 