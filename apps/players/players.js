var Application = require(__dirname+'/../../core/Application');


module.exports = function(appManager){
	var playersApp = new Application(appManager);

	playersApp.id = "players";
	playersApp.name = "Joueurs";
	playersApp.description = "Permet de configurer l'acces au serveur des joueurs";

	playersApp.style.primaryColor = "#FF8023";

	playersApp.icon = "torso.svg";

	playersApp.html = "playerIndex.html";
	playersApp.css = "playersStyle.css";
	playersApp.script = "playersScript.js";

	playersApp.onOpen = function(user){
		user.socket.on("playersAppGetLists",function(){
			playersApp.appManager.app.gameServer.loadConfig();
			var lists = {};
			lists.whiteList = playersApp.appManager.app.gameServer.whiteList;
			lists.ops = playersApp.appManager.app.gameServer.ops;
			lists.bannedPlayers = playersApp.appManager.app.gameServer.bannedPlayers;
			lists.bannedIps = playersApp.appManager.app.gameServer.bannedIps;
			user.socket.emit("playersAppGetLists",lists);
		});
	}

	playersApp.onClose = function(user){
		user.socket.removeAllListeners("playersAppGetLists");
	}

	return playersApp;
}