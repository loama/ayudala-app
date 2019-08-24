import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import * as firebase from "firebase/app"
import "firebase/firestore"

var firebaseConfig = {
  apiKey: "AIzaSyCGzSAUJXpkHiw2KbVbYbpD3HfpDKE2yGs",
  authDomain: "ayudala-da5a4.firebaseapp.com",
  databaseURL: "https://ayudala-da5a4.firebaseio.com",
  projectId: "ayudala-da5a4",
  storageBucket: "ayudala-da5a4.appspot.com",
  // messagingSenderId: "sender-id",
}

firebase.initializeApp(firebaseConfig)

let db = firebase.firestore()

export default new Vuex.Store({
  state: {
    user: null
  },
  actions: {
    addData (context, payload) {
      console.log('abc')
      db.collection("mensajes").add({
          first: "Ada",
          last: "Lovelace",
          born: 1815
      })
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      })
    },
    userLogged (context, user) {
      context.state.user = user
      console.log(user)
    }
  },

  mutations: {
    USER_LOGGED (state, user) {
      state.user = user
    }
  },
});
