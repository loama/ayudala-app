<template>
    <div id="settings">
      <div class="head">
        Configuración
      </div>

      <span class="title">Contactos</span>

      <div class="contacts">
        <div class="contact" v-for="contact in contacts">
          <span class="name">{{contact.name}}</span>
          <span class="phone">{{contact.phone}}</span>
        </div>
      </div>

      <div class="add" v-if="!addingContact" v-on:click="addingContact = true">
        <img src="../assets/images/plus.svg">
      </div>

      <form class="newContact" v-bind:class="{active: addingContact}" v-on:submit.prevent="createContact()">
        <span class="title">Añadir contacto</span>
        <div class="input" v-bind:class="{active: newContact.name !== ''}">
          <input type="text" v-model="newContact.name">
          <span class="placeholder">Nombre</span>
        </div>

        <div class="input" v-on:submit.prevent="createContact()" v-bind:class="{active: newContact.phone !== ''}">
          <input type="text" v-model="newContact.phone">
          <span class="placeholder">Teléfono</span>
          <div class="cancel" v-on:click="addingContact = false"> cancelar </div>
          <input type="submit" class="create-contact" value="añadir contacto">
        </div>
      </form>

      <div class="modal-overlay" v-bind:class="{active: addingContact}"></div>

    </div>
</template>

<script>
import store from '../assets/vuex/storage.js'

export default {
    components: {
    },
    computed: {
      contacts () {
        return store.state.contacts
      },
      user () {
        return store.state.user
      }
    },
    data() {
      return {
        addingContact: false,
        newContact: {
          name: '',
          phone: ''
        }
      }
    },
    methods: {
      createContact () {
        console.log(this.user.uid)
        let payload = {
          id: this.user.uid, // user
          name: this.newContact.name,
          phone: this.newContact.phone
        }
        store.dispatch('addContact', payload)

        this.newContact.name = ''
        this.newContact.phone = ''

        this.addingContact = false
      }
    }
}
</script>

<style lang="sass" scoped>
  @import "../variables.sass"

  #settings
    .head
      background: $blue
      border-radius: 0 0 100px 0
      color: #FFF
      font-size: 24px
      height: 40px
      padding: 80px 16px
      width: calc(100vw - 32px)

    .title
      color: #999
      display: block
      margin-top: 8px
      padding: 8px

    .add
      background: $blue
      border-radius: 50%
      height: 56px
      margin: 16px auto
      width: 56px

      img
        height: 24px
        margin: 16px
        width: 24px

    form
      background: #FFF
      border-radius: 24px 24px 0 0
      bottom: -200px
      left: 0
      margin: 0
      padding: 8px
      position: absolute
      transition: all 0.3s
      width: calc(100vw - 16px)
      z-index: 1

      &.active
        transform: translate3d(0, -256px, 0)

      .input
        position: relative
        margin: 8px auto
        width: 240px

        .placeholder
          color: #888
          left: 20px
          pointer-events: none
          position: absolute
          top: 16px
          transition: all 0.3s

        &.active
          .placeholder
            transform: scale3d(.75, .75, 1) translate3d(0, -16px, 0)
            transform-origin: top left

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

        &:focus + .placeholder
          transform: scale3d(.75, .75, 1) translate3d(0, -16px, 0)
          transform-origin: top left

        &[type="submit"]
          background: $blue
          display: inline-block
          color: #FFF
          height: 56px
          width: 156px

    .contacts
      .contact
        border: 1px solid $border
        height: 56px
        margin-bottom: -1px

        .name
          display: block
          font-family: 'GoogleSans-Medium'
          font-size: 20px
          margin: 8px 8px 0 8px

        .phone
          margin: 0 8px

    .cancel
      display: inline-block
      text-align: center
      width: 80px

    .modal-overlay
      background: #212121
      display: none
      height: 100vh
      left: 0
      opacity: 0.9
      position: absolute
      top: 0
      width: 100vw

      &.active
        display: block
</style>
