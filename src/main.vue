<template>
    <div>
        <loadingPage />
        <onboarding />
        <loginPage />
        <div id="problem-choose">
          hola
        </div>
        <problemModal />

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
