angular.module('toDoList')
.controller('MainCtrl', [
'$scope',
'tasks',
function($scope, tasks){
	
	$scope.tasks = tasks.tasks;
	
	$scope.addTask = function() {
		if(!$scope.title || $scope.title === '') { return; }
		tasks.create({
			title: $scope.title, 
			importance: $scope.importance,
			completion: 0,
		});
		$scope.title = '';
		$scope.importance = '';
	};
	
	$scope.removeTask = function(task) {
		tasks.destroy(task);
		
	};
	
	$scope.incrementImportance = function(task) {
		tasks.upvote(task);
	};
	
	$scope.decreaseImportance = function(task) {
		tasks.downvote(task);
	};
	
	$scope.incrementCompletion = function(task) {
		tasks.up_completion(task);
	}
	
	$scope.decreaseCompletion = function(task) {
		tasks.down_completion(task);
	}
	
	$scope.GetClass = function(val){
    return val;
  };
	
}]);