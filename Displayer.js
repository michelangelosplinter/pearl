function getData(url) {
  /*\
 / * \
 \ * /---------------------------------------------------------------------------------
  |*| This function is responsible for reaching out to the back-end server and getting |
  |*| back the data as json format.                                                    |
  |*|    --------------------------------        ----------------------------------    |
  |*| NOTE!                                                                            |
  |*|   This function is asynchronic so we need to wait for it to finish using await   |
 / * \---------------------------------------------------------------------------------
 \ * /
  \*/
  return new Promise((resolve, reject) => (

    // Sending data to url
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
      // Getting response
      .then(response => response.json())

      // converting response to json & returning
      .then(response => {
        resolve(JSON.stringify(response))
      })
  ));
}


function hideEl(element) {
  // This function hides a dom element
  element.style.visibility = "hidden"
}


function unhideEl(element) {
  // This function make a dom element visible
  element.style.visibility = "visible"
}


function filter(button) {
  /*\_______________________________________________________________________________
  |*| This function either converts a filter button to the current-filter container |
  |*| and unhides it's corresponding enumerated items or does the exact oppisite.___|
  \*/

  // checking wether button is in .filters or .current-filters
  const parentId = button.parentNode.className;
  if (parentId == "filters") {
    button.remove();
    document.querySelector('.current-filters').appendChild(button);

    // Select all Elements in the filter class and hide them
    let els = document.querySelectorAll(`.${button.id}`);
    els.forEach(el => {
      unhideEl(el);
    });
  } else if (parentId == "current-filters") {
    button.remove();
    document.querySelector('.filters').appendChild(button);

    // Select all Elements in the filter class and show them
    let els = document.querySelectorAll(`.${button.id}`);
    els.forEach(el => {
      hideEl(el);
    });
  }
}


function displayContent(jsonElement) {
  /*\______________________________________________________________________________
  |*|This function removes all existing attributes from the attrib-container <div> |
  |*|and replaces them with newly created ones.____________________________________|
  \*/

  // Show the content container
  unhideEl(document.querySelector('.content-container'));

  // Aquire father element 
  const attribContainer = document.querySelector('.attrib-container')

  // Change name
  document.querySelector('.name-attrib').innerText = jsonElement["Name"]

  // Create a tuple that contains elmenets matching the attribute of the jsonElement.
  const arrayofnewattribs = (Object.keys(jsonElement).map((key) => {
    // Create elements
    const attribDiv = document.createElement('div');
    const attribKey = document.createElement('p');
    const attribValue = document.createElement('p');

    // Add Classes
    attribDiv.classList.add("attribute");
    attribKey.classList.add("key");
    attribValue.classList.add("value");

    // Add Content
    attribKey.innerText = `${key}:`;
    attribValue.innerText = jsonElement[key];

    attribDiv.appendChild(attribKey);
    attribDiv.appendChild(attribValue);

    return attribDiv;
  }))

  // Replace the existing attribute elements in the container with the new ones.
  attribContainer.replaceChildren(...arrayofnewattribs)
}


async function main() {

  // Get JSON data from backend
  let data = await getData('http://127.0.0.1:8089/users');
  const userJson = JSON.parse(data)
  console.log(userJson);

  data = await getData('http://127.0.0.1:8089/groups');
  const groupJson = JSON.parse(data)
  //console.log(groupJson);

  // Get Father item
  const father = document.querySelector(".enumerated-items");

  // Create Enumerated Items 
  if (userJson) {
    for (let i = 0; i < userJson.length; i++) {

      // Create and define newUser
      let newUser = document.createElement("button");
      newUser.classList.add('btnUsers');
      newUser.classList.add('enumerated-item');
      newUser.innerText = userJson[i]["Name"];

      // Add newUser to html page
      father.appendChild(newUser);

      // Add the Event Listener
      newUser.addEventListener("click", function () {
        for (let i = 0; i < userJson.length; i++) {
          if (userJson[i]["Name"] == newUser.innerText) {
            displayContent(userJson[i]);
          }
        }
      });
    }
  }
  if (groupJson) {
    for (let i = 0; i < groupJson.length; i++) {

      // Create and define newGroup
      let newGroup = document.createElement("button");
      newGroup.classList.add('btnGroups');
      newGroup.classList.add('enumerated-item');
      newGroup.innerText = groupJson[i]["Name"];

      // Add newGroup to html page
      father.appendChild(newGroup);

      // Add the Event Listener
      newGroup.addEventListener("click", function () {
        for (let i = 0; i < groupJson.length; i++) {
          if (groupJson[i]["Name"] == newGroup.innerText) {
            displayContent(groupJson[i]);
          }
        }
      });
    }
  }

  // Create The Filter Event Listeners
  const filterbuttons = document.querySelectorAll('.filters>button');
  filterbuttons.forEach((button) => {
    button.addEventListener("click", function () {
      filter(button);
    });
  });
}


main()