angular.module('toDoList')

.controller('MainCtrl', [
'$scope',
'tasks',
function($scope, tasks){
	
	$scope.tasks = tasks.tasks;
	$scope.items = ['one', 'two', 'three'];
	
	$scope.addTask = function() {
		var taskPosition = tasks.tasks.length + 1;
		if(!$scope.title || $scope.title === '') { return; }
		tasks.create({
			title: $scope.title, 
			importance: $scope.importance,
			completion: 0,	
			steps: $scope.steps,
			clicked: false,
			position: taskPosition // puts position as field in db (needs to be updated when dragged)
		});
		$scope.title = '';
		$scope.importance = '';
		$scope.steps = '';
	};
	
	$scope.moveTask = function(task, pos) {
		// I know this is wrong, trying to find out how to push new position to db
		console.log("New position: " + pos);
		tasks.upvote(task, pos);
	};
	
	$scope.taskCompleted = function(task, index) {
		if (task.clicked === false ) {
			animateSVG(index);
			tasks.completeMe(task);
			task.completion = task.steps;
		} else {
			animateSVGremoval(index);
			tasks.uncompleteMe(task);
			task.completion = 0;
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
	
	
  $scope.sortableOptions = {
		
    update: function(e, ui) {
//			$scope.moveTask(ui.item.index());
		},
		stop: function(e, ui) {
			// once dropped, call moveTask with the task (not yet available) and position
			$scope.moveTask(task, ui.item.index());
		}
	};
}])





















//			$("#info").load("process-sortable.php?"+order); 
//      var logEntry = tmpList.map(function(i){
//        return i.value;
//      }).join(', ');
//      $scope.sortingLog.push('Update: ' + logEntry);
	
//    stop: function(e, ui) {
      // this callback has the changed model
//      var logEntry = tmpList.map(function(i){
//        return i.value;
//      }).join(', ');
//      $scope.sortingLog.push('Stop: ' + logEntry);
//    }
	
	
	// jQuery Work:  Need to find a better place for this!!!
	
//	function dragComplete( event, ui ) {
//		var y_offset = parseInt( ui.offset.top );
////		alert(y_offset);
//	}
//	
//	function dropComplete( event, ui ) {
//		alert("You have dropped legally")
//	}
//	
//
//	var dragg = document.querySelectorAll('#drag-here'); // selects all drop destinations
//	
////	angular.element(dragg).each(function() {
////		console.log(angular.element(this));
////		angular.element(this).sortable(
////		);
////	});
//	
//	angular.element(document).find(".sort-test").sortable();
//	
//	angular.element(document).find('#makeMeDraggable').draggable({
//		cursor: 'move',
////		containment: '#drag-here',
//		stop: dragComplete
//	});
	


//.controller('sortableController', function ($scope) {
//  var tmpList = [];
//  
//  for (var i = 1; i <= 6; i++){
//    tmpList.push({
//      text: 'Item ' + i,
//      value: i
//    });
//  }
//  
//  $scope.list = tmpList;
//  
//  
//  $scope.sortingLog = [];
//  
//  $scope.sortableOptions = {
//    update: function(e, ui) {
//      var logEntry = tmpList.map(function(i){
//        return i.value;
//      }).join(', ');
//      $scope.sortingLog.push('Update: ' + logEntry);
//    },
//    stop: function(e, ui) {
//      // this callback has the changed model
//      var logEntry = tmpList.map(function(i){
//        return i.value;
//      }).join(', ');
//      $scope.sortingLog.push('Stop: ' + logEntry);
//    }
//  };
//});