import React from 'react';
//import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

//import { Resolutions } from '../../api/resolutions.js';

import ResolutionsForm from '../components/ResolutionsForm.jsx';
import ResolutionSingle from '../components/ResolutionSingle.jsx';
//import { Images } from '../../api/images.js';

import { Loading } from '../components/Loading.js';


export default class Index extends React.Component {

    constructor(props) {
		super(props);
/*
        this.myResolutions = new ReactiveVar( 
            Resolutions.find().fetch()
        );
*/

        /*
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

        */
        
    }


    componentWillUnmount() {
		this.props.resSub.stop();
		this.props.imgSub.stop();
    }

    componentDidMount() {
        //console.log(this.props);
    }

    getMyResolutions() {
		let output = Array();

		//let myResolutions = Resolutions.find().fetch();
        //console.log(myResolutions);
        //let res = this.myResolutions.get();
		this.props.myResolutions.forEach(
			(resolution, index) => {
				let link = '';
				if (resolution.image_id) {
					console.log(`Image ID = ${resolution.image_id}`);
					let Obj = this.props.Images.findOne({ _id: resolution.image_id });
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

/*
	getMyResolutions() {
        let output = Array();

        if (!this.props.myResolutions) {
            output.push(<div>Loading records...</div>);
            return output;
        }
		
		//let myResolutions = Resolutions.find().fetch();
		//myResolutions.forEach(
        this.props.myResolutions.forEach(
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
    */


	render() {
        //console.log(this.props);
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
					{this.props.loading ? <Loading /> : this.getMyResolutions() }
				</ReactCSSTransitionGroup>
			</ReactCSSTransitionGroup>
		);

	}

}

//{this.getMyResolutions() }


Index.propTypes = {
    connected: React.PropTypes.bool,   // server connection status
    loading: React.PropTypes.bool,     // subscription status
    myResolutions: React.PropTypes.array,      // all resolutions visible to the current user
    children: React.PropTypes.element, // matched child route component
    location: React.PropTypes.object,  // current router location
    params: React.PropTypes.object,    // parameters of the current route
};
