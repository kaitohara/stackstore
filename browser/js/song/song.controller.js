app.service('shareSongInfo', function() {
	var property = "First";
	return {
		getProperty: function() {
			return property;
		},
		setProperty: function(value) {
			property = value;
		}
	}
})

app.controller('SongCtrl', function($scope, song, Album, Artist, $modal, shareSongInfo) {
	$scope.song = song;
	Album.getAlbum($scope.song.album).then(function(data){
		console.log('in song ctrl')
			$scope.album = data;
		})
	Artist.getArtist($scope.song.artist).then(function(data){
			$scope.artist = data;
		})
	// $scope.album = $scope.song.album
	// $scope.artist = $scope.song.artist
		// console.log('here in ctrl')
		// Album.getAlbum($scope.song.album).then(function(data){
		// 	$scope.album = data;
		// })
		// Artist.getArtist($scope.song.artist).then(function(data){
		// 	$scope.artist = data;
		// })
		// (function() {
		// 	var script = document.createElement('script');

	// 	script.type = 'text/javascript';
	// 	script.async = true;
	// 	script.src = 'http://sd.toneden.io/production/toneden.loader.js'

	// 	var entry = document.getElementsByTagName('script')[0];
	// 	entry.parentNode.insertBefore(script, entry);
	// }());

	// var ToneDenReady = window.ToneDenReady || [];
	// (function(){console.log('thiiiis')}())
	// console.log(ToneDenReady, ToneDen)
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
	// console.log('toneden player', ToneDen.player)

	function initToneden() {
		var config = {
			dom: "#player",
			skin: "dark",
			urls: [
				$scope.song.url
			]
		};

		if (typeof ToneDen !== 'undefined') {
			ToneDen.player.create(config);
		} else {
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

	$scope.openModal = function() {
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: 'js/purchase/modalSongView.html',
			controller: 'ModalInstanceCtrl',
			windowClass: 'center-modal'
		})
		modalInstance.result.then(function(selectedItem) {
			$scope.selected = selectedItem;
		}, function() {});
	};
	// loadPlayer();
	initToneden()
});