import { createApp } from 'vue';
import AppComponent from './app.vue';
import './tw.css';

const app = createApp(AppComponent);

// Plugins
app.use(vfmPlugin);
import { vfmPlugin } from 'vue-final-modal';

// Composants
import Loader from './components/loader.vue';
app.component('loader', Loader);

app.mount('#app');
