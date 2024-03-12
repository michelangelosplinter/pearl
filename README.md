**<h1>About Pearl</h1>**

<img src="https://github.com/michelangelosplinter/pearl/blob/main/Resources/Pearl_Logo.png" width=350>

Pearl is a Powershell X Javascript based Domain Enumerator that presents the gathered data with a Gui. The tool consists of a Javascript Front-end resopsible for managing the Gui and presentation of data, and a Powershell Back-end that uses LDAP requests to gather data about the domain. The data is exchanged using an implementation of RESTful API and stored in a JSON format.

**<h3>Powershell Part</h3>**

<img width=100 align=right src="https://github.com/michelangelosplinter/pearl/assets/143991999/def1afff-50b1-4d37-8d3c-ee5c0281211e">

The entire back-end of the web page is a powershell server named "psServer.ps1". It utilizes the "Microsoft Active Directory Management" DLL 
