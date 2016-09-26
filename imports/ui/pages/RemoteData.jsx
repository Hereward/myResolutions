import React, {Component} from 'react';
import { Bert } from 'meteor/themeteorchef:bert';
import { HTTP } from 'meteor/http';
import axios from 'axios';
import fs from 'fs';

export default class RemoteData extends React.Component {

	constructor(props) {
		super(props);
		
		this.state = {
				fulfilled: false,
				data: ''
		};

		this.DataURL = 'http://jsonplaceholder.typicode.com/posts/1';
		console.log("RemoteData constructor");
		
	}

	fetchImage() {
		console.log('fetching image');
		Meteor.call('getImage', this.props.Resolution);
		//responseType: 'json',
		//let url = 'http://www.getcommandofit.com.au/assets/Uploads/tuna-nicoise.png';




/*
	let promise = new Promise(
		(resolve, reject) => {
			console.log("CALL SERVICE");
			HTTP.call(
				'GET', url, 
		    	{npmRequestOptions: {encoding: null}},
				(error, result) => {
					if (error) {
						reject(error);
					} else {
						resolve(result);
					}
				});
		}
	);

	promise.then(function(result) {
		console.log('Got IMAGE data!', result);


	}.bind(this)).catch(function(error) {
		console.log('IMAGE Error occurred!', error);
		throw new Meteor.Error('500', `${error.message}`);
	});

	*/

		  /*

		axios.get(url)
		  .then(function (response) {
		    console.log(response);
		  })
		  .catch(function (error) {
		    console.log(error);
		});

		*/
	}


	fetchData() {
		console.log("fetchData called");
			

			let promise = new Promise(
				(resolve, reject) => {
				    console.log("CALL SERVICE");
				    HTTP.call('GET', this.DataURL, (error, result) => {
					    if (error) {
					      reject(error);
					    } else {
					      resolve(result);
					    }
				  	});
				}
			);

			promise.then(function(result) {
				console.log('Got data!', result);
					
				this.setState({
	          		fulfilled: true,
	          		data: result.data
	            });
	            this.updateDB();
	            this.fetchImage();
	            	            

			}.bind(this)).catch(function(error) {
				console.log('Error occurred!', error);
				throw new Meteor.Error('500', `${error.message}`);
			});

	}

	updateDB() {
		if (this.props.Resolution) {
			let text = "MONGO - " + this.state.data.title;
			Meteor.call('updateResolutionRemoteData', this.props.Resolution, text);

		}
		
	}



    componentDidMount() {
    	if (!this.props.Resolution.RemoteData) {
    	   this.fetchData();
    	} else {
    		this.setState({
	          		fulfilled: true,
	          		data: {title: this.props.Resolution.RemoteData}
	        });
    	}
    }


    componentWillReceiveProps() {
    	
    }

    componentWillMount() {
    	 //this.setState({ mounted: true });
    	 
    }
  

	componentWillUnmount() {
		//this.setState({ mounted: false });
  	}



	render() {

        if (!this.state.fulfilled) {
    	  
        	return(<div>Loading....</div>);
        }
		

		return (
			<div>
				<h1>SOME EXTRA DATA</h1>
				<div>{this.state.data.title}</div>
			</div>
		);
	}
}

