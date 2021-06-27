"use strict";

//TODO Make lat and lng, zoom props on MapComponent, pass markers as a list as props (watch lecture)

function MapComponent(props) {
  console.log('rendering the map')

  // Ask Seema for Ref

  const ref = React.useRef();
  
  // useState will return map variable and setMap function; should use Ref though so this code will change later
  const [map, setMap] = React.useState();

  React.useEffect(() => {
  // Instantiate a brand new map & store this in the current state
    if (!window.google) { // Create an html element with a script tag in the DOM
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAjpErE26dDxvQMnZS8I-cUOGjz6WW3rik&libraries=places';
      document.head.append(script);
      script.addEventListener('load', ()=> {
        const newMap = new window.google.maps.Map(ref.current, {center: { lat: 37.733795, lng: -122.446747 },zoom: 10, styles: MAPSTYLES});
        setMap(newMap);
        return newMap;
      });
      
      console.log('and now there is a map')
      console.log(ref)
      return () => script.removeEventListener('load', ()=> {
        const newMap = new window.google.maps.Map(ref.current);
        setMap(newMap);
        return newMap});
    } else { // Initialize the map if a script element with google url IS found
      const newMap = new window.google.maps.Map(ref.current, {center: { lat: 37.733795, lng: -122.446747 }, zoom: 10, styles: MAPSTYLES});
      setMap(newMap);
      console.log('and now there is a map');
      console.log(ref)
    }
  }, []); // [options.center.lat]); make an empty array for now but this dependency list should include the lat, long, zoom, marker props
  
// map = piece of state from line 12
  if (map) {
    console.log('and the map exists')

    // Center the map based on the location of the first result
    const centerPosition = {
      lat: props.results[0].coordinates.latitude, 
      lng: props.results[0].coordinates.longitude
    }

    for (const result of props.results) {
      const barMarker = new google.maps.Marker({
        position: {
          lat: result.coordinates.latitude,
          lng: result.coordinates.longitude
        },
        title: result.name,
        map: map // this is the map that the marker needs to go on
      });

      // When a user clicks on the bar marker, show bar name and address
      const barInfo = new google.maps.InfoWindow();
      const barInfoContent = (`
        <div class="window-content">
          <h6>${result.name}</h6>
          <ul class="bar-info">
            <li><b>Address: </b>${result.location.display_address}</li>
            <li><b>Rating: </b>${result.rating}</li>
            <li><b><a href="${result.url}">Yelp url</a></b></li>
          </ul>
        </div>
      `);

      barMarker.addListener('click', () => {
        barInfo.close();
        barInfo.setContent(barInfoContent);
        barInfo.open(map, barMarker);
      });
      map.setCenter(centerPosition);
    }
    
    // Zoom the returned map to 12
    map.setZoom(12);

  } else { console.log('but there is no map')}

  return (
    <div id="map-div"
      style={{ 
        height: 800, 
        margin: `1em 0`, 
        borderRadius: `0.5em`, 
        width: 1200
      }}
      ref={ref}
    ></div>
  )
}

