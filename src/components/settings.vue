<template>
    <div id="settings">
      <div class="head">
        Configuración
      </div>

      <span class="title">Contactos</span>

      <div class="contacts">
      </div>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
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

</style>
