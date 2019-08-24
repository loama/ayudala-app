<template>
    <div id="loadingPage">
      <div class="lds-dual-ring"></div>
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

  #loadingPage
    background: $blue
    height: 100vh
    left: 0
    position: fixed
    top: 0
    width: 100vw

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
