import React, {Component} from 'react';
import { FilesCollection } from 'meteor/ostrio:files';

export default class UploadForm extends Component {

	uploadImage(e) {
	  //event.preventDefault();
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


	render() {
		return (
			<div>
				<input onChange={this.uploadImage.bind(this)} id="fileInput" type="file" />
	    		<p><small>Upload file in <code>jpeg</code> or <code>png</code> format, with size less or equal to 10MB</small></p>
    		</div>
		)
	}
}



			        //var name = uploadInstance.file.name;

			       // filePath += '/'+name;

			       // console.log("Filepath = " + filePath);




			        //fs.writeFileSync(filePath, file, 'binary');


		//var text = this.refs.resolution.value.trim();

/*
		 if (text) {
            Meteor.call('addResolution', text, (error, data)=> {
                if (error) {
                    Bert.alert('Please login before submitting', 'danger', 'fixed-top', 'fa-frown-o' );
                } else {
                    this.refs.resolution.value = "";
                }
            });         
        }
 */
