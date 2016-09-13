import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { Resolutions } from '../../api/resolutions.js';

import ResolutionsForm from '../components/ResolutionsForm.jsx';
import ResolutionSingle from '../components/ResolutionSingle.jsx';

//import { FilesCollection } from 'meteor/ostrio:files';


//Resolutions = new Mongo.Collection("resolutions");

//this.myResolutions = '';

export default class Index extends TrackerReact(React.Component) {
	//let myResolutions = Resolutions.find().fetch();
   //this.myResolutions = Resolutions.find().fetch();
   //myResolutions = Resolutions.find().fetch();
   //console.log(myResolutions);


    constructor() {
    	super();

    	//this.state = new ReactiveDict();
  		Meteor.subscribe('userResolutions');

  		this.state = {};

/*
    	this.state = {
    		subscription:  {
    			resolutions: Meteor.subscribe("userResolutions"),
    			images: Meteor.subscribe("Images")
    		}
    	};
*/


/*
		this.Images = new Meteor.Files({
		  debug: true,
		  collectionName: 'Images',
		  allowClientCode: false, // Disallow remove files from Client
		  storagePath: '../../../../../.storage/images',
		  onBeforeUpload: function (file) {
		    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
		    if (file.size <= 1024*1024*10 && /png|jpg|jpeg/i.test(file.extension)) {
		      return true;
		    } else {
		      return 'Please upload image, with size equal or less than 10MB';
		    }
		  }
		});
*/



    	//this.myResolutions = '';
    	//this.mySillyArray = Array();
    }

  
	componentWillUnmount() {
	  	// this.state.subscription.resolutions.stop();
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