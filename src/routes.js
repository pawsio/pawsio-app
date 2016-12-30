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

    $urlRouterProvider.otherwise('/welcome');
    
}
