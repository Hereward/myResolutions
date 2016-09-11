Resolutions = new Mongo.Collection("resolutions");
Images = new Mongo.Collection("Images");

Meteor.publish("allResolutions", function(){
	return Resolutions.find();
});

Meteor.publish("userResolutions", function(){
	return Resolutions.find({user: this.userId});
});

Meteor.publish("images", function(){
	return Images.find();
});

// console.log(Meteor.settings.private.ptest);