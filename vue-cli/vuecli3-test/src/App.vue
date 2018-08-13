<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/mine">我的</router-link> |
      <router-link to="/time">时间</router-link> |
      <router-link :to="{name:'time1', params: {name: 'xxx', age: 18} }">分针</router-link> |
      <router-link to="/time/time2">秒针</router-link> |
      <router-link to="/testUrl/555/zhangsan">URL传参</router-link> |
      <router-link to='/yy/66/ls'>重定向</router-link> |
      <router-link to='/timealias'>alias</router-link>
    </div>
    <transition name="fa">
      <router-view/>
    </transition>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.fa-enter {
  opacity: 0;
}
.fa-enter-active {
  transition: opacity 5s ease;
}
.fa-enter-to {
  opacity: 1;
}
.fa-leave {}
</style>
