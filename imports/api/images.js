import { Meteor } from 'meteor/meteor';
//import { Mongo } from 'meteor/mongo';

import { FilesCollection } from 'meteor/ostrio:files';



export const Images = new Meteor.Files({
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

console.log(Images);
//var myImages = new Mongo.Collection('Images');


if (Meteor.isServer) {
  Images.denyClient();
  Meteor.publish('allImages', function () {
    return Images.find().cursor;
  });


} else {

  //Meteor.subscribe('allImages');
}



/*
if (Meteor.isServer) {
  // This code only runs on the server
	Meteor.publish("allImages", function allImagesPublication(){
		return Images.collection().find();
	});


	Meteor.publish("userImages", function userImagesPublication(){
		return Images.collection().find({user: this.userId});
	});
  

}
*/


/*
Meteor.methods({
	uploadImage(resolution) {

     if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case 
      // there was multiple files selected
      var file = e.currentTarget.files[0];
      if (file) {
        var uploadInstance = Images.insert({
          file: file,
          streams: 'dynamic',
          chunkSize: 'dynamic'
        }, false);

        //var name = uploadInstance.file.name;

       // filePath += '/'+name;

       // console.log("Filepath = " + filePath);




        //fs.writeFileSync(filePath, file, 'binary');

        uploadInstance.on('start', function() {
          template.currentUpload.set(this);
        });

        uploadInstance.on('end', function(error, fileObj) {
          if (error) {
            alert('Error during upload: ' + error.reason);
          } else {
            alert('File "' + fileObj.name + '" successfully uploaded');
          }
          template.currentUpload.set(false);
          console.log(uploadInstance.config.fileId);
        });

        uploadInstance.start();
      }
    }
		
	}
});

*/



/*

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { FilesCollection } from 'meteor/ostrio:files';
import fs from 'file-system';

import './main.html';

//fs = Npm.require( 'fs' ) ;
//path = Npm.require( 'path' ) ;
//__ROOT_APP_PATH__ = fs.realpathSync('.');

//var base = process.env.PWD;
var base = process.cwd();

//var filePath = base + 'upload';

//console.log("BASE:  " + base);

Template.uploadedFiles.helpers({
  uploadedFiles: function () {
    return Images.find();
  }
});

Template.uploadForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.uploadForm.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  }
});

Template.uploadForm.events({
  'change #fileInput': function (e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case 
      // there was multiple files selected
      var file = e.currentTarget.files[0];
      if (file) {
        var uploadInstance = Images.insert({
          file: file,
          streams: 'dynamic',
          chunkSize: 'dynamic'
        }, false);

        //var name = uploadInstance.file.name;

       // filePath += '/'+name;

       // console.log("Filepath = " + filePath);




        //fs.writeFileSync(filePath, file, 'binary');

        uploadInstance.on('start', function() {
          template.currentUpload.set(this);
        });

        uploadInstance.on('end', function(error, fileObj) {
          if (error) {
            alert('Error during upload: ' + error.reason);
          } else {
            alert('File "' + fileObj.name + '" successfully uploaded');
          }
          template.currentUpload.set(false);
          console.log(uploadInstance.config.fileId);
        });

        uploadInstance.start();
      }
    }
  }
});

*/



