// firebasePlugin.js
import app from './firebaseConfig';
import { getAuth } from 'firebase/auth';

export default {
  install(Vue) {
    Vue.prototype.$firebaseApp = app;
    Vue.prototype.$firebaseAuth = getAuth(app);
    // 你可以在这里添加更多 Firebase 服务，如 Firestore, Storage 等
  }
};