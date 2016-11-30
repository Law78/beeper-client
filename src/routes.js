import Vue from 'vue';
import VueRouter from 'vue-router';

import Auth from './components/auth/Auth';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dash from './components/dash/Dash';
import Newsfeed from './components/dash/Newsfeed';
import Profile from './components/dash/Profile';
import Settings from './components/dash/Settings';

// Notifico Vue che uso VueRouter registrando il plugin
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/auth',
      component: Auth,
      redirect: '/auth/login/:username',
      children: [
        {
          path: 'login',
          component: Login,
          meta: { requiresGuest: true }
        },
        {
          path: 'register',
          component: Register,
          meta: { requiresGuest: true }
        }
      ]
    },
    {
      path: '/',
      component: Dash,
      redirect: '/newsfeed',
      children: [
        {
          path: 'newsfeed',
          component: Newsfeed,
          meta: { requiresAuth: true }
        },
        {
          path: 'profile/:username',
          component: Profile
        },
        {
          path: '/settings',
          component: Settings,
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
});

// File da importare in main.js
export default router;