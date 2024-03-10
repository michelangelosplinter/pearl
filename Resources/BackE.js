const { exec } = require('child_process');

// Calllinnnnn a Powergell purcess
exec("powershell.exe -file psServer.ps1 -username madorcyber@gmail.com -password Sitani16092019", (error, stdout, stderr) => {

  if (error) {
    console.error(`exec error: ${error}`);
    return;
  } else {
    if (stdout == 1) {
      const fs = require("fs");
      fs.readFile("./1.json", "utf8", (err, jsonString) => {
        if (err) {
          console.log("Error reading file from disk:", err);
          return;
        }
        try {
          const customer = JSON.parse(jsonString);
          console.log("Username is:", customer.name[0]); // => "Customer address is: Infinity Loop Drive"
        } catch (err) {
          console.log("Error parsing JSON string:", err);
        }
      });
    } else {
      console.log("Command Execution Failed")
    }

  }
});

/*
// Calllinnnnn a Powergell purcess
var spawn = require("child_process").spawn;
spawn("powershell.exe",[".\\psServer.ps1 -username madorcyber@gmail.com -password Sitni16092019"]);

// Fuck thuis ba·guette (ᵇᵃˈᵍᵉᵗ)
*/