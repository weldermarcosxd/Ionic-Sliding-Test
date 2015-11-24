angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
//    if (window.cordova && window.cordova.plugins.Keyboard) {
//      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//    }
//    if (window.StatusBar) {
//      StatusBar.styleDefault();
//    }
  });
})

.config(function($ionicConfigProvider) {
    $ionicConfigProvider.backButton.previousTitleText(false);
	$ionicConfigProvider.backButton.text('');
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html",
    controller: 'TabCtrl'
  })
  
  //Tela de Login
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginController'
  })
	
  // Each tab has its own nav history stack:
  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'listController'
      }
    }
  })
  
   //Detalhes
  .state('livro', {
    url: '/livro/:id',
	templateUrl: 'templates/livro.html',
	controller: 'listController'
  })
  
  .state('des', {
    url: '/des/:id',
	templateUrl: 'templates/des.html',
	controller: 'listController'
  })
  
  //Super Leitores
  .state('super', {
    url: '/super',
    templateUrl: 'templates/super.html',
    controller: 'listController'
  })
  
  //Pagina Sobre do App
  .state('sobre', {
    url: '/sobre',
    templateUrl: 'templates/sobre.html',
    controller: 'listController'
  })
  
  //Pagina Ajuda
  .state('ajuda', {
    url: '/ajuda',
    templateUrl: 'templates/ajuda.html',
    controller: 'listController'
  })

  //Cadastro das reservas
  .state('tab.cadReserva', {
    url: '/dash/cadReserva',
    views: {
      'tab-cadReserva': {
        templateUrl: 'templates/cadReserva.html',
		controller: 'listController'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

}); 
