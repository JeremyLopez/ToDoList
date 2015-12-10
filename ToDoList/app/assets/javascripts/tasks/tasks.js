angular.module('toDoList')
.factory('tasks', [
'$http',
function($http){
		
	var o = { 
		tasks: [] 
	};
		
	o.getAll = function() {
    return $http.get('/tasks.json').success(function(data){
      angular.copy(data, o.tasks);
    });
 	};
	
	o.create = function(task) {
		return $http.post('/tasks.json', task).success(function(data){
			o.tasks.push(data);
		});
	};
	
	o.destroy = function(task) {
		return $http.delete('/tasks/' + task.id + '.json').success(function(data){
			console.log("Task " + task.title + " has been deleted!");
			o.getAll();
		});
	};
	
	o.upvote = function(task) {
		return $http.put('/tasks/' + task.id + '/upvote.json').success(function(data){
			task.importance += 1;
		})
	};
	
	o.downvote = function(task) {
		return $http.put('/tasks/' + task.id + '/downvote.json').success(function(data){
			task.importance -= 1;
		})
	};
	
	o.up_completion = function(task) {
		return $http.put('/tasks/' + task.id + '/up_completion.json').success(function(data){
			task.completion += 1;
		})
	};
	
	o.down_completion = function(task) {
		return $http.put('/tasks/' + task.id + '/down_completion.json').success(function(data){
			task.completion -= 1;
		})
	};
	
	return o;
		
}]);

 