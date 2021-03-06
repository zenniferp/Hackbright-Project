"use strict";

function Search(props) {

// Return state value and updating function
// First you wouldn't have any value so pass an empty string

    const [street, updateStreet] = React.useState("")
    const [city, updateCity] = React.useState("")
    const [state, updateState] = React.useState("")
    const [radius, updateRadius] = React.useState("")

    const [results, updateResults] = React.useState([])

// Redirect to a map view
    let history = ReactRouterDOM.useHistory();
    const [showMap, updateShowMap] = React.useState(false)

// Get data from the backend
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const data = {street, city, state, radius}

// Parse the data from the Yelp API/server as json.
        fetch('api/search', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        ).then(response => response.json())
        .then(data => {updateResults(data)})
        .then(() => updateShowMap(true))
    }

// Show Form
// Pass the user input (evt target value) and update state
    return (
        <React.Fragment>
            <div className="search">
                <p> Search for a rooftop bar near you! </p>
                <form onSubmit = {handleSubmit}>
                    <p>
                    <input
                        type="text"
                        value={street}
                        name="street"
                        placeholder="street"
                        onChange={evt => updateStreet(evt.target.value)} required={true} />
                    </p><p>
                    <input
                        type="text"
                        value={city}
                        name="city"
                        placeholder="city"
                        onChange={evt => updateCity(evt.target.value)} required={true} />
                    </p><p>
                    <input
                        type="text"
                        value={state}
                        name="state"
                        placeholder="state"
                        onChange={evt => updateState(evt.target.value)} required={true} />
                    </p><p>
                    <input
                        type="number"
                        value={radius}
                        name="radius"
                        placeholder="within how many miles?"
                        onChange={evt => updateRadius(evt.target.value)} required={true} />
                    </p>
                    <button type="submit">Search</button>
                </form>
            </div>
            {showMap && <MapComponent results={results}/>}
        </React.Fragment>
    );
}


