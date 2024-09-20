<template>
  <div id="app">
    <GreetingCard name="Alice"  message = "Welcome Vue.js"/>
  </div>
</template>

<script>
import GreetingCard from './components/GreetingCard.vue';
export default {
  components: {
    GreetingCard 
  }
};
</script>
