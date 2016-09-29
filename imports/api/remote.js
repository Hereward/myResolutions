import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import axios from 'axios';
import { Images } from './images.js';
import { Resolutions } from './resolutions.js';

const DataURL = 'http://jsonplaceholder.typicode.com/posts/1';

const callService = (type, url, options) => new Promise((resolve, reject) => {
  HTTP.call(type, url, options, (error, result) => {
    if (error) {
      reject(error);
    } else {
      resolve(result);
    }
  });
});

Meteor.methods({
  getRemoteUsers() {
    return callService(
      'GET',
      DataURL
      ).then((result) => result).catch((error) => {
        throw new Meteor.Error('500', `${error.message}`);
      });
    },
    getImage(resolution, myUrl) {

      let url = myUrl || 'http://www.truthnews.com.au/storage/images/Cox_Roberts_ABC.jpg';
      console.log("Fetching image from: "+url);

      axios({
        method: 'get',
        url: url,
        responseType: 'arraybuffer'
      }).then(function (response) {
      // var file = fs.createWriteStream( process.env.PWD + fileName );
        //console.log(response);

        Images.write(response.data, {
          fileName: 'sample.png',
          type: 'image/png'
        }, function (error, fileRef) {
          if (error) {
            throw error;
          } else {
            console.log(fileRef.name + ' is successfully saved to FS. _id: ' + fileRef._id);

            //check(resolution, Object);
            
            Resolutions.update(resolution._id, {
              $set: {image_id: fileRef._id}
            }); 
            //Meteor.call('updateResolutionImage', resolution, fileRef._id);
          }
        });

      })
      .catch(function (error) {
        console.log(error);
      });

    }
  });

// http://jsonplaceholder.typicode.com/posts/1
//http://jsonplaceholder.typicode.com/users


