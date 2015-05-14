var app = angular.module('nbaRoutes');

app.service('teamService', function($http, $q){
	this.addNewGame = function(gameObj){
		//sned to parse I think
		var parseUrl = 'https://api.parse.com/1/classes/' + gameObj.homeTeam;
		if (parseInt(gameObj.homeTeamScore) > parseInt(gameObj.opponentScore)){
			gameObj.won = true
		} else {
			gameObj.won = false;
		};
		console.log(gameObj);
		return $http({
			method:'POST',
			url: parseUrl,
			data: gameObj
		})
	};

	this.getTeamData = function(team){
		var deferred = $q.defer();
		var url = 'https://api.parse.com/1/classes/' + team;
		$http({
			method: 'GET',
			url: url
		}).then(function(data){
			var results = data.data.results;
			// console.log(results);
			var wins = 0;
			var losses = 0;
			for (var i = 0; i < results.length; i++){
				if(results[i].won === true){
					wins++;
				} else {
					losses++;
				}
			};
			results['wins'] = wins;
			results['losses'] = losses;
			// console.log(results);
			deferred.resolve(results);
		}, function(error){
			deferred.reject;
		})
		return deferred.promise;
	}
});