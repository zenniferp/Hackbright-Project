"use strict";



function saveFav(resultId){
   const data = {result_id:resultId}
    fetch('/api/favorite', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

function removeFav(resultId){
  const data = {result_id:resultId}
   fetch('/api/unfavorite', {
       method: "POST",
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify(data)
   })
}

// function isFaved(resultId) {
//   const data = {result_id:resultId};
//   fetch('/api/getfavorite', {
//       method: "POST",
//       headers: {
//           'Content-Type': 'application/json'
//       }, 
//       body: JSON.stringify(data)
//   }).then(data => {
//     console.log(data);
//     faved = data;
//   });
//   return faved;
// }

// function buttonName(resultId) {
//   return (isFaved ? 'Unfav' : 'Fav')
// }

function toggleFav(resultId, isFaved) {
  console.log(isFaved)
  if (isFaved) {
   removeFav(resultId);
  } else {
    saveFav(resultId);
  }
}

function MapComponent(props) {
  console.log('rendering the map')

  // Use useRef to keep track; initially set to undefined. Console.log ref.current to get the html element 
  const ref = React.useRef();
  
  const [map, setMap] = React.useState();

  const [fav, isFaved] = React.useState({});

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
  }, []); // Empty dependency list as lat, lng, and zoom are hard-coded. Always render the markers. 

// map var comes from a piece of state from line 12
  if (map) {
    console.log('and the map exists')

    // Center the map based on the location of the first result
    const centerPosition = {
      lat: props.results[0].coordinates.latitude, 
      lng: props.results[0].coordinates.longitude
    }
    const barInfo = new google.maps.InfoWindow(
      {
        maxWidth: 400,
      });

    for (const result of props.results) {
      const barMarker = new google.maps.Marker({
        position: {
          lat: result.coordinates.latitude,
          lng: result.coordinates.longitude
        },
        title: result.name,
        icon: {
          url: '/static/img/champagne.png',
          scaledSize: new google.maps.Size(50, 50)
        },
        map: map // this is the map that the marker needs to go on
      });

      // When a user clicks on the bar marker, show bar name and address
      const barInfoContent = (`
        <div class="window-content">
          <h3>${result.name}</h3>
          <img src="${result.image_url}" width="300" height="300" >
          
          <ul class="bar-info"><br>
            <li><b>Address: </b>${result.location.display_address}</li>
            <li><b>Rating: </b>${result.rating} stars</li>
            <li><b><a href="${result.url}">Yelp link</a></b></li>
            <li><b><button onclick="toggleFav('${result.id}', '${result.favorited}')">${result.favorited ? 'Unfav' : 'Fav'}</button></b></li>
          </ul>
        </div>
      `);

// Do I need to separate out the bar info window into its own component in this file?
// How do I create a state for isSaved T/F?
// TODO: Look at documentation to change the button text and the onclick

{/* <li><b><button onclick="saveFav('${result.id}')">Fav</button></b></li>
<li><b><button onclick="removeFav('${result.id}')">unFav</button></b></li> */}

      barMarker.addListener('click', () => {
        barInfo.close();
        barInfo.setContent(barInfoContent);
        barInfo.open(map, barMarker);
      });

      // saveFav.addListener('click', () => {
      //   //add a route in server for the database; import the functions from crud
      //   //Post request to database here
      // });

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
