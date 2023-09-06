import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

// Not sure if I need JavaScript of BS.
// import 'bootstrap';

import './assets/main.css';
import 'ol/ol.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);

app.use(createPinia());

app.mount('#app');
