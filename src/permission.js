import router from './router'
import store from './store'
import { Message } from 'element-ui'
// import { getToken } from '@/utils/auth'

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
	const role = localStorage.getItem('ms_username');
	// if(getToken()) {
	if(1) {
		if(to.path === '/login') {
			next()
		}else {
			if(!role) {
				next('/login')
			}
			console.log('store.getters.roles')
			console.log(store.getters.roles)
			if (store.getters.roles.length === 0) {
				store.dispatch('login2').then(res => {
					const roles = ['admin']
					console.log('hhhhh')
					console.log(store.getters.roles)
					store.dispatch('GenerateRoutes', { roles }).then(() => {
						router.addRoutes(store.getters.addRouters)
						next({ ...to, replace: true})
					})
				}).catch((err) => {
					store.dispatch('FedLogOut').then(() => {
						Message.error(err)
						next({ path: '/'})
					})
				})
			} else {
				next()
			}
			next()
		}
	} else {
		next()
		// if (whiteList.indexOf(to.path) !== -1) {
		// 	next()
		// } else {
		// 	next(`/login?redirect=${to.path}`)
		// }
	}
})