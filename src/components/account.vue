<template>
    <div id="account">
      <div class="head">
        <div class="name">Lucas Galván</div>
        <div class="profile-pic">
          <div class="img"></div>
        </div>
      </div>

      <div class="card">

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

  #account
    padding-top: 148px
    .head
      background: $blue
      height: 140px
      left: 0
      padding-top: 56px
      position: fixed
      top: 0
      width: 100vw

      .name
        color: #FFF
        display: inline-block
        font-family: 'GoogleSans-Medium'
        font-size: 28px
        line-height: 56px
        padding-left: 32px
        vertical-align: top
        width: calc(70% - 32px)

      .profile-pic
        display: inline-block
        width: 29%

        .img
          background: gray
          border-radius: 50%
          height: 72px
          width: 72px

    .card
      background: #FFF
      border-radius: 12px
      box-shadow: 0 1px 3px #CCC
      min-height: 200px
      margin: 8px 24px
      position: relative
      width: calc(100% - 48px)
      z-index: 1
</style>
