<template>
    <div id="loginPage" v-bind:class="view">
      <div class="header">
        <span class="logo">ayuda.la</span>
      </div>

      <div v-on:click="changeView()" class="change_view">
        <div> login </div>
        <div> crear cuenta </div>
        <div class="indicator" v-bind:class="view">
          <span v-if="view === 'login'"> login </span>
          <span v-if="view === 'create_user'"> crear cuenta </span>
        </div>
      </div>

      <form v-on:submit.prevent="loginUser()" class="login">

        <div class="input"
             v-bind:class="{active: loginEmailActive}">
          <input type="email"
                v-model="login.email.value">

          <span class="placeholder">email</span>
        </div>

        <div class="input"
             v-bind:class="{active: loginPasswordActive}">
          <input type="password"
                v-model="login.password.value">
          <span class="placeholder">password</span>
        </div>

        <input type="submit" value="Iniciar Sesión">
      </form>

      <form v-on:submit.prevent="createUser()" class="create_user">
        <div class="input"
            v-bind:class="{active: createUserNameActive}">
          <input type="text"
                v-model="create_user.name.value">
          <span class="placeholder">Nombre</span>
        </div>

        <div class="input"
            v-bind:class="{active: createUserEmailActive}">
          <input type="email"
                v-model="create_user.email.value">
          <span class="placeholder">email</span>
        </div>

        <div class="input"
            v-bind:class="{active: createUserPasswordActive}">
          <input type="password"
                v-model="create_user.password.value">
          <span class="placeholder">contraseña</span>
        </div>

        <div class="input"
            v-bind:class="{active: createUserSecondPasswordActive}">
          <input type="password"
                v-model="create_user.secondPassword.value">
          <span class="placeholder">confirma contraseña</span>
        </div>

        <input type="submit" value="Crear Cuenta">

        <div v-on:click="add()">añadir</div>
      </form>

    </div>
</template>

<script>
import store from '../assets/vuex/storage.js'

import * as firebase from "firebase/app"
import "firebase/auth"

export default {
    components: {
    },
    computed: {
      loginEmailActive () {
        if (this.login.email.value !== '') {
          return true
        } else {
          return false
        }
      },
      loginPasswordActive () {
        if (this.login.password.value !== '') {
          return true
        } else {
          return false
        }
      },
      createUserNameActive () {
        if (this.create_user.name.value !== '') {
          return true
        } else {
          return false
        }
      },
      createUserEmailActive () {
        if (this.create_user.email.value !== '') {
          return true
        } else {
          return false
        }
      },
      createUserPasswordActive () {
        if (this.create_user.password.value !== '') {
          return true
        } else {
          return false
        }
      },
      createUserSecondPasswordActive () {
        if (this.create_user.secondPassword.value !== '') {
          return true
        } else {
          return false
        }
      },
      user () {
        return store.state.user
      }
    },
    data() {
      return {
        login: {
          email: {
            value: ''
          },
          password: {
            value: ''
          }
        },
        create_user: {
          name: {
            value: ''
          },
          email: {
            value: ''
          },
          password: {
            value: ''
          },
          secondPassword: {
            value: ''
          }
        },
        view: 'login' // 'create_user'
      }
    },
    methods: {
      changeView () {
        if (this.view === 'login') {
          this.view = 'create_user'
        } else {
          this.view = 'login'
        }
      },
      createUser () {
        let email = this.create_user.email.value
        let password = this.create_user.password.value
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          var errorCode = error.code
          var errorMessage = error.message
          alert(error)
          console.log(error)
        })
      },
      loginUser () {
        let email = this.login.email.value
        let password = this.login.password.value
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          // ...
          alert(errorMessage)
        })
      },
      add () {
        store.dispatch('addData', {})
      }
    }
}
</script>

<style lang="sass" scoped>
  @import "../variables.sass"

  #loginPage
    background: #FFF
    height: 100vh
    left: 0
    padding: 420px 0
    position: fixed
    top: 0
    width: 100vw

    .header
      background: $blue
      height: 200px
      left: 0
      position: absolute
      top: 0
      width: 100vw

      .logo
        color: #FFF
        display: block
        font-family: 'GoogleSans-Bold'
        font-size: 32px
        margin: 40px auto
        text-align: center

    .change_view
      height: 44px
      position: absolute
      top: 156px
      width: 100vw

      div
        color: #FFF
        display: inline-block
        line-height: 48px
        position: relative
        text-align: center
        width: 49%

      .indicator
        background: #FFF
        border-radius: 4px 4px 0 0
        color: $blue
        height: 48px
        position: absolute
        top: 0
        left: 0
        transition: all 0.3s
        width: 50%

        &.create_user
          transform: translate3d(50vw, 0, 0)

    form.login
      background: #FFF
      left: calc(50vw - 140px)
      margin: 0 auto
      padding: 8px
      position: absolute
      top: 220px
      transition: all 0.3s
      width: 280px
      z-index: 1

      .input
        position: relative

        .placeholder
          color: #888
          left: 20px
          pointer-events: none
          position: absolute
          top: 16px
          transition: all 0.3s

    form.create_user
      left: calc(150vw - 140px)
      margin: 0 auto
      padding: 8px
      position: absolute
      top: 220px
      transition: all 0.3s
      width: 280px
      z-index: 1

      .input
        position: relative

        .placeholder
          color: #888
          left: 20px
          pointer-events: none
          position: absolute
          top: 16px
          transition: all 0.3s

    input
      border: 1px solid #F0F0F0
      border-radius: 4px
      display: block
      font-size: 16px
      margin: 8px auto
      height: 32px
      outline: none
      padding: 8px
      width: 240px

      &[type="submit"]
        background: orange
        color: #FFF
        font-size: 16px
        height: 48px
        margin-top: 24px
        width: 258px

    &.create_user
      form.login, form.create_user
        transform: translate3d(-100vw, 0, 0)

    .input.active
      .placeholder
        transform: scale3d(.75, .75, 1) translate3d(0, -16px, 0)
        transform-origin: top left

    input:focus + .placeholder
      transform: scale3d(.75, .75, 1) translate3d(0, -16px, 0)
      transform-origin: top left


</style>
