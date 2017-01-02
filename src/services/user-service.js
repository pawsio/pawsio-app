userService.$inject = ['tokenService', '$http', 'apiUrl'];

export default function userService(token, $http, apiUrl) {

    const current = token.get();
    if (current) {
        $http
            .post(`${apiUrl}/users/validate`)
            .catch(() => token.remove());
    }
    
    function credential(endpoint) {
        return (credentials) => {
            return $http.post(`${apiUrl}/users/${endpoint}`, credentials)
            .then(result => {
                token.set(result.data.token);
            })
            .catch(err => {
                throw err.data; 
            });
        };
    }

    return {
        isAuthenticated() {
            return !!token.get();
        },
        logout() {
            token.remove();
        },
        signin: credential('signin'),
        signup: credential('signup')
    };
}
