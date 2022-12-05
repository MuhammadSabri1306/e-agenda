
export const login = (username, password) => {
	if(username !== "admin@gmail.com" || password !== "qwerty") {
		return {
			success: false,
			data: null
		};
	}

	return {
		success: true,
		data: {
			username: "user123",
			name: "Kurt Cobain",
			role: "admin",
			token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxMjMiLCJuYW1lIjoiS3VydCBDb2JhaW4iLCJyb2xlIjoiYWRtaW4ifQ.7Y6IkBkgvr2vVAnsHVFm_pqlGUNS0XSUbo_zz37uH4E"
		}
	};
};