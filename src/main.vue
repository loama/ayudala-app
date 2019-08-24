<template>
    <div>

        <div id="problem-choose">
          hola
        </div>

        <problemModal />

        <loginPage />

        <!--<onboarding /> -->

        <loadingPage />
      </div>
</template>
<script>
// Import Routes...
import routes from './routes.js'
import store from './assets/vuex/storage.js'

import loadingPage from './components/loadingPage'
import onboarding from './components/onboarding'
import loginPage from './components/loginPage'
import problemModal from './components/problemModal'

import * as firebase from "firebase/app"
import "firebase/auth"

export default {
    components: {
      loadingPage: loadingPage,
      onboarding: onboarding,
      loginPage: loginPage,
      problemModal: problemModal
    },
    data() {
      return {
      }
    },
    mounted () {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function() {
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          // ...
          // New sign-in will be persisted with session persistence.
          // return firebase.auth().signInWithEmailAndPassword(email, password)
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
        })

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName
          var email = user.email
          var emailVerified = user.emailVerified
          var photoURL = user.photoURL
          var isAnonymous = user.isAnonymous
          var uid = user.uid
          var providerData = user.providerData
          // ...
          store.dispatch('userLogged', user)
        } else {
          // User is signed out.
          // ...
        }
      })
    }
}
</script>

<style lang="sass">

  @font-face
    font-family: 'GoogleSans'
    src: url('assets/fonts/GoogleSans-Regular.ttf')

  @font-face
    font-family: 'GoogleSans-Bold'
    src: url('assets/fonts/GoogleSans-Bold.ttf')

  html, body
    font-family: 'GoogleSans'

</style>
