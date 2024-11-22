// firebasePlugin.js
import app from './firebaseConfig';
import { getAuth } from 'firebase/auth';

export default {
  install(Vue) {
    Vue.prototype.$firebaseApp = app;
    Vue.prototype.$firebaseAuth = getAuth(app);
  }
};