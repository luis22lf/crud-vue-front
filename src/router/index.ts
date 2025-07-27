import { createRouter, createWebHistory } from 'vue-router'
import Cadastrar from '../views/Cadastrar.vue'
import Buscar from '../views/Buscar.vue'
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login, //o componente é a página de login
    },
    {
      path: '/cadastro',
      name: 'Cadastro',
      component: Cadastrar,//o componente é a página de cadastro
    },
   {
     path: '/busca',
     name: 'Buscar',
     component: Buscar,
   },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})


export default router
