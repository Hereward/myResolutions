import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import ResolutionsForm from './ResolutionsForm.jsx';
import ResolutionSingle from './ResolutionSingle.jsx';


Resolutions = new Mongo.Collection("resolutions");

//this.myResolutions = '';

export default class ResolutionsWrapper extends TrackerReact(React.Component) {
	//let myResolutions = Resolutions.find().fetch();
   //this.myResolutions = Resolutions.find().fetch();
   //myResolutions = Resolutions.find().fetch();
   //console.log(myResolutions);


    constructor() {
    	super();

    	this.state = {
    		subscription:  {
    			resolutions: Meteor.subscribe("userResolutions")
    		}
    	};
    	//this.myResolutions = '';
    	//this.mySillyArray = Array();
    }

  
	componentWillUnmount() {
	  	this.state.subscription.resolutions.stop();
	}
    

/*
    resolutions() {
		//this.myResolutions = Resolutions.find().fetch();
		//return myResolutions;
		return Resolutions.find().fetch();
	}

	*/

	getMyResolutions() {
		let output = Array();
		let myResolutions = Resolutions.find().fetch();
		myResolutions.forEach(
			(resolution, index)=>{ 
				//console.log(resolution._id);
				output.push(<ResolutionSingle key={resolution._id} resolution={resolution} />);
			}
		);

		return output;
	}

	
	render() {
		//this.myResolutions = this.resolutions();
		//console.log(this.myResolutions);
		
		//console.log(this.mySillyArray);
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
					{this.getMyResolutions()}
				</ReactCSSTransitionGroup>  
			</ReactCSSTransitionGroup>	
		);
	}
}

/*

{this.myResolutions.map( (resolution)=>{
						return <ResolutionSingle key={resolution._id} resolution={resolution} />;
					})}
					*/

/*
{this.myResolutions.forEach( (resolution)=>{
						return <ResolutionSingle key={resolution._id} resolution={resolution} />;
					})}
					*/

/*
{this.resolutions().map( (resolution)=>{
						return <ResolutionSingle key={resolution._id} resolution={resolution} />;
					})}
					*/