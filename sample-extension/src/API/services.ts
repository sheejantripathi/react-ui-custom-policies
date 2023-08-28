import axios from 'axios';

// const access_token = getUserToken();
// const AUTO_PASSWORD = 'T$mp2021';

export function getRoles(payload) {
	// payload.username = payload.username.toLowerCase();
	return new Promise((resolve, reject) => {
		axios.get(payload)
			.then(res => {
				// saveUserToken(res.data.accessToken);
				// saveUser(res.data.user);
				// saveUserRoles(res.data.user.roles);
				resolve(res.data.user);
			})
			.catch(err => {
				reject(err.response.data);
			});
	});
}