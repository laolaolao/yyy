import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;
import '@/assets/css/reset.css';
import '@/assets/js/rem.js';
import '@/assets/img/timg.gif'
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
