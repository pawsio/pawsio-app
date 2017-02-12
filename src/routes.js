routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routes($stateProvider, $urlRouterProvider) {

    $stateProvider.state({
        name: 'about',
        url: '/about',
        data: {
            public: true
        },
        abstract: true,
        default: '.app',
        component: 'about'
    });

    $stateProvider.state({
        name: 'about.app',
        url: '/app',
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
            pet: ['$transition$', 'petsService', (t, pets) => {
                return pets.getById(t.params().id);
            }],
            pets: ['petsService', pets => {
                return pets.getAll()
                  .then(pets => {
                      return pets.pets;
                  });
            }],
            petData: ['$transition$', 'petSnapshotService', (t, snapshots) => {
                return snapshots.getAll(t.params().id);
            }]
        },
        component: 'stats'
    });

    $stateProvider.state({
        name: 'remy',
        url: '/remy',
        data: {
            public: true
        },
        component: 'remy'
    });

    $stateProvider.state({
        name: 'publicsnapshot',
        url: '/publicsnapshot/:id',
        data: {
            public: true
        },
        resolve: {
            snapshot: ['$transition$', 'remyService', (t, remy) => {
                return remy.get(t.params().id);
            }],
            pet: ['remyService', (remy) => {
                return remy.getRemy();
            }]
        },
        component: 'publicSnapshot'
    });

    $stateProvider.state({
        name: 'stats.pet',
        url: '/pet-info',
        component: 'pet'
    });

    $stateProvider.state({
        name: 'snapshot',
        url: '/snapshot/:id/:petId/',
        resolve: {
            snapshot: ['$transition$', 'petSnapshotService', (t, snapshot) => {
                return snapshot.get(t.params().id);
            }],
            pet: ['$transition$', 'petsService', (t, pets) => {
                return pets.getById(t.params().petId);
            }],
            pets: ['petsService', pets => {
                return pets.getAll()
                  .then(pets => {
                      return pets.pets;
                  });
            }]
        },
        component: 'snapshot'
    });

    $urlRouterProvider.otherwise('/about/app');

}
