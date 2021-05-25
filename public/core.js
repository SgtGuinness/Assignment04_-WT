var hubTask = angular.module('hubTask', []);

function mainController($scope, $http) {
  $scope.formData = {};

  $http.get('/api/task')
    .success(function (data) {
      $scope.tasks = data;
      console.log(data);
    })
    .error(function(data) {
      console.error('Error: ' + data);
    });

  $scope.createTask = function () {
    $http.post('/api/task', $scope.formData)
      .success(function (data) {
        $scope.formData = {};
        $scope.tasks = data;
        console.log(data);
      }).error(function (data) {
        console.log('Error: ' + data);
      });
  };

  $scope.deleteTask = function(id) {
    $http.delete('/api/todos/' + id)
      .success(function(data) {
        $scope.tasks = data;
        console.log(data);
      }).error(function(data) {
        console.log('Error: ' + data);
      });
  };
}
