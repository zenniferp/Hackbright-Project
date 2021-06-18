"use strict";

// Frontend > Server > Yelp > Server > Frontend


//Do I need to pass props here?

function Search() {
// Process user input
    const handleInput = (evt) => {
        searchBars(evt.target.value)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        //?
    }
// Show Form
    return (
        <React.Fragment>
        <div className="searchbar">
            <p> Search for a rooftop bar near you! </p>
            <form onSubmit = {handleSubmit}>
                <input
                    type="text"
                    value={street}
                    name="street">
                    onChange={handleInput} required={true}/>
                <input
                    type="text"
                    value={city}
                    name="city">
                    onChange={handleInput} required={true}/>
                <input
                    type="text"
                    value={state}
                    name="state">
                    onChange={handleInput} required={true}/>
                <input
                    type="text"
                    value={radius}
                    name="radius">
                    onChange={handleInput} required={true}/>
                <button type="submit">Search</button>
            </form>  
        </div>
        </React.Fragment>
    );
}

ReactDOM.render(<Search />, document.querySelector("#search"));

// Populate this React component with data from the server
React.useEffect(() => {
    fetch("/api/search")
        .then((response) => response.json());
},[]);

//useState: she set it empty. When user hits submit, it updates the state of searchPlant
// line 190 

//OLD CODE BELOW
//AJAX lecture
// $('#search').on('submit', (evt) => {
//     evt.preventDefault();

//     //Get user input from the form above
//     const formData = {
//         zipcode: $('#zipcode').val()
//     };
//     //Send formData to a route in server (becomes a query string)
//     //TODO: fix route; make the route "/asdf.json" and return jsonify({"asdf": value})
//     $.get('/', formData, (res) => {
//         //display response from server...as in return the list of bars?
//         alert('we found ${res.??} number of bars');
//     });
// });



// $('#search').on('submit', (evt) => {
//     evt.preventDefault();

//     alert("Test");


//     fetch(`/api/yelpsearch?${whattevervariable from user input from a form}`)
//         .then(response => response.json())
//         .then(data => console.log(data));
// });

//RANDOM NOTES
//keep jquery and js consistent
//look into react.fragment instead of returning 1 massive div
//if you pass props in the fn, you can use props (see TC lab)
// i.e. <h2>Name: {props.name}</h2>
// you can also const inside this fn, and pass it in return ( <> {xx} </>)
