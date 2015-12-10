angular.module('toDoList')
.controller('TasksCtrl', [
	'$scope',
	'$stateParams',
	'tasks',
	function($scope, $stateParams, tasks){
		
		$scope.task = tasks.tasks[$stateParams.id];
		
		$scope.addComment = function() {
			if($scope.body === '') { return; }
			$scope.task.comments.push({
				body: $scope.body,
				author: 'user',
				upvotes: 0
			});
			$scope.body = '';
		};
	}
]);