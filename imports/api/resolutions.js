import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
 
export const Resolutions = new Mongo.Collection('resolutions');


if (Meteor.isServer) {
  // This code only runs on the server
	Meteor.publish("allResolutions", function allResolutionsPublication(){
		return Resolutions.find();
	});

	Meteor.publish("userResolutions", function userResolutionsPublication(){
		return Resolutions.find({user: this.userId});
	});

}

console.log('publish');


Meteor.methods({
	addResolution(resolution) {
		check(resolution, String);
		if(!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}
		Resolutions.insert({
			text: resolution,
			complete: false,
			createdAt: new Date(),
			user: Meteor.userId()
		});		
	},
	updateResolutionText(resolution, newValue) {
		check(resolution, Object);
		if(!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}
		Resolutions.update(resolution._id, {
			$set: {text: newValue}
		});	
	},
	updateResolutionRemoteData(resolution, newValue) {
		check(resolution, Object);
		if(!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}
		Resolutions.update(resolution._id, {
			$set: {RemoteData: newValue}
		});	
	},
	updateResolutionImage(resolution, newValue) {
		check(resolution, Object);
		if(!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}
		Resolutions.update(resolution._id, {
			$set: {image_id: newValue}
		});	
	},
	toggleResolution(resolution) {
		check(resolution, Object);
		if(Meteor.userId() !== resolution.user) {
			throw new Meteor.Error('not-authorized');
		}
		Resolutions.update(resolution._id, {
			$set: {complete: !resolution.complete}
		});
	},
	deleteResolution(resolution) {
		check(resolution, Object);
		if(Meteor.userId() !== resolution.user) {
			throw new Meteor.Error('not-authorized');
		}
		Resolutions.remove(resolution._id);
	}

});



// Resolutions = new Mongo.Collection("resolutions");