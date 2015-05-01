app.controllerProvider.register("playersAppController",function($scope,socket){
	$scope.tab = 1;
	$scope.whiteList = [];
	$scope.bannedPlayers = [];
	$scope.bannedIps = [];
	$scope.ops = [];
	
	$scope.addWhitelist = function(player){
		$scope.serverCommand("whitelist add "+player);
	}
	
	$scope.remWhitelist = function(player){
		$scope.serverCommand("whitelist remove "+player);
	}
	
	socket.emit("playersAppGetLists");
	socket.on("playersAppGetLists",function(lists){
		$scope.whiteList = lists.whiteList;
		$scope.bannedPlayers = lists.bannedPlayers;
		$scope.bannedIps = lists.bannedIps;
		$scope.ops = lists.ops;
		console.log($scope);
	});
});

app.controllerProvider.register("onlinePlayersAppController",function($scope,socket){
	$scope.playerSelected = null;

	$scope.select = function(player){
		$scope.playerSelected = player;
	}

	$scope.isSelected = function(player)
	{
		if(player == $scope.playerSelected)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	$scope.kill = function(player)
	{
		$scope.serverCommand("kill "+player);
	}

	$scope.kick = function(player)
	{
		$scope.serverCommand("kick "+player);
	}

	$scope.ban = function(player)
	{
		$scope.serverCommand("ban "+player);
	}
});