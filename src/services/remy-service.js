remyService.$injext = ['$http', 'apiUrl'];

export default function remyService($http, apiUrl) {
    return {
        getAll() {
            return $http.get(`${apiUrl}/remy/allwalks`)
                .then(res => res.data);
        },
        get(id) {
            return $http.get(`${apiUrl}/remy/allwalks/${id}`)
                .then(res => res.data);
        },
        getRemy() {
            return $http.get(`${apiUrl}/remy`)
                .then(res => res.data);
        }
    };
};