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
    img.src ='LoadingGif.gif';
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


function checkCredentials(domain, dns, username, password) {

    if (username.value == "" || password.value == "") {
        
        // Reseting fields
        domain.value = ""
        dns.value = ""
        username.value = ""
        password.value = ""

        // Showing error message
        document.getElementById("errmsg").textContent = "* you must enter username/password";

    } else {
        
        // 
        createLoading();
    }

}


function main() {

    // Waiting for Enumerate Button to be pressed
    const buttonDom = document.getElementById("LoginForm");
    buttonDom.addEventListener("submit", (e) => {
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

        // Check credentials
        checkCredentials(domain, dns, username, password);
    });
}


main();