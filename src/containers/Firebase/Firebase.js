import firebase from 'firebase';
import { firebaseConfig } from '../../Constants';

firebase.initializeApp(firebaseConfig);
export default firebase;