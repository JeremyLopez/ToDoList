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
			steps: $scope.steps,
			clicked: false
		});
		$scope.title = '';
		$scope.importance = '';
		$scope.steps = '';
	};
	
	$scope.taskCompleted = function(task, index) {
		if (task.clicked === false ) {
			animateSVG(index);
			tasks.completeMe(task);
//			task.completion = task.steps;
		} else {
			animateSVGremoval(index);
			tasks.uncompleteMe(task);
		}
	};
	
	$scope.removeTask = function(task) {
		tasks.destroy(task);
	};
	
	$scope.incrementImportance = function(task) {
		if ( task.importance === 10 ) {
			return;
		} else {
			tasks.upvote(task);
		}
	};
	
	$scope.decreaseImportance = function(task) {
		if ( task.importance === 0 ) {
			return;
		} else {
			tasks.downvote(task);
		}
	};
	
	$scope.incrementCompletion = function(task) {
		var steps = task.steps;
		if ( task.completion === (task.steps-1) ) {
			console.log(task);
			task.importance = 0;
			task.completion = task.steps;
		} else {
			tasks.up_completion(task);
		}
	};
	
	$scope.decreaseCompletion = function(task) {
		if ( task.completion === 0 ) {
			return;
		} else {
			tasks.down_completion(task);
		}
	};
	
	$scope.GetClass = function(val){
    return val;
  };
	
}]);