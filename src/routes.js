routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routes($stateProvider, $urlRouterProvider) {

    $stateProvider.state({
        name: 'welcome',
        url: '/welcome',
        data: {
            public: true
        },
        component: 'welcome' 
    });

    $stateProvider.state({
        name: 'profile',
        url: '/profile',
        abstract: true,
        default: '.pets',
        data: {
            public: true
        },
        // resolve: {
        //     pets: ['yetToBeMadeService', pets => {
        //         return pets.get();
        //     }]
        // },
        component: 'profile'
    });

    $stateProvider.state({
        name: 'profile.pets',
        url: '/pets',
        data: {
            public: true
        },
        component: 'allPets'
    });

    $stateProvider.state({
        name: 'profile.manage',
        url: '/manage',
        component: 'managePets'
    });

    $urlRouterProvider.otherwise('/welcome');
    
}
