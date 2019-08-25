<template>
    <div>
        <!-- <problemModal /> -->

        <loginPage v-if="loggedIn === false" />

        <!--<onboarding /> -->

        <loadingPage v-bind:loggedIn="loggedIn"/>

        <div class="view" v-bind:class="view">
          <div class="page account">
            <account />
          </div>

          <div class="page report">
            <report />
          </div>

          <div class="page settings">
            <settings />
          </div>
        </div>

        <div class="nav">
          <div class="nav-item"
              v-on:click="view = 'account'">
              <img class="icon"
                    src="./assets/images/user.svg">

              <img class="icon filled"
                    v-if="view === 'account'"
                    src="./assets/images/user-filled.svg">
          </div>

          <div class="nav-item"
              v-on:click="view = 'report'">
              <img class="icon"
                    src="./assets/images/radiation.svg">

              <img class="icon filled"
                    v-if="view === 'report'"
                    src="./assets/images/radiation-filled.svg">
          </div>

          <div class="nav-item"
              v-on:click="view = 'settings'">
              <img class="icon"
                    src="./assets/images/cog.svg">

              <img class="icon filled"
                    v-if="view === 'settings'"
                    src="./assets/images/cog-filled.svg">
          </div>
        </div>

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

import account from './components/account'
import report from './components/report'
import settings from './components/settings'

import * as firebase from "firebase/app"
import "firebase/auth"

export default {
    components: {
      account,
      report,
      settings,
      loadingPage: loadingPage,
      onboarding: onboarding,
      loginPage: loginPage,
      problemModal: problemModal
    },
    computed: {
      user () {
        return store.state.user
      }
    },
    data() {
      return {
        loggedIn: null,
        view: 'report'
      }
    },
    mounted () {
      var self = this
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
          self.loggedIn = true
        } else {
          // User is signed out.
          // ...
          store.dispatch('userLoggedOut')
          self.loggedIn = false
        }
      })
    }
}
</script>

<style lang="sass">
  @import "./variables.sass"

  @font-face
    font-family: 'GoogleSans'
    src: url('assets/fonts/GoogleSans-Regular.ttf')

  @font-face
    font-family: 'GoogleSans-Medium'
    src: url('assets/fonts/GoogleSans-Medium.ttf')

  @font-face
    font-family: 'GoogleSans-Bold'
    src: url('assets/fonts/GoogleSans-Bold.ttf')

  html, body
    font-family: 'GoogleSans'
    margin: 0

  .nav
    background: #FFF
    border-top: 1px solid $border
    bottom: 0
    height: 56px
    position: fixed
    right: 0
    width: 100vw

    .nav-item
      height: 56px
      display: inline-block
      position: relative
      vertical-align: top
      width: 32%

      img
        left: calc(16vw - 12px)
        position: absolute
        top: 16px
        width: 20px

  .view
    height: 100vh
    left: 0
    overflow-x: hidden
    position: fixed
    transform: translate3d(-100vw, 0, 0)
    transition: all 0.3s
    width: 300vw

    &.account
      transform: translate3d(0, 0, 0)

    &.report
      transform: translate3d(-100vw, 0, 0)

    &.settings
      transform: translate3d(-200vw, 0, 0)

    .page
      min-height: 100vh
      position: absolute
      width: 100vw

      &:nth-child(1)
        left: 0

      &:nth-child(2)
        left: 100vw

      &:nth-child(3)
        left: 200vw
</style>
