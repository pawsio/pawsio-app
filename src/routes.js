routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routes($stateProvider, $urlRouterProvider) {

    $stateProvider.state({
        name: 'about',
        url: '/about',
        data: {
            public: true
        },
        resolve: {
            pets: ['petsService', pets => {
                return pets.getAll()
                  .then(pets => {
                      return pets.pets;
                  });
            }]
        },
        abstract: true,
        default: '.app',
        component: 'about'
    });

    $stateProvider.state({
        name: 'about.app',
        url: '/app',
        // data: {
        //     public: true
        // },
        component: 'aboutApp'
    });

    $stateProvider.state({
        name: 'about.developers',
        url: '/developers',
        component: 'aboutDevelopers'
    });

    $stateProvider.state({
        name: 'profile',
        url: '/profile',
        abstract: true,
        default: '.pets',
        resolve: {
            pets: ['petsService', pets => {
                return pets.getAll()
                  .then(pets => {
                      return pets.pets;
                  });
            }]
        },
        component: 'profile'
    });

    $stateProvider.state({
        name: 'profile.pets',
        url: '/pets',
        component: 'allPets'
    });

    $stateProvider.state({
        name: 'stats',
        url: '/stats/:id',
        abstract: true,
        default: '.pet',
        resolve: {
            pet: ['$transition$', 'petSnapshotService', (t, pets) => {
                return pets.get(t.params().id);
            }],
            pets: ['petsService', pets => {
                return pets.getAll()
                  .then(pets => {
                      return pets.pets;
                  });
            }]
        },
        component: 'stats'
    });

    $stateProvider.state({
        name: 'stats.pet',
        url: '/pet-info',
        component: 'pet'
    });

    $urlRouterProvider.otherwise('/about/app');

}
