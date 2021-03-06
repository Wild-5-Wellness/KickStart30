import firebase from 'react-native-firebase';
import {format} from 'date-fns';

/**
 * Return a firebase ref scoped by user and date.
 * Example: scopeRefByUserAndDate('Surveys') -> Surveys/fake@email/2019-01-01
 * @param {String} ref
 */
export function scopeRefByUserAndDate(ref,subType, date) {
  const user = getScopedUser();
  if(user !== null){

    const dateRef = date ? format(new Date(date), 'YYYY-MM-DD') : format(new Date(), 'YYYY-MM-DD');
  
    const segments = [ref, user, dateRef];
  
    if (subType) {
      segments.push(subType);
    }
  
    return segments.join('/');
  }
}

/**
 * Get a scoped user from the current firebase user
 * Example: fakeemail@gmail.com -> fakeemail@gmail
 */
export function getScopedUser() {
  const user = firebase.auth().currentUser;
  // if (!user) {
  //   Actions.newlogin({error: 'Something went wrong, please log back in.'});
  // }
if(user !== null){
  const [scopedUser] = user.email.split('.');
  return scopedUser;
}
}
