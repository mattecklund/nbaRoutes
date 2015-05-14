var app = angular.module('nbaRoutes');

app.controller('teamCtrl', function($scope, $routeParams, teamService, teamData){
	$scope.teamData = teamData;
	$scope.newGame = {};
	$scope.showNewGameForm = false;

	// console.log(teamData);
	console.log($scope);

	$scope.teams = ["Boston Celtics", "Brooklyn Nets", "New York Knicks", "Philadelphia 76ers", "Toronto Raptors", "Chicago Bulls", "Cleveland Cavaliers", "Detroit Pistons", "Indiana Pacers", "Milwaukee Bucks", "Atlanta Hawks", "Charlotte Hornets", "Miami Heat", "Orlando Magic", "Washington Wizards", "Dallas Mavericks", "Houston Rockets", "Memphis Grizzlies", "New Orleans Pelicans", "San Antonio Spurs", "Denver Nuggets", "Minnesota Timberwolves", "Portland Trail Blazers", "Oklahoma City Thunder", "Utah Jazz", "Golden State Warriors", "Los Angeles Clippers", "Los Angeles Lakers", "Phoenix Suns", "Sacramento Kings"];

	$scope.toggleNewGameForm = function(){
		$scope.showNewGameForm = !$scope.showNewGameForm;
		console.log($scope.showNewGameForm);
	}

	if($routeParams.team === 'utahjazz'){
		$scope.homeTeam = 'Utah Jazz';
		$scope.logoPath = 'images/jazz-logo.png'
	} else if($routeParams.team === 'losangeleslakers'){
		$scope.homeTeam = 'Los Angeles Lakers';
		$scope.logoPath = 'images/lakers-logo.png';
	} else if($routeParams.team === 'miamiheat'){
		$scope.homeTeam = 'Miami Heat';
		$scope.logoPath = 'images/heat-logo.png';
	} else {
		$scope.homeTeam = 'Unknown';
	}

	$scope.submitGame = function(){
		$scope.newGame.homeTeam = $scope.homeTeam.split(' ').join('').toLowerCase();
		teamService.addNewGame($scope.newGame).then(
			function(){
				teamService.getTeamData($scope.newGame.homeTeam).then(
					function(response){
						$scope.teamData = response;
						$scope.newGame = {};
						$scope.showNewGameForm = false;
					},function(err){
						console.log('We made another boo-boo');
					}
				)
			},function(error){
				console.log('We made a boo-boo');
			});
	}
});