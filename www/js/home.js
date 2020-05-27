document.addEventListener("deviceready", function() {
    // Manually set the location as this code is tested on the emulator
    const location = {
        lat: 37.80774328,
        lng: -122.4241499
    };

    /**
     * Since GPS does not function on emulator,
     * below line needs to be uncommented to get 
     * the actual geo location when ran on physical devices
     */

     // plugin.google.maps.LocationService.getMyLocation({ enableHighAccuracy: true }, function(location) {
        const distance = 1;

        // Create a Google Maps native view under the map_canvas div.
        const map = plugin.google.maps.Map.getMap(document.getElementById("map_canvas"));

        // Move to the position with animation
        map.animateCamera({
            target: {lat: location.lat, lng: location.lng},
            zoom: 17,
            tilt: 60,
            bearing: 140,
            duration: 5000
        });

        // Add a maker
        map.addMarker({
            position: {lat: location.lat, lng: location.lng},
            title: "Here you are",
            animation: plugin.google.maps.Animation.BOUNCE
        }).showInfoWindow();
                
        document.getElementById("getMerchBtn").addEventListener("click", function() {                
            cordovaHTTP.get("http://namazgurbanov.com:3001/ui/merchants/", {
                latitude: location.lat,
                longitude: location.lng,
                distance: distance
            }, {
            
            }, function(response) {
                JSON.parse(response.data).data.forEach(merchant => {
                    map.addMarker({
                        position: {lat: merchant.latitude, lng: merchant.longitude},
                        title: merchant.applicant,
                        animation: plugin.google.maps.Animation.BOUNCE
                    }).showInfoWindow();
                });

            }, function(response) {
                console.error(response);
            });
        });
    // });
}, false);