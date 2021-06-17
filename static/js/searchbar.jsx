//look into react.fragment instead of returning 1 massive div
//google how to use javascript fetch to call on the Yelp api; we only learned python fetch but you can refer to the AJAX lecture
// you would create a function to call api, save in state, render state... deal w promises

"use strict";

//if you pass props in the fn, you can use props (see TC lab)
// i.e. <h2>Name: {props.name}</h2>
// you can also const inside this fn, and pass it in return ( <> {xx} </>)

//don't use action form below..
// I need to collect st, city, state
function Search() {
    return (
        <React.Fragment>
        <div className="searchbar">
 
            <form action="/search" method="POST">
                <p>
                    Zipcode <input type="zipcode" name="zipcode"></input>
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


//AJAX lecture
$('#search').on('submit', (evt) => {
    evt.preventDefault();

    //Get user input from the form above
    const formData = {
        zipcode: $('#zipcode').val()
    };
    //Send formData to a route in server (becomes a query string)
    //TODO: fix route; make the route "/asdf.json" and return jsonify({"asdf": value})
    $.get('/', formData, (res) => {
        //display response from server...as in return the list of bars?
        alert('we found ${res.??} number of bars');
    });
});



$('#search').on('submit', (evt) => {
    evt.preventDefault();

    alert("Test");

//keep jquery and js consistent
//get data from server file

    fetch(`/api/yelpsearch?${whattevervariable from user input from a form}`)
        .then(response => response.json())
        .then(data => console.log(data));
});

