import { route } from 'quasar/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'
import routes from './routes'
import useAuthUser from '../composables/UseAuthUser'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? // eslint-disable-line
      createWebHistory
      : // eslint-disable-line
      createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    )
  })

  /* check if a user is logged into the application */
  Router.beforeEach(to => {
    // if it is a password recovery request, send it to the reset-password route
    if (
      to.hash.includes('type=recovery') && // requesting modification of something (password)
      to.name !== 'reset-password' // check if the route name is different from reset-password (not in the correct route yet)
    ) {
      console.log('parsing access token...')
      // const accessToken = to.hash.split('&')[0] // extract the access token from the url. The first parameter of the url, separated by &, is the access token
      // const token = accessToken.replace('#access_token=', '') // collect token only
      // return { name: 'reset-password', query: { token } } // send it to the reset-password route, adding the token to the query
    }

    const { isLoggedIn } = useAuthUser()
    if (
      !isLoggedIn() && // if not logged in
      to.meta.requiresAuth && // must be added to all routes that must be secure (validates the security of the route in the routes file [routes.js])
      !Object.keys(to.query).includes('fromEmail') // exclude if the route query includes 'fromEmail'
    ) {
      return { name: 'login' }
    }
  })

  return Router
})
