function animateSVG(index) {
	var svg_container = '.squiggle-' + index + ' path';
	var el_helper = 'svg-' + index;
	var el = document.getElementById(el_helper);
	var path = document.querySelector(svg_container);
	var length = path.getTotalLength();
	// Clear any previous transition
	path.style.transition = path.style.WebkitTransition = 'none';
	
	// Set up the starting positions
	path.style.strokeDasharray = length + ' ' + length;
	path.style.strokeDashoffset = length;
	el.style.visibility = "visible";
	
	// Trigger a layout so styles are calculated & the browser
	// picks up the starting position before animating
	path.getBoundingClientRect();
	
//	el.style.display = "inline-block";
	
	// Define our transition
	path.style.transition = path.style.WebkitTransition =
		'stroke-dashoffset 2s ease-in-out';
	// Go!
	path.style.strokeDashoffset = '0';
};

function animateSVGremoval(index) {
	var svg_container = '.squiggle-' + index + ' path';
	var el_helper = 'svg-' + index;
	var el = document.getElementById(el_helper);
	var path = document.querySelector(svg_container);
	var length = path.getTotalLength();
	// Clear any previous transition
	path.style.transition = path.style.WebkitTransition = 'none';
	
	// Set up the starting positions
	path.style.strokeDasharray = length + ' ' + length;
	path.style.strokeDashoffset = '0';
//	el.style.visibility = "visible";
	
	// Trigger a layout so styles are calculated & the browser
	// picks up the starting position before animating
	path.getBoundingClientRect();
	
//	el.style.display = "inline-block";
	
	// Define our transition
	path.style.transition = path.style.WebkitTransition =
		'stroke-dashoffset 2s ease-in-out';
	// Go!
	path.style.strokeDashoffset = length;
};

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
		debugger;
		return $http.put('/tasks/' + task.id + '/upvote.json').success(function(data){
			task.importance += 1;
		})
	};
	
	o.completeMe = function(task) {
		return $http.put('/tasks/' + task.id + '/completeMe.json').success(function(data){
			task.clicked = true;
//			task.completion = task.steps;
		})
	};
	
	o.uncompleteMe = function(task) {
		return $http.put('/tasks/' + task.id + '/uncompleteMe.json').success(function(data){
			task.clicked = false;
//			task.completion = 0;
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
	
	o.moveOrder = function(start_pos, end_pos, task) {
		console.log(task);
		console.log('start: ', start_pos, 'end: ', end_pos);
//		debugger;
//		return $http.get('/tasks/' + task.id + '.json');
		return $http.put('/tasks/' + task.id + '/moveOrder.json');//.success(function(data){
//			console.log(data);
//			task.position = end_pos;		
//		})
	}
	
	return o;
		
}]);

 