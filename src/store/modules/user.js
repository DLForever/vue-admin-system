import { loginByUsername, logout, getUserInfo } from '@/api/login'
import store from '@/store'

const user = {
	state: {
		roles: []
	},
	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_ROLES: (state, roles) => {
			state.roles = roles
		}
	},
	actions: {
		LoginByUsername({ commit }, userInfo) {
			const username = userInfo.username.trim()
			return new Promise((resolve, reject) => {
				loginByUsername(username, userInfo.password).then(response => {
					const data = response.data
					// commit('SET_TOKEN', data.token)
					if (username == 'admin') {
						console.log('admin in')
						const roletemp = ['admin']
						// commit('SET_ROLES', roletemp)
						console.log(store.getters.roles)
					} else {
						console.log('temp in')
						const roletemp = ['temp']
						// commit('SET_ROLES', roletemp)
						console.log(store.getters.roles)
					}
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},
		login2({ commit }) {
			const roletemp = ['admin']
			commit('SET_ROLES', roletemp)
		}
	}
}

export default user