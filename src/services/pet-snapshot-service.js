// $http is Angular's built-in AJAX library
petSnapshotService.$inject = ['$http', 'apiUrl'];

// $http gets injected
export default function petSnapshotService($http, apiUrl) {
    return {
        getAll(animalId) {
            return $http.get(`${apiUrl}/pet-snapshots/${animalId}/all`)
                .then(res => res.data);
        },
        get(id) {
            return $http.get(`${apiUrl}/pet-snapshots/${id}`)
                .then(res => res.data);
        },
        remove(id) {
            return $http.delete(`${apiUrl}/pet-snapshots/${id}`)
                .then(res => res.data);
        },
        updateSnap(id, data) {
            return $http.put(`${apiUrl}/pet-snapshots/${id}`, data)
            .then(res => res.data);
        }
    };
};
