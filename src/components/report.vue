<template>
  <div id="report">
    <div class="head">
      <span>Alerta sobre un problema</span>
    </div>

    <div class="card accident" v-on:click="openModal('peligro')"></div>
    <div class="card danger" v-on:click="openModal('accidente')"></div>

    <div class="modal" v-bind:class="modalPosition">

      <div class="confirmation" v-if="modalPosition === 'confirm'">
        <span class="title"> ¿Quieres confirmar que tienes un problema?</span>
        <div v-on:click="closeModal()" class="cancel"> cancelar </div>
        <div v-on:click="confirmProblem()" class="confirm"> Confirmar </div>
      </div>

      <div class="full" v-if="modalPosition === 'full'">
        <div class="head">
          head
        </div>

        <div class="messages">
          <div class="message" v-for="message in conversation" v-bind:class="message.sender">
            <div class="text">
              {{message.value}}
            </div>
          </div>
        </div>

        <div class="send">
          <input type="text" v-model="message.text">
          <div class="button" v-bind:class="{active: canSendMessage}" v-on:click="sendMessage()">
            <div class="seeableButton">
              <img src="../assets/images/paper-plane.svg">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-overlay" id="modal-overlay"></div>
  </div>
</template>

<script>
import store from '../assets/vuex/storage.js'

import axios from 'axios'

export default {
    components: {
    },
    computed: {
      canSendMessage () {
        if (this.message.text !== '') {
          return true
        } else {
          return false
        }
      },
      conversation () {
        let conversation = store.state.conversation
        if (conversation !== null) {
          conversation.sort(function(a, b){return a.timestamp - b.timestamp})
        }

        return conversation
      }
    },
    data() {
      return {
        modalPosition: 'closed',
        situation: null,
        message: {
          text: ''
        }
      }
    },
    methods: {
      closeModal () {
        this.situation = null

        this.modalPosition = 'closed'
        let modalOverlay = document.getElementById('modal-overlay')
        modalOverlay.style.opacity = '0'
        setTimeout(() => {
          modalOverlay.style.display = 'none'
        }, 400)
      },
      openModal (situation) {
        this.situation = situation

        this.modalPosition = 'confirm'
        let modalOverlay = document.getElementById('modal-overlay')
        modalOverlay.style.display = 'block'
        setTimeout(() => {
          modalOverlay.style.opacity = '0.9'
        }, 100)
      },
      confirmProblem () {
        this.modalPosition = 'full'
        axios.post('https://ayudala.herokuapp.com/sms', {
          Body: {
            id: 'abc',
            lat: '19',
            lng: '80',
            type: 'peligro'
          }
        })
        .then(function (response) {
          console.log(response)
          console.log('axios')

          store.dispatch('conversation', 'yasVrXvf0vRXHWgjhhch')

        })
        .catch(function (error) {
          console.log(error)
        })
        /* store.dispatch('addData', {
          collection: 'alertas',
          data: {
            a: 'b'
          }
        })*/
      },
      sendMessage () {
        var self = this
        store.dispatch('sendMessage', {
          id: 'yasVrXvf0vRXHWgjhhch',
          value: self.message.text
        })
        this.message.text = ''
      }
    }
}
</script>

<style lang="sass" scoped>
  @import "../variables.sass"

  #report
    padding-top: 220px
    overflow-y: hidden

    >.head
      background: $blue
      color: #FFF
      height: 140px
      font-size: 24px
      left: 0
      padding-left: 32px
      padding-top: 56px
      position: absolute
      top: 0
      width: calc(100vw - 32px)

    .card
      background: #FFF
      border-radius: 12px
      box-shadow: 0 1px 3px #AAA
      height: 104px
      margin: 32px auto
      width: 104px

    .modal
      background: #FFF
      height: calc(90vh - 80px)
      position: absolute
      top: 100vh
      transition: all 0.3s
      width: 100vw
      z-index: 20

      &.confirm
        transform: translate3d(0, -200px, 0)

      &.full
        padding-top: 80px
        transform: translate3d(0, -90vh, 0)

        .head
          border-bottom: 1px solid $border
          height: 80px
          left: 0
          position: fixed
          top: 0
          width: 100vw

        .messages
          max-height: calc(90vh - 194px)
          overflow-y: scroll

        .message
          margin: 8px
          padding: 20px 0
          position: relative
          text-align: left

          .text
            background: #FFF
            border: 1px solid $border
            border-radius: 8px
            left: 0
            margin: 8px
            max-width: 200px
            padding: 8px
            position: absolute
            top: 0

          &.original
            .text
              background: $blue
              color: #FFF
              left: unset
              right: 0
              text-align: right

        .send
          background: #F0F0F0
          bottom: 56px
          height: 56px
          left: 0
          position: fixed
          width: 100vw

          input
            border: 1px solid $border
            border-radius: 20px
            font-size: 14px
            height: 40px
            margin: 8px
            outline: none
            padding: 0 8px
            width: calc(100vw - 80px)

          .button
            bottom: 0
            height: 56px
            opacity: 0.5
            position: absolute
            pointer-events: none
            right: 0
            transition: all 0.3
            width: 56px

            &.active
              opacity: 1
              pointer-events: all

            .seeableButton
              background: $blue
              border-radius: 50%
              height: 40px
              margin: 8px
              transition: all 0.3s
              width: 40px

              img
                height: 20px
                margin: 8px

      .title
        display: block
        font-size: 18px
        margin-bottom: 12px
        padding: 8px
        text-align: center

      .confirm
        background: $blue
        border-radius: 12px
        color: #FFF
        display: inline-block
        height: 56px
        line-height: 56px
        text-align: center
        width: 49%

      .cancel
        color: #F90
        display: inline-block
        height: 56px
        text-align: center
        width: 49%

    .modal-overlay
      background: #212121
      display: none
      height: 100vh
      left: 0
      opacity: 0
      position: absolute
      top: 0
      transition: all 0.3s
      width: 100vw
      z-index: 19
</style>
