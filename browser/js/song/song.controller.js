app.service('shareSongInfo', function(){
	var property = "First";
	return {
		getProperty: function(){
			return property;
		},
		setProperty: function(value){
			property = value;
		}
	}
})

app.controller('SongCtrl', function ($scope, song, Album, Artist, $modal, shareSongInfo){
	$scope.song = song;
	// (function() {
	// 	console.log('wwooo')
	// 	var script = document.createElement('script');

	// 	script.type = 'text/javascript';
	// 	script.async = true;
	// 	script.src = 'http://sd.toneden.io/production/toneden.loader.js'

	// 	var entry = document.getElementsByTagName('script')[0];
	// 	entry.parentNode.insertBefore(script, entry);
	// }());

	// var ToneDenReady = window.ToneDenReady || [];
	console.log(ToneDenReady, ToneDen)
	// ToneDenReady.push(function() {
	// 	// This is where all the action happens:
	// 	ToneDen.player.create({
	// 		dom: '#player',
	// 		urls: [
	// 		'https://soundcloud.com/kryder/ltric-this-feeling-kryder-remix-1'
	// 		],
	// 		skin:'dark'
	// 	});
	// });

	function initToneden(){
		var config = {
			dom: "#player",
			skin: "dark",
			visualizer:"waves",
			tracksPerArtist: 999,
			urls: [
			$scope.song.url
			]
		};

		if(typeof ToneDen != 'undefined'){
			console.log('yooo')
			ToneDen.player.create(config);
		}else{
			console.log('huh')
			ToneDenReady.push(function() {
				ToneDen.player.create(config);      
			}); 
		}
	};
	

	// console.log('ToneDenReady', ToneDenReady)
	// console.log('toneden', ToneDen)

	shareSongInfo.setProperty(song)
	// console.log('ToneDen', ToneDen, ToneDen.player, {define:function(){}},ToneDenReady)
	// ToneDen.player.getInstanceByDom("#player").addTracks('https://soundcloud.com/kryder/ltric-this-feeling-kryder-remix-1')
	Album.getAlbum($scope.song.album).then(function(data){
		$scope.album = data;
	})
	Artist.getArtist($scope.song.artist).then(function(data){
		console.log(data)
		$scope.artist = data;
	})
	$scope.openModal = function(){
		modalInstance = $modal.open({
			animation: true,
			templateUrl: 'js/purchase/modalView.html',
			controller: 'ModalInstanceCtrl',
			size: 'lg',
			windowClass: 'center-modal'
		})
		modalInstance.result.then(function(){
		}, function(){
		});
	};
	// loadPlayer();
	initToneden()
});

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, shareSongInfo){
	$scope.ok = function(){
		$modalInstance.close($scope.selected.item);
	};
	$scope.cancel = function(){
		$modalInstance.dismiss('cancel')
	};
	$scope.song = shareSongInfo.getProperty()
})

