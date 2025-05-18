import { useAuthStore } from '@/stores/auth'
import { useUIStore } from '@/stores/ui'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/WelcomePage.vue'),
      name: 'welcomePage',
      meta: {},
    },
    {
      path: '/login',
      component: () => import('@/pages/auth/LoginPage.vue'),
      name: 'loginPage',
      meta: {
        guest: true,
        title: 'Log in',
      },
    },
    {
      path: '/register',
      component: () => import('@/pages/auth/RegisterPage.vue'),
      name: 'registerPage',
      meta: { guest: true },
    },
    {
      path: '/dashboard',
      component: () => import('@/pages/DashboardPage.vue'),
      name: 'dashboardPage',
      meta: { auth: true, roles: ['admin'] },
    },
    {
      path: '/user/dashboard',
      component: () => import('@/pages/user/Dashboard.vue'),
      name: 'dashboardUser',
      meta: { auth: true, roles: ['user'] },
    },
    {
      path: '/room',
      component: () => import('@/pages/master/room/Index.vue'),
      name: 'room.index',
      meta: { auth: true, roles: ['admin'] },
    },
    {
      path: '/booking',
      component: () => import('@/pages/master/booking/Index.vue'),
      name: 'booking.index',
      meta: { auth: true, roles: ['admin'] },
    },
    {
      path: '/page-not-found',
      name: 'page-not-found',
      component: () => import('@/components/NotFoundPage.vue'),
    },
  ],
})

// Loading
router.beforeEach((to, from, next) => {
  const ui = useUIStore()
  ui.startLoading()
  next()
})
router.afterEach(() => {
  const ui = useUIStore()
  setTimeout(() => ui.stopLoading(), 500)
})

// Auth Middleware
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('jwt_token')
  const isLoggedIn = !!token

  if (to.matched.some((record) => record.meta.auth)) {
    if (!isLoggedIn) {
      return next({ name: 'loginPage' })
    }

    try {
      const authStore = useAuthStore()
      const data = authStore.decryptedUserData

      if (!data) {
        localStorage.removeItem('jwt_token')
        localStorage.removeItem('userData')
        return next({ name: 'loginPage' })
      }

      const userRole = data.role
      const requiredRoles = to.meta.roles

      if (requiredRoles && !requiredRoles.includes(userRole)) {
        console.log('Akses ditolak: role tidak sesuai')
        return next({ name: 'welcomePage' })
      }

      return next()
    } catch (err) {
      console.error('Terjadi error saat ambil data user:', err)
      return next({ name: 'loginPage' })
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (isLoggedIn) {
      const authStore = useAuthStore()
      const data = authStore.decryptedUserData
      if (!data) {
        localStorage.removeItem('jwt_token')
        localStorage.removeItem('userData')
        return next()
      }
      return next({ name: 'dashboardPage' })
    }
    return next()
  } else {
    return next()
  }
})

const APP_NAME = import.meta.env.VITE_APP_NAME
router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title)

  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags)

  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title + ' - ' + APP_NAME
  } else {
    document.title = APP_NAME
  }

  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map((el) =>
    el.parentNode.removeChild(el),
  )

  if (!nearestWithMeta) return next()

  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement('meta')

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key])
      })

      tag.setAttribute('data-vue-router-controlled', '')

      return tag
    })

    .forEach((tag) => document.head.appendChild(tag))

  next()
})

export default router
