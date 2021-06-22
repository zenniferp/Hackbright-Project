// Initialize and add the map
function initMap() {
    console.log("we are here")
    // The location of SF
    const sf = { lat: 37.7749, lng: -122.4194 };
    // The map, centered at SF
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: sf,
    });
    // The markers, positioned in map of SF. Should be a for loop
    const bar1 = {lat: 37.7988463, lng: -122.4213534}
    const bar2 = {lat: 37.7979472, lng: -122.4099804}

    const marker1 = new google.maps.Marker({
      position: bar1,
      map: map,
    });
    const marker2 = new google.maps.Marker({
        position: bar2,
        map: map,
      });

  }