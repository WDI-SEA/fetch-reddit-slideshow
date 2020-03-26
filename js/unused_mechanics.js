// Removes the pieces of URL's that cause 403 errors
const validateURLS = () => {
    console.log("Pulling out the 403 causing pieces...")
    imageLocations.foreach((aURL) => { // For each URL in the list of locations
        while(aURL.includes("amp;")) {return aURL.replace("amp;", "")} // While the URL has the problem, remove it
    })
}