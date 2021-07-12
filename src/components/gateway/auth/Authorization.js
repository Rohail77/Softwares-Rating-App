import { auth } from '../../../config/database_config';
import { user } from '../../../database/User';

export class Authorization {
  signout() {
    auth.signOut();
  }

  isEmailVerified() {
    return auth.currentUser.emailVerified;
  }

  isSignedin() {
    return auth.currentUser;
  }

  getEmail() {
    return auth.currentUser.email;
  }

  signup({ email, password }, cb) {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        sendVerificationEmail(cb);
      })
      .catch(error => {
        cb({ msg: error.message });
      });

    function sendVerificationEmail(cb) {
      auth.currentUser
        .sendEmailVerification()
        .then(() => {
          cb(null);
        })
        .catch(error => {
          cb({ msg: error.message });
        });
    }
  }

  signin({ email, password }, cb) {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        if (this.isEmailVerified()) cb();
        else {
          cb({
            msg: `You have not verified your email. Please verify your email by clicking the link we emailed you at your provided email address (${email}).`,
          });
        }
      })
      .catch(error => {
        cb({ msg: error.message });
      });
  }

  onLoginDetection(cb) {
    this.handleLoginDetection = cb;
  }

  setAuthorizationStateObserver() {
    auth.onAuthStateChanged(aUser => {
      if (aUser) {
        console.log('user signed in');
        this.handleLoginDetection(true);
        user.setUser();
      } else {
        this.handleLoginDetection(false);
        console.log('user signed out');
      }
    });
  }
}

export const authorization = new Authorization();
authorization.setAuthorizationStateObserver();
