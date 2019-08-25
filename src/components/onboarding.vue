<template>
    <div id="onboarding" v-if="!close">
      <div class="carousel">
        <div class="slide"></div>
        <div class="slide"></div>
        <div class="slide"></div>
      </div>

      <div class="text">
        <div class="indicator">
          <div v-for="index, slide in totalSlides"
               class="dot"
               v-bind:class="{active: index === currentSlide}"></div>
        </div>

        <div class="button" v-on:click="nextSlide()">
          <span v-if="currentSlide < totalSlides">Siguiente</span>
          <span v-if="currentSlide === totalSlides">Terminar</span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
      return {
        close: false,
        currentSlide: 1,
        totalSlides: 3
      }
    },
    methods: {
      nextSlide () {
        if (this.currentSlide < this.totalSlides) {
          this.currentSlide = this.currentSlide + 1

          switch (this.currentSlide) {
            case 1:

              break

            case 2:
              /* request sms permissions
              var success = function (hasPermission) {
                  if (!hasPermission) {
                      sms.requestPermission(function() {
                          alert('[OK] Permission accepted')
                      }, function(error) {
                          alert(error)
                          alert('[WARN] Permission not accepted')
                          // Handle permission not accepted
                      })
                  }
              };
              var error = function (e) { alert('Something went wrong:' + e); };
              */
              // sms.hasPermission(success, error);

              break

            case 3:
              break
          }
        } else {
          this.close = true
        }
      }
    }
}
</script>

<style lang="sass" scoped>
  @import "../variables.sass"

  #onboarding
    background: red
    height: 100vh
    left: 0
    position: fixed
    top: 0
    width: 100vw
    z-index: 500

    .text
      background: #FFF
      bottom: 0
      height: 200px
      left: 0
      position: absolute
      width: 100vw

      .button
        background: $blue
        border-radius: 4px
        color: #FFF
        height: 56px
        line-height: 56px
        position: absolute
        text-align: center
        top: 132px
        right: 16px
        width: 120px

    .indicator
      bottom: 24px
      left: 16px
      position: absolute

      .dot
        background: #D0D0D0
        border-radius: 50%
        display: inline-block
        height: 12px
        margin: 4px
        transition: all 0.3s
        width: 12px

        &.active
          background: #333
</style>
