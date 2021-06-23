"use strict";

//TODO   Make lat and lng, zoom props on MapComponent, pass markers as a list as props (watch lecture)
//TODO MAke this show up in homepage not /map

function MapComponent(props) {
  console.log('rendering the map')
  //const options = props.options; to center the map

  const ref = React.useRef();
  React.useEffect(() => {

    if (!window.google) { // Create an html element with a script tag in the DOM
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAjpErE26dDxvQMnZS8I-cUOGjz6WW3rik&libraries=places';
      document.head.append(script);
      script.addEventListener('load', ()=>new window.google.maps.Map(ref.current, {center: { lat: -34.397, lng: 150.644 },zoom: 8}));
      console.log('and now there is a map')
      return () => script.removeEventListener('load', ()=>new window.google.maps.Map(ref.current));
    } else { // Initialize the map if a script element with google url IS found
      new window.google.maps.Map(ref.current, {center: { lat: -34.397, lng: 150.644 },zoom: 8});
      console.log('and now there is a map');
    }
  }, []); //make an empty array for now
  
  //[options.center.lat]); //<- this list should include the lat, long, zoom, marker props

  if (props.map) {
    console.log('and the map exists')
  } else { console.log('but there is no map')}

  return (
    <div id="map-div"
      style={{ height: 800, 
        margin: `1em 0`, borderRadius: `0.5em`, 
        width: 800 }}
      ref={ref}
    ></div>
  )
}