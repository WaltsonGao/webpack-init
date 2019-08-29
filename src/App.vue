<template>
  <div id="app">
    <router-link to="/">首页</router-link>
    <router-link to="/about">关于</router-link>
      <router-view></router-view>
      {{this._store.state}}
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
    mounted() {
      // this._store.commit('setName');
        this._store.dispatch('setName');
    }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
