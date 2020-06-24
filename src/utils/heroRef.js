import firebase from 'react-native-firebase';

/**
 * Return a firebase ref scoped by user and date.
 * Example: scopeRefByUserAndDate('Surveys') -> Surveys/fake@email/2019-01-01
 * @param {String} ref
 */
export function scopeRefByUserHero(ref) {
  const user = getScopedUser();
if(user !== null){
  const segments = ['initialSurvey', user];
  return segments.join('/');
}
}

/**
 * Get a scoped user from the current firebase user
 * Example: fakeemail@gmail.com -> fakeemail'@'gmail
 */
function getScopedUser() {
  const user = firebase.auth().currentUser;

  // if (!user) {
  //   Actions.newlogin({error: 'Something went wrong, please log back in.'});
  // }
if(user !== null){
  const [scopedUser] = user.email.split('.');
  return scopedUser;
}
}
