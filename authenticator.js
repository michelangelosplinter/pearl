"use strict";

function createLoading() {
    /** 
     * This Function handles the first stage of the submit button 
     * event handling. It Edits The DOM Elements to Create The login 
     * screen.
    */

    // Select all Elements in the maincontainer and remove them
    const fields = document.querySelectorAll('.to-disappear');
    fields.forEach(field => {
        field.remove();
    });
    document.getElementById("errmsg").remove();

    // Create loading screen elements
    let img = document.createElement('img');
    img.src = 'resources/LoadingGif.gif';
    img.height = "100";
    let loading = document.createElement('h4');
    loading.textContent = "  Loading ..."
    loading.style.fontFamily = "'IBM Plex Mono', monospace";
    loading.height = "70";
    loading.style.fontSize = "20px";

    // Add The created DOM Elements
    document.getElementById('maincontainer').appendChild(img);
    document.getElementById('maincontainer').appendChild(loading);
    
    return;
}


function checkCredentials(username, password) {
    /*
     * This function checks the input given by the user and 
     * in case of success calls the createlogin() function.
     */
    return new Promise((resolve, reject) => {
        if (username.value == "" || password.value == "")
            reject("Username/Password is blank");
        resolve();
    })
}


function main() {

    // Waiting for Enumerate Button to be pressed
    const buttonDom = document.getElementById("LoginForm");
    buttonDom.addEventListener("submit", 
        (e) => {
        // Some java shit.
        e.preventDefault();

        // Get Values Of Input Fields
        let domain = document.getElementById("domain");
        let dns = document.getElementById("dns");
        let username = document.getElementById("username");
        let password = document.getElementById("password");

        // Log Input Fields To The Console
        console.log(domain.value);
        console.log(dns.value);
        console.log(username.value);
        console.log(password.value);

        //console.log("checking credentials");
        createLoading()
        checkCredentials(username, password)
        .then(
            (response) => {
                // Relative URL to redirect to
                const relativeURL = 'main.html';
                // Construct absolute URL based 
                // on the current location
                const absoluteURL = new URL(relativeURL, window.location.href);

                // Log the absolute URL (optional)
                //console.log('Redirecting to:', absoluteURL.href);

                // Redirect to the absolute URL
                //console.log("Starting redirect");
                window.location.href = absoluteURL.href;// Redirect to results page
            }
        )
        .catch(
            (err) => {
                // Reseting fields
                domain.value = ""
                dns.value = ""
                username.value = ""
                password.value = ""

                // Showing error message
                document.getElementById("errmsg").textContent = err;
            }
        );
    });

    console.log("Done!!");
}


main();
