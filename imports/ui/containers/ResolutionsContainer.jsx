import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
//import { Documents } from '../../api/documents/documents.js';
//import { DocumentsList } from '../components/documents-list.js';
import MainLayout from '../layouts/MainLayout.jsx';

import { Resolutions } from '../../api/resolutions.js';
import { Images } from '../../api/images.js';
import Index from '../../ui/pages/Index.jsx';



export default createContainer(() => {
  const resSub = Meteor.subscribe('userResolutions'); 
  const imgSub = Meteor.subscribe('allImages'); 
  const loading = !resSub.ready() || !imgSub.ready() ;
  //const loading = !resSub.ready();
  const myResolutions = Resolutions.find().fetch();
  const connected = Meteor.status().connected;

  return {myResolutions, loading, resSub, imgSub, connected };
}, Index);