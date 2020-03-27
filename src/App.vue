<template>
  <div id="app">
    {{this.$store.state.age}}
    {{this.$store.getters.getAge}}
    <br>
    <button @click="add">加号</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <button @click="minus">减号</button>
  </div>
</template>
<script>
export default {
  mounted() {
    // setTimeout(() => {
    //   this.$store.state.age = 100;
    // }, 1000);
  },
  methods: {
    add() {
      this.$store.commit('add', 10);
    },
    minus() {
      this.$store.dispatch('minus', 1);
    }
  }
}
</script>

