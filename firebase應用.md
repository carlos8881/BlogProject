npm
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApCGitlToCu3oi_Owoi2cUqjpH1BPIEfY",
  authDomain: "carlosblogcomment.firebaseapp.com",
  projectId: "carlosblogcomment",
  storageBucket: "carlosblogcomment.appspot.com",
  messagingSenderId: "445901511837",
  appId: "1:445901511837:web:c8eb760e3219f6e2dbc874",
  measurementId: "G-N0RFZX5X8C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

Script
<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyApCGitlToCu3oi_Owoi2cUqjpH1BPIEfY",
    authDomain: "carlosblogcomment.firebaseapp.com",
    projectId: "carlosblogcomment",
    storageBucket: "carlosblogcomment.appspot.com",
    messagingSenderId: "445901511837",
    appId: "1:445901511837:web:c8eb760e3219f6e2dbc874",
    measurementId: "G-N0RFZX5X8C"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>