import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Signin from '../views/SigninView.vue'
import Singup from '../views/Singup.vue'
import AddSkill from '../views/AddSkill.vue'
import UpdateSkill from '../views/UpdateSkill.vue'
import SkillScrollPagination from '../views/SkillScrollPagination.vue'
import SkillDatabasePagination from '../views/SkillDatabasePagination.vue'
import StateManagment from '../views/StateManagment.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'signin',
      component: Signin
    },
    {
      path: '/register',
      name: 'signup',
      component: Singup
    },
    {
      path: '/home/:updateMessage?',
      name: 'home',
      component: HomeView
    },
    {
      path: '/add-skill',
      name: 'addSkill',
      component: AddSkill
    },
    {
      path: '/update-skill/:id',
      name: 'updateSkill',
      component: UpdateSkill
    },
    {
      path: '/skill-scroll-pagination',
      name: 'skillScrollpagination',
      component: SkillScrollPagination
    },
    {
      path: '/state-managment',
      name: 'StateManagment',
      component: StateManagment
    },
    {
      path: '/skill-database-pagination',
      name: 'skillDatabasePagination',
      component: SkillDatabasePagination
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
