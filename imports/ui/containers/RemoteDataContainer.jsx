import RemoteData from '../../ui/pages/RemoteData.jsx';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


export default createContainer(({ params }) => {

  const loading = false;
  const getData = true;

  return {loading, getData};
}, RemoteData);


// export default composeWithTracker(composer, Loading)(Users);
















