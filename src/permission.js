import router from './router'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, getCookie } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const roleName = getCookie('rolename')
      if (roleName === 'admin user') {
        // 管理员
        const stopRoute = ['/userBasicInfor', '/answerSheet']
        if (stopRoute.indexOf(to.path) !== -1) {
          errMsg('该用户暂无权限')
          next('/404')
        } else {
          next()
        }
      } else {
        // 普通用户
        const stopRoute = ['/', '/userGl', '/accountGl']
        if (stopRoute.indexOf(to.path) !== -1) {
          errMsg('该用户暂无权限')
          next('/404')
        } else {
          next()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

function errMsg(msg) {
  Message({
    message: msg,
    type: 'error',
    duration: 5 * 1000
  })
}
