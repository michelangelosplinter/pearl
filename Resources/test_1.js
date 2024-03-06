const loginForm = document.getElementById("LoginForm");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let domain = document.getElementById("domain").value;
    let dns = document.getElementById("dns").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
  
    console.log(domain);
    console.log(dns);
    console.log(username);
    console.log(password);
  });



/*
// Calllinnnnn a Powergell purcess
var spawn = require("child_process").spawn;
spawn("powershell.exe",[".\\psServer.ps1 -username madorcyber@gmail.com -password Sitni16092019"]);

// Fuck thuis ba·guette (ᵇᵃˈᵍᵉᵗ)
*/