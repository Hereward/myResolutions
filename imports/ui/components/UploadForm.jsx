import React from 'react';
import {Meteor} from 'meteor/meteor';
import IndividualFile from './FileIndividualFile.jsx';
import {_} from 'meteor/underscore';
import { Images } from '../../api/images.js';
import { Resolutions } from '../../api/resolutions.js';

const UploadForm = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      uploading: [],
      progress: 0,
      inProgress: false
    };
  },

  updateResolution(fileObj) {
    console.log(`updateResolution: ResolutionID = ${this.props.resolution._id} ImageID = ${fileObj._id}`);
    Meteor.call('updateResolutionImage', this.props.resolution, fileObj._id);

  },

  getMeteorData() {
    console.log(`getMeteorData: IMAGE ID= ${this.props.resolution.image_id}`);

    var handle = Meteor.subscribe('allImages');
    return {
      docsReadyYet: handle.ready(),
      docs: Images.find({ _id: this.props.resolution.image_id }).fetch()
    };
  },

  getFromServer(e) {

  },

  uploadIt(e) {
    "use strict";
    e.preventDefault();

    let self = this;

    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // there was multiple files selected
      var file = e.currentTarget.files[0];

      if (file) {
        let uploadInstance = Images.insert({
          file: file,
          meta: {
            locator: self.props.fileLocator,
            userId: Meteor.userId() // Optional, used to check on server for file tampering
          },
          streams: 'dynamic',
          chunkSize: 'dynamic',
          allowWebWorkers: true // If you see issues with uploads, change this to false
        }, false);

        self.setState({
          uploading: uploadInstance, // Keep track of this instance to use below
          inProgress: true // Show the progress bar now
        });

        // These are the event functions, don't need most of them, it shows where we are in the process
        uploadInstance.on('start', function () {
          console.log('Starting');
        });

        uploadInstance.on('end', function (error, fileObj) {
          console.log('On end File Object: ', fileObj);
        });

        uploadInstance.on('uploaded', function (error, fileObj) {
          console.log('uploaded: ', fileObj);
          console.log('uploaded image ID: ', fileObj._id);
          self.updateResolution(fileObj);

          // Remove the filename from the upload box
          self.refs['fileinput'].value = '';

          // Reset our state for the next file
          self.setState({
            uploading: [],
            progress: 0,
            inProgress: false
          });
        });

        uploadInstance.on('error', function (error, fileObj) {
          console.log('Error during upload: ' + error);
        });

        uploadInstance.on('progress', function (progress, fileObj) {
          console.log('Upload Percentage: ' + progress);
          // Update our progress bar
          self.setState({
            progress: progress
          });
        });

        uploadInstance.start(); // Must manually start the upload
      }
    }
  },

  // This is our progress bar, bootstrap styled
  // Remove this function if not needed
  showUploads() {
    console.log('**********************************', this.state.uploading);

    if (!_.isEmpty(this.state.uploading)) {
      return <div>
        {this.state.uploading.file.name}

        <div className="progress progress-bar-default">
          <div style={{ width: this.state.progress + '%' }} aria-valuemax="100"
            aria-valuemin="0"
            aria-valuenow={this.state.progress || 0} role="progressbar"
            className="progress-bar">
            <span className="sr-only">{this.state.progress}% Complete (success) </span>
            <span>{this.state.progress}%</span>
          </div>
        </div>
      </div>;
    }
  },

  render() {
    if (this.data.docsReadyYet) {
      'use strict';

      let fileCursors = this.data.docs;

      // Run through each file that the user has stored
      // (make sure the subscription only sends files owned by this user)

      let showit = fileCursors.map((aFile, key) => {
        // console.log('A file: ', aFile.link(), aFile.get('name'));

        let link = Images.findOne({ _id: aFile._id }).link();  //The "view/download" link

        // Send out components that show details of each file
        return <div key={'file' + key}>
          <IndividualFile
            fileName={aFile.name}
            fileUrl={link}
            fileId={aFile._id}
            fileSize={aFile.size}
            />
        </div>;
      });

//<span>RES ID =  {this.props.resolution._id} </span>
      return <div> 
        <div className="row">
          <div className="col-md-12">
            <p><strong>Upload New File: </strong></p>
            <input type="file" id="fileinput" disabled={this.state.inProgress} ref="fileinput"
              onChange={this.uploadIt}/>  
              <span> &nbsp; <input type="button" id="getfromserver" ref="getfromserver"
              onClick={this.getFromServer} value="Get from server" /></span>
          </div>
        </div>

        <div className="row m-t-sm m-b-sm">
          <div className="col-md-6">

            {this.showUploads() }

          </div>
          <div className="col-md-6">
          </div>
        </div>

        {showit}

      </div>;
    }
    else return <div><span>Loading...</span></div>;
  }
});
console.log("hello");

export default UploadForm;