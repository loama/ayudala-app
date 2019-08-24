<template>
    <div id="loadingPage">
      <div class="lds-dual-ring"></div>

      <span class="blue title"
            v-bind:class="{opaque: loggedIn}">ayuda.la</span>
      <span class="white title"
            v-bind:class="{opaque: loggedIn === false}">ayuda.la</span>
    </div>
</template>

<script>
import store from '../assets/vuex/storage.js'

export default {
    components: {
    },
    computed: {
      user () {
        return store.state.user
      }
    },
    methods: {
      animateToLogin () {

      },
      animateToHome () {

      }
    },
    data() {
      return {}
    },
    props: ['loggedIn'],
    watch: {
    	loggedIn: function(newVal, oldVal) { // watch it
        let loadingPage = document.getElementById('loadingPage')
        if (newVal === true) {
          loadingPage.style.opacity = '0'
        } else if (newVal === false) {
          loadingPage.style.opacity = '0'
        }
      }
    }
}
</script>

<style lang="sass" scoped>
  @import "../variables.sass"

  #loadingPage
    background: $blue
    height: 100vh
    left: 0
    position: fixed
    top: 0
    transition: all 0.3s
    width: 100vw

    .blue
      color: $blue

    .white
      color: #FFF

    .title
      font-size: 32px
      left: 0
      position: absolute
      text-align: center
      top: 40px
      transition: all 0.3s
      width: 100%

      &.opaque
        opacity: 1

    .lds-dual-ring
      display: inline-block
      height: 64px
      left: calc(50vw - 32px)
      position: absolute
      top: 200px
      width: 64px

    .lds-dual-ring:after
      content: " "
      display: block
      width: 46px
      height: 46px
      margin: 1px
      border-radius: 50%
      border: 5px solid #fff
      border-color: #fff transparent #fff transparent
      animation: lds-dual-ring 1.2s linear infinite

    @keyframes lds-dual-ring
      0%
        transform: rotate(0deg)
      100%
        transform: rotate(360deg)

</style>
