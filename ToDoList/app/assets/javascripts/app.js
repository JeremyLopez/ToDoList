angular.module('toDoList', ['ui.router', 'templates'])

.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
	
    .state('home', {
      url: '/home',
      templateUrl: 'home/_home.html',
      controller: 'MainCtrl',
			resolve: {
				taskPromise: ['tasks', function(tasks){
					return tasks.getAll();
				}]
			}
    })
	
		.state('tasks', {
			url: '/tasks/{id}',
			templateUrl: 'tasks/_tasks.html',
			controller: 'TasksCtrl'
		});

  $urlRouterProvider.otherwise('home');
}]);