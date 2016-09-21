import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
//import { Documents } from '../../api/documents/documents.js';
//import { DocumentsList } from '../components/documents-list.js';
import MainLayout from '../layouts/MainLayout.jsx';

import { Resolutions } from '../../api/resolutions.js';
import { Images } from '../../api/images.js';
import ResolutionDetail from '../../ui/pages/ResolutionDetail.jsx';



export default createContainer(({ params }) => {
  const resSub = Meteor.subscribe('userResolutions'); 
  const imgSub = Meteor.subscribe('allImages'); 
  const loading = !resSub.ready() || !imgSub.ready() ;
  //const loading = !resSub.ready();
  const Resolution = Resolutions.findOne(params.id);
  let myImages = '';
  //const Image = Images.findOne({ _id: Resolution.image_id });
  if (Resolution) {
  	myImages = Images.find({ _id: Resolution.image_id }).fetch();
  }
   
			
  console.log(Resolution);
  console.log(Image);

  const connected = Meteor.status().connected;

  return {Images, Resolution, myImages, loading, resSub, imgSub, connected };
}, ResolutionDetail);