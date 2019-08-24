// Import Vue
import Vue from 'vue'

// Import fastClick
import FastClick from 'fastclick'

// Import App Custom Styles
// import AppStyles from './assets/sass/main.scss'

// Import App Component
import app from './main.vue'

// Import Vuex Storage
import store from './assets/vuex/storage.js'

import * as firebase from "firebase/app"

// Add the Firebase products that you want to use
// import "firebase/auth"
// import "firebase/firestore"

var firebaseConfig = {
  apiKey: "AIzaSyCGzSAUJXpkHiw2KbVbYbpD3HfpDKE2yGs",
  authDomain: "ayudala-da5a4.firebaseapp.com",
  databaseURL: "https://ayudala-da5a4.firebaseio.com",
  projectId: "ayudala-da5a4",
  storageBucket: "ayudala-da5a4.appspot.com",
  // messagingSenderId: "sender-id",
}

firebase.initializeApp(firebaseConfig)

// Init Vue App
export default new Vue({
  // Root Element
  el: '#app',
  store,
  render: c => c('app'),
  components: {
    app
  },
  mounted() {
    window.addEventListener('load', () => {
      // run after everything is in-place
      FastClick.attach(document.body)
    });
  }
});
