petsService.$inject = [ '$http', 'apiUrl' ];

export default function petsService($http, apiUrl){
    return{
        getAll(){
            return $http.get(`${apiUrl}/pets/all`)
        .then(res => res.data);
        },

        getById(pet_id){
            return $http.get(`${apiUrl}/pets/${pet_id}`)
        .then(res => res.data);
        },

        getByQuery(query){
            return $http.get(`${apiUrl}/pets/?${query}`)
        .then(res => res.data);
        },

        addPet(pet){
            return $http.post(`${apiUrl}/pets`, pet)
        .then(res => res.data);
        },

        updatePet(pet_id){
            return $http.put(`${apiUrl}/pets`, pet)
        .then(res => res.data);
        },

        removePet(pet_id){
            return $http.delete(`${apiUrl}/pets/${pet_id}`)
        .then(res => {
            res.data;

        });
        },
    };
}
