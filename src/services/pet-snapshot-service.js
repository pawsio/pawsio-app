// $http is Angular's built-in AJAX library
petSnapshotService.$inject = ['$http', 'apiUrl'];

// $http gets injected
export default function petSnapshotService($http, apiUrl) {
    return {
        get(id) {
            return $http.get(`${apiUrl}/pet-snapshots/${id}`)
                .then(res => res.data);
        },
        remove(id) {
            return $http.delete(`${apiUrl}/pet-snapshots/${id}`)
                .then(res => res.data);
        }      
    };
}
