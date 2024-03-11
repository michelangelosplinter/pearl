"use strict";

function createLoading(err) {
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
    err.remove();

    // Create loading screen elements
    let img = document.createElement('img');
    img.src = 'resources/LoadingGif.gif';
    img.height = "100";
    img.classList.add("loading");

    let loading = document.createElement('h4');
    loading.textContent = "  Loading ..."
    loading.style.fontFamily = "'IBM Plex Mono', monospace";
    loading.height = "70";
    loading.style.fontSize = "20px";
    loading.classList.add("loading");

    // Add The created DOM Elements
    document.getElementById('maincontainer').appendChild(img);
    document.getElementById('maincontainer').appendChild(loading);
    
    return;
}


function restoreForum(domain, dns, username, password, errMsg, enumBtn) {
    
    let fields = document.querySelectorAll('.loading');
    fields.forEach(field => {
        field.remove();
    });

    // Adding elements to class

    // restoring elemt
    let father = document.querySelector('.inputcontrol')
    father.appendChild(errMsg)
    father.appendChild(domain)
    father.appendChild(dns)
    father.appendChild(username)
    father.appendChild(password)
    father.appendChild(enumBtn)

    fields = document.querySelectorAll('.to-disappear');
    fields.forEach(field => {
        if (field.id != "button") {
            field.value = "";
        }
    });
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


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function main() {

    // Waiting for Enumerate Button to be pressed
    const buttonDom = document.getElementById("LoginForm");
    buttonDom.addEventListener("submit", 
        (e) => {
        // Some java shit.
        e.preventDefault();

        // Get Values Of Input Fields
        const domain = document.getElementById("domain");
        const dns = document.getElementById("dns");
        const username = document.getElementById("username");
        const password = document.getElementById("password");
        const errMsg = document.getElementById("errmsg");
        const enumBtn = document.getElementById("button");

        // Log Input Fields To The Console
        console.log(domain.value);
        console.log(dns.value);
        console.log(username.value);
        console.log(password.value);

        //console.log("checking credentials");
        createLoading(errMsg)
        checkCredentials(username, password)
        .then(
            (response) => {
                // Relative URL to redirect to
                const relativeURL = 'main.html';
                // Construct absolute URL based 
                // on the current location
                const absoluteURL = new URL(relativeURL, window.location.href);

                sleep(3000).then(() => {
                    // Redirect to the absolute URL
                    window.location.href = absoluteURL.href;// Redirect to results page
                    restoreForum(domain, dns, username, password, errMsg, enumBtn)
                });
            }
        )
        .catch(
            (err) => {
                restoreForum(domain, dns, username, password, errMsg, enumBtn)
                // Showing error message
                document.getElementById("errmsg").textContent = err;
            }
        );
    });

    console.log("Done!!");
}


main();
