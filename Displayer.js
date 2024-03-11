function getData(url) {
  return new Promise((resolve, reject) => (
    fetch(url, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
      },
    })
     .then(response => response.json())
     .then(response => {
      resolve(JSON.stringify(response))
    })
  ));
}


async function main() {

  // Get JSON data from backend
  let data = await getData('http://127.0.0.1:8081/users');
  const userJson = JSON.parse(data)
  console.log(userJson);

  data = await getData('http://127.0.0.1:8081/groups');
  const groupJson = JSON.parse(data)
  console.log(groupJson);


  // <button id="btnUsers" class="Top-Buttons">Users</button>
  if (userJson) {
    for (i = 0; i < userJson.length; i++){
      let newUser = document.createElement("button");
      newUser.classList.add('user');
      newUser.innerText = userJson[i]["Name"];
      const father = document.querySelector(".enumerated-items");
      father.appendChild(newUser);
    }
  }
  if (groupJson) {
    for (i = 0; i < groupJson.length; i++){
      let newGroup = document.createElement("button");
      newGroup.classList.add('group');
      newGroup.innerText = groupJson[i]["Name"];
      const father = document.querySelector(".enumerated-items");
      father.appendChild(newGroup);
    }
  }

  // Create The Filter Event Listeners


}


main()