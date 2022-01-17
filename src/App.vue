<template>
  <Header></Header>
    
  <Dashboard></Dashboard>
</template>

<script>
import { useStore } from 'vuex'
import Header from './components/Header.vue'
import Dashboard from './pages/Dashboard.vue'
 
export default {
  components: {Header, Dashboard},
  setup() {
    const store = useStore()
    store.commit('initializeMock')

    return {
      
    }
  },
}
</script>

<style scoped lang="scss">
</style>