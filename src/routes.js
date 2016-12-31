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
        data: {
            public: true
        },
        component: 'aboutApp' 
    });

    $stateProvider.state({
        name: 'about.developers',
        url: '/developers',
        data: {
            public: true
        },
        component: 'aboutDevelopers' 
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
        name: 'profile.pet',
        url: '/pets',
        data: {
            public: true
        },
        component: 'pet'
    });

    $stateProvider.state({
        name: 'profile.manage',
        url: '/manage',
        component: 'managePets'
    });

    $urlRouterProvider.otherwise('/about/app');
    
}
