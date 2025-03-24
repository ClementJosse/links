import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import firebaseConfig from './firebaseConfig'
import { initializeApp } from "firebase/app";


initializeApp(firebaseConfig);

const app = createApp(App)
app.mount('#app')
