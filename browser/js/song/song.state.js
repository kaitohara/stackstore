'use strict'

app.config(function ($stateProvider) {
	$stateProvider.state('song', {
		url: '/songs/:id',
		templateUrl: 'js/song/song.html',
		controller: 'SongCtrl',
		resolve: {
			song: function(Song, $stateParams) {
				return Song.getPopulatedSong($stateParams.id);
			}
		}
	});
});

app.controller('SongCtrl', function ($scope, song, Album, Artist, $modal, shareSongInfo){
	$scope.song = song;
	console.log('found this song', song);

	function initToneden(){
		var config = {
			dom: "#player",
			skin: "dark",
			urls: [
				$scope.song.url
			]
		};

		if (typeof ToneDen !== 'undefined'){
			ToneDen.player.create(config);
		} else {
			ToneDenReady.push(function() {
				ToneDen.player.create(config);      
			}); 
		}
	}
	
	shareSongInfo.setProperty(song);

	$scope.openModal = function(){
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: 'js/purchase/modalSongView.html',
			controller: 'ModalInstanceCtrl',
			size: 'lg',
			windowClass: 'center-modal'
		});
		modalInstance.result.then(function(selectedItem){
			$scope.selected = selectedItem;
		}, function(){
		});
	};
	initToneden();
});