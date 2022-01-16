<template>
  <Header></Header>
    
  <div class="layout">
    <Dashboard></Dashboard>
  </div>
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
  .layout {
    display: flex;
    justify-content: space-between;
  }
</style>