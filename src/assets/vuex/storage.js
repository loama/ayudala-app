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

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

export default new Vuex.Store({
  state: {
    user: null,
    userSecond: {},
    contacts: {},
    conversation: null
  },
  actions: {
    addData (context, payload) {
      console.log('abc')
      db.collection(payload.collection).add(
        payload.data
      )
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      })
    },
    addUser (context, payload) {
      console.log('abc')
      db.collection(payload.collection).doc(payload.data.id).set(
        payload.data
      )
      .then(function(docRef) {
        console.log("User written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      })
    },
    sendMessage (context, payload) {
      console.log(payload)
      let id = makeid(15)

      db.collection("mensajes").doc(payload.id).update({
        [id]: {
          sender: 'original',
          value: payload.value,
          timestamp: Math.floor(Date.now() / 1000)
        }
      })
    },
    addLocation (context, payload) {
      console.log(payload)
      let id = makeid(15)

      db.collection("ubicaciones").doc(payload.id).set({
        [id]: {
          lat: payload.location.latitude,
          lng: payload.location.longitude,
          timestamp: Math.floor(Date.now() / 1000)
        }
      })
    },
    addContact (context, payload) {
      console.log(payload)
      let id = makeid(15)

      db.collection("contactos").doc(payload.id).update({
        [id]: {
          name: payload.name,
          phone: payload.phone,
          timestamp: Math.floor(Date.now() / 1000)
        }
      })
    },
    userLogged (context, user) {
      context.state.user = user
      console.log(user.uid)
      db.collection("usuarios").doc(user.uid)
        .onSnapshot(function(doc) {
          console.log(doc.data())
          console.log('abc')
          context.state.userSecond = doc.data()
        })

      db.collection("contactos").doc(user.uid)
        .onSnapshot(function(doc) {
          console.log(doc.data())
          console.log('contacts')
          context.state.contacts = doc.data()
        })
    },
    userLoggedOut (context) {
      context.state.user = {}
      console.log('logged out')
    },
    conversation (context, payload) {
      db.collection("mensajes").doc(payload)
        .onSnapshot(function(doc) {
          let conversation = []
          console.log(doc.data())
          for (var message in doc.data()) {
            conversation.push(doc.data()[message])
          }

          conversation.sort(function(a, b){return a.timestamp - b.timestamp})

          context.state.conversation = conversation
        })
    }
  },

  mutations: {
    USER_LOGGED (state, user) {
      state.user = user
    }
  },
});
