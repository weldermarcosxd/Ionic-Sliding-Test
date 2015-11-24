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

//Controlador de Login
.controller('loginController', function($scope, $http, $location) {
  $scope.login = function(user){
	  
	user.registro = localStorage.getItem("user");
	  
	var url = "http://localhost/slides/www/model/login.php";
	
	$http.post(url,user).then(function(response){
		if(response.data == "success"){
			window.localStorage['user'] = user.pass;
			$location.path("/tab/dash");
		}else{
			alert("Insira informações válidas nos campos de Nome e Matrícula.");
		}
	});
  }
})

//Controlador das listas do menu principal
.controller('listController', function($scope, $http, $ionicModal, $state, $ionicPopover, $location, $stateParams) {
	
	$scope.whichartist=$state.params.id;
	
	$scope.avaliacao = {};
	
	//Definicao da funcao de insercao de reserva
	$scope.insertReserva = function(reserva){
		
		var url = "http://localhost/slides/www/model/insert.php";
						
		reserva.userRegistro = localStorage.getItem("user");
		
		alert(reserva.userRegistro + " e " + reserva.labelregistro + " e " +  reserva.autor );

		$http.post(url,reserva).then(function(response){
			if(response.data == "Reservado com sucesso."){
				alert("Reservado com sucesso.");
			}else if(response.data == "Você já reservou este livro esta semana, aguarde até a próxima."){
				alert("Você já reservou este livro esta semana, aguarde até a próxima.");
			}else if(response.data == "Você ainda tem reservas ativas"){
				alert("Você ainda tem reservas ativas");
			}else{
				alert(response.data);
			}	
			$scope.modalr.hide();
		});
		
		$scope.doRefresh = function() {
			$http.get("http://localhost/slides/www/model/selectReservas.php").success(function(data){$scope.data = data
			})
			.finally(function() {
			// Stop the ion-refresher from spinning
			$scope.$broadcast('scroll.refreshComplete');
			});
		};
	}
	
	$scope.whichbook=$state.params.id;
	
	//Busca as resrvas ativas na tabela reservation e o nome do usuario que realizou a mesma
  	$http.get("http://localhost/slides/www/model/selectReservas.php").success(function(data){$scope.data = data});
	
	//Busca todos os livros e a disponibiliada od mesmo para as reservas
	$http.get("http://localhost/slides/www/model/selectLivro.php").success(function(livro){$scope.livro = livro});
	
	//Busca os livros que mais foram emprestados
  	$http.get("http://localhost/slides/www/model/selectDestaques.php").success(function(des){$scope.des = des});
	
	//Busca os livros que foram emprestados e devolvidos por determinado usuário
	$scope.reg = JSON.stringify(JSON.parse(window.localStorage['user'] || '{}'));
  	$http.post("http://localhost/slides/www/model/selectHistorico.php", $scope.reg).success(function(his){$scope.his = his});	
	
	//seleciona os leitores que mais leram
	$http.get("http://localhost/slides/www/model/selectSuper.php").success(function(sup){$scope.sup = sup});
	
	//seleciona as avaliações ja realizadas
	$http.post("http://localhost/slides/www/model/mSelectRatting.php", $scope.his).success(function(rate){$scope.rate = rate});
	
	//seleciona as avaliações ja realizadas
	$http.get("http://localhost/slides/www/model/mSelectLivroRatting.php").success(function(livroRate){$scope.livroRate = livroRate});
	
	//seleciona todos os comentários
	$http.get("http://localhost/slides/www/model/mSelectComment.php").success(function(comentarios){$scope.comentarios = comentarios});
	
	
	//Controlador da janela modal de insercao de reserva
	$ionicModal.fromTemplateUrl("templates/cadReserva.html",{
		animation: "slide-in-Up",
		scope : $scope
	}).then(function(modalr){
		$scope.modalr = modalr;
	});
	
	//Controlador da janela modal de avaliação
	$ionicModal.fromTemplateUrl("templates/avaliacao.html",{
		animation: "slideUp",
		scope : $scope
	}).then(function(modalrAval){
		$scope.modalrAval = modalrAval;
	});
	
	$scope.openModal = function(index) {
      if (index == 1) $scope.modalr.show();
      else $scope.modalrAval.show();
    };

    $scope.closeModal = function(index) {
      if (index == 1) $scope.modalr.hide();
      else $scope.modalrAval.hide();
    };

	//link dos detalhes
	$scope.onSelectLivro = function(his) {
        $location.path('livro/' + his.livro);
    }
	
	$scope.onSelectDes = function(des) {
        $location.path('des/' + des.registro);
    }
	
	//Controladores do menu popup
	$ionicPopover.fromTemplateUrl('templates/popover.html', {
    	scope: $scope,
  		}).then(function(popover) {
		$scope.popover = popover;
  	});
	
	//Logout
	$scope.logout = function(){
		window.localStorage.clear();
		$location.path("/login");
		$scope.popover.hide();
	}
	
	//Sobre
	$scope.sobre = function(){
		$location.path("/sobre");
		$scope.popover.hide();
	}
	
	//Ajuda
	$scope.ajuda = function(){
		$location.path("/ajuda");
		$scope.popover.hide();
	}
	
	//Super
	$scope.super = function(){
		$location.path("/super");
		$scope.popover.hide();
	}
	
	$scope.deleteRes = function(user){
		alert(user);
		if(user == JSON.stringify(JSON.parse(window.localStorage['user'] || '{}'))){
			$http.post("http://localhost/slides/www/model/delete.php", user).success(function(deletado){$scope.deletado = deletado});
			if($scope.deletado == "success"){
				alert("deu");
			} 
			else{
				alert("nao deu");
			}
		}
		alert("nao deu não");
		$scope.doRefresh();
	}
		
	//	link dos detalhes
	$scope.avaliar = function(avaliacao) {
		avaliacao.user = $scope.reg;
		avaliacao.livro = $scope.whichbook;
		alert(JSON.stringify(avaliacao));
		$http.post("http://localhost/slides/www/model/mInsertRatting.php",avaliacao).success(function(avaliado){$scope.avaliado = avaliado});
		alert($scope.avaliado);
		$scope.modalrAval.hide();
    }
});
