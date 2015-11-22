
	$(document).ready(function(){
		// statr ready document

		var obj = '';
		$("#train").on("blur", function(){
			trn = $(this).val();
			if(trn != ''){
				$.get("mod/getRoute.php", {trn: trn, apikey: 'plbss7025'}, function(data){
					obj = JSON.parse(data);
					if(obj.response_code == 200){
						var l = obj.route.length;

						$("#srcStn").val(obj.route[0].fullname);

						$("#destStn").val(obj.route[l-1].fullname);
					}else{
						alert("Change apikey !!!");
					}
				});
			}
		});

		$("#tick-box").click(function(){
			if($(this).is(':checked')){
				$(".hideShow").slideUp();
			}else{
				$(".hideShow").slideDown();
			}
		});

		$("#srcStn").on('blur', function(){
			var name = $(this).val();
			if($("#tick-box").is(':checked')){
				$.get("mod/getStnCode.php", {stnName: name}, function(data){
					var localObj = JSON.parse(data);
					$nearSrc = JSON.parse(data);
					if(localObj.response_code == 200){
						$srcStnCode = localObj.stations[0].code;
						
					}else{
						alert("Change apikey !!!");
					}
				});
			}
		});

		$("#destStn").on('blur', function(){
			var name = $(this).val();
			if($("#tick-box").is(':checked')){
				$.get("mod/getStnCode.php", {stnName: name}, function(data){
					var localObj = JSON.parse(data);
					if(localObj.response_code == 200){
						$destStnCode = localObj.stations[0].code;

						getTrains($srcStnCode, $destStnCode);
					}else{
						alert("Change apikey !!!");
					}
				});
			}
		});

		function getTrains(src, dest){
			$.get("mod/getTrainList.php", {src: src, dest: dest}, function(data){ alert(data);
				var localObj = JSON.parse(data);
				if(localObj.response_code == 200){
					for(var i in localObj.train){
						$("#trainList").append("<div class='col-xs-12 col-md-12 list'>"+localObj.train[i].number+" ("+localObj.train[i].name+") </div>");
					}
				}else if(localObj.response_code == 204){

				}else{
					alert("Change apikey !!!");
				}
			});
		}



		function initMap(){
		var directionsService = new google.maps.DirectionsService;
		var directionsDisplay = new google.maps.DirectionsRenderer;
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 7,
			center: {lat: 30.3180, lng: 78.0290}
		});
		directionsDisplay.setMap(map);

		var onChangeHandler = function() {
			calculateAndDisplayRoute(directionsService, directionsDisplay);
		};
			document.getElementById('submit').addEventListener('click', onChangeHandler);
			
		}

		function calculateAndDisplayRoute(directionsService, directionsDisplay) {
			directionsService.route({
				origin: document.getElementById('srcStn').value,
				destination: document.getElementById('destStn').value,
				travelMode: google.maps.TravelMode.DRIVING
			}, function(response, status) {
				if (status === google.maps.DirectionsStatus.OK) {
			  		directionsDisplay.setDirections(response);
				} else {
			  		window.alert('Directions request failed due to ' + status);
				}
	  		});
		}

		initMap();




		// end ready document
	});
