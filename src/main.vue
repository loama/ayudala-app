<template>
    <div>

        <div id="problem-choose">
          hola
        </div>

        <problemModal />

        <loginPage />

        <!--<onboarding />

        <loadingPage /> -->
      </div>
</template>
<script>
// Import Routes...
import routes from './routes.js'

import loadingPage from './components/loadingPage'
import onboarding from './components/onboarding'
import loginPage from './components/loginPage'
import problemModal from './components/problemModal'

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
