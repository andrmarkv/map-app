//var center = [41.868706, -87.623502]; //Chicago
var center = [25.3022003174, 55.5255889893]; //Chicago

var mapCenter = {
	coords : {
		latitude : center[0],
		longitude : center[1],
	}
};

function getDistance(lat1, lon1, lat2, lon2) {
	  var R = 6378137.0; // Radius of the earth in m
	  var dLat = deg2rad(lat2-lat1);
	  var dLon = deg2rad(lon2-lon1); 
	  var a = 
	    Math.sin(dLat/2) * Math.sin(dLat/2) +
	    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
	    Math.sin(dLon/2) * Math.sin(dLon/2)
	    ; 
	  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	  var d = R * c; // Distance in m
	  return d;
	}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

var gotOK = false; // Indicator of confirmation to proceed to the next interval

var myapp = angular.module('appMaps', ['uiGmapgoogle-maps']);

myapp.config(function(uiGmapGoogleMapApiProvider) {
	uiGmapGoogleMapApiProvider.configure({
		libraries : 'geometry,visualization'
	});
});

myapp.controller('mainCtrl', function($scope, uiGmapGoogleMapApi) {
	$scope.map = {
		center : mapCenter.coords,
		zoom : 18,
		bounds : {}
	};
	
	$scope.myPath = [];
	
	
	$scope.markers = []; //markers to shows loaded locations

	uiGmapGoogleMapApi.then(function() {
	});

	$scope.parseLocationFile = function (buf){
		try{
			var lines = buf.split("\n");
			
			for (var i in lines) {
			    l = lines[i]
				// skip if line is too short
			    if (l.length <= 5) continue;

			    var tokens = l.split(",");
			    
			    var lat = tokens[7]; 
			    var lon = tokens[6];
			    
			    var newMarker = {
                    id: Date.now(),
                    coords: {
                        latitude: lat,
                        longitude: lon
                    },
                    options : {
        				draggable : false,
        				opacity : 0.85,
        				icon : {
        					path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
	    	                scale: 1,
	    	                strokeWeight:2,
	    	                strokeColor:"#B40404"
        				},
        			},
                };
			    
			    $scope.markers.push(newMarker);
                $scope.$apply();
			}
		} catch(err) {
			return 0;
		}
	}
	
	$scope.loadLocationsFile = function() {
		var fileSelector = document.createElement('input');
		fileSelector.setAttribute('type', 'file');
		fileSelector.addEventListener('change', readLocationFile, false);
		fileSelector.click();
		
		function readLocationFile(evt) {
		    //Retrieve the first (and only!) File from the FileList object
		    var f = evt.target.files[0]; 

		    if (f) {
		      var r = new FileReader();
		      r.onload = function(e) { 
		    	  var content = e.target.result;
		    	  $scope.parseLocationFile(content);
		      }
		      r.readAsText(f);
		    } else { 
		      alert("Failed to load file");
		    }
		  }
	};
});
