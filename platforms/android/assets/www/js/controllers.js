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


.controller('loginController', function($scope, $http, $location) {
  $scope.login = function(user){
	var url = "http://192.168.2.206/slides/www/model/login.php";
	
	$http.post(url,user).then(function(response){
		if(response.data == "success"){
			$location.path('/tab/dash');
		}else{
			$location.path('/login');
		}
	});
  }
})

//Controlador das listas do menu principal
.controller('listController', function($scope, $http, $ionicModal) {
  
	//Definicao da funcao de insercao de reserva
		$scope.insertReserva = function(reserva){
			var url = "http://192.168.2.206/slides/www/model/insert.php";
			
			$http.post(url,reserva).then(function(response){
				if(response.data == "sucesso"){
					alert("sucesso");
				}else{
					alert("falha");
				}
			});
		}
	
	//Busca as resrvas ativas na tabela reservation e o nome do usuario que realizou a mesma
  	$http.get("http://192.168.2.206/slides/www/model/selectReservas.php").success(function(data){$scope.data = data;});
	
	//Busca os livros que mais foram emprestados
  	$http.get("http://192.168.2.206/slides/www/model/selectDestaques.php").success(function(des){$scope.des = des;});
	
	//Busca os livros que foram emprestados e devolvidos por determinado usuário
  	$http.post("http://192.168.2.206/slides/www/model/selectHistorico.php", $scope.user)
		.success(function(his){
			$scope.his = his;
			alert(toString($scope.user));
		}
	);	
	
	
	
	//Controlador da janela modal de insercao de reserva
	$ionicModal.fromTemplateUrl("templates/cadReserva.html",{
		animation: "slideUp",
		scope : $scope
	}).then(function(modal){
		$scope.modal = modal;
	});
	
	$scope.openModal = function(){
		$scope.modal.show();
	}
});
