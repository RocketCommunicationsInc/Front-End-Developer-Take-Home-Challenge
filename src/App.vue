<template>
  <Header></Header>
    
  <Dashboard></Dashboard>
</template>

<script>
import Header from './components/Header.vue'
import Dashboard from './pages/Dashboard.vue'
 
export default {
  components: {Header, Dashboard},
  setup() {
    return {
    }
    
  },
}
</script>

<style scoped lang="scss">
</style>