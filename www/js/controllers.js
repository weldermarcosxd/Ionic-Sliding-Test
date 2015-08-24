angular.module('starter.controllers', [])

.controller('TabCtrl', function($scope, $ionicSlideBoxDelegate, $ionicTabsDelegate) {

  $scope.selectedTab = 0;

  $scope.selectTabWithIndex = function(index) {

    $scope.selectedTab = index; // store tab pos
    $ionicSlideBoxDelegate.slide($scope.selectedTab); // change slider to match

  }

  // thanks: http://codepen.io/mhartington/pen/Luhig
  $scope.slideChanged = function(index) {
    switch(index) {
      case 0:
        $scope.selectTabWithIndex(0);
      break;

      case 1:
        $scope.selectTabWithIndex(1);
      break;

      case 2:
        $scope.selectTabWithIndex(2);
      break;
    }
  };

})


.controller('DashCtrl', function($scope) {})

//Controlador das listas do menu principal
.controller('listController', function($scope, $http, $ionicModal) {
  
	//Busca as resrvas ativas na tabela reservation e o nome do usuario que realizou a mesma
  $http.get("http://localhost/slides/www/model/selectReservas.php").success(function(data){$scope.data = data;});
	
	//Busca os livros que foram emprestados
  $http.get("http://localhost/slides/www/model/selectDestaques.php").success(function(des){$scope.des = des;});
	
	$ionicModal.fromTemplateUrl("templates/cadReserva.html",{
		animation: "slideUp",
		scope : $scope
	}).then(function(modal){
		$scope.modal = modal;
	});
	
	$scope.openModal = function(){
		$scope.modal.show();
	}

  $scope.insertReserva = function(){
    $http.post("http://localhost/slides/www/model/model/insert.php",{"titulo": $scope.labelRegistro, "usuario": $scope.userRegistro})
    .success(function(date, status, headers, config){
      console.log("Data inserted successfully");
    });
  };

});
