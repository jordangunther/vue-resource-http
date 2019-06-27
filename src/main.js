import Vue from 'vue'
import VueResource from 'vue-resource';
import App from './App.vue'

Vue.use(VueResource);

// only put $ before http if accessing inside the vue instance
Vue.http.options.root = 'https://vue-http-ef8cd.firebaseio.com/';
Vue.http.interceptors.push((request, next) => {
  console.log(request);
  if (request.method == 'POST') {
    request.method = 'PUT';
  }
  next( response => {
    response.json = () => { return { messages: response.body } } //intercept the json response and change it. Typically you don't do this for production but it is possible
  });
});

new Vue({
  el: '#app',
  render: h => h(App)
})
