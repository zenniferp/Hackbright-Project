"use strict";

// Show Form

function Search() {
    return (
        <React.Fragment>
        <div className="searchbar">
 
            <form action="/search" method="POST">
                <p>
                    Street <input type="street" name="street"></input>
                </p>
                <p>
                    City <input type="city" name="city"></input>
                </p>
                <p>
                    State <input type="state" name="state"></input>
                </p>
                <p>
                    Radius <input type="radius" name="radius"></input>
                </p>
                <p>
                    <input type="submit"></input>
                </p>
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
