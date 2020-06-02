const uri = 'api/PlaylistItems';
let entries = [];

function getItems() {
  // grabs information from the "constant" uri which is 'api/PlaylistItems'
  fetch(uri)

    .then(response => response.json())
    .then(data => _displayItems(data))
    .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
  // creates "constant" for textbox with id 'add-songname'
  const addNameTextbox = document.getElementById('add-songname');
  // creates "constant" for textbox with id 'add-artist'
  const addArtist = document.getElementById('add-artist');
  // creates "constant" for textbox with id 'add-date'
  const addDate = document.getElementById('add-date');


  const item = {
    // creates a list for the "constants" that were previously created
    songName:addNameTextbox.value.trim(),
    artist:addArtist.value.trim(),
    date:addDate.value.trim(),
  };

  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
    .then(response => response.json())
    .then(() => {
      // calling getItems function
      getItems();
      addNameTextbox.value = '';
    })
    .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
  fetch(`${uri}/${id}`, {
    method: 'DELETE'
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
  const item = entries.find(item => item.id === id);
  console.log(item);
  document.getElementById('edit-songname').value = item.songName;
  document.getElementById('edit-artist').value = item.artist;
  document.getElementById('edit-date').value = item.date;
  document.getElementById('edit-id').value = item.id;
  // document.getElementById('edit-isComplete').checked = item.isComplete;
  document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
  const itemId = document.getElementById('edit-id').value;
  const item = {
    id: parseInt(itemId, 10),
    // isComplete: document.getElementById('edit-isComplete').checked,
    songName: document.getElementById('edit-songname').value.trim(),
    artist: document.getElementById('edit-artist').value.trim(),
    date: document.getElementById('edit-date').value.trim()
  };

  fetch(`${uri}/${itemId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to update item.', error));

  closeInput();

  return false;
}

function closeInput() {
  document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
  const name = (itemCount === 1) ? 'song' : 'songs';

  document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
  const tBody = document.getElementById('playlist');
  tBody.innerHTML = '';

  _displayCount(data.length);

  const button = document.createElement('button');

  data.forEach(item => {
    // let isCompleteCheckbox = document.createElement('input');
    // isCompleteCheckbox.type = 'checkbox';
    // isCompleteCheckbox.disabled = true;
    // isCompleteCheckbox.checked = item.isComplete;

    let editButton = button.cloneNode(false);
    editButton.innerText = 'Edit';
    editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

    let tr = tBody.insertRow();
    
    let td1 = tr.insertCell(0);
    let songText = document.createTextNode(item.songName);
    td1.appendChild(songText);
    // td1.appendChild(isCompleteCheckbox);

    let td2 = tr.insertCell(1);
    let artistText = document.createTextNode(item.artist);
    td2.appendChild(artistText);

    let td3 = tr.insertCell(2);
    let dateText = document.createTextNode(item.date);
    td3.appendChild(dateText);

    let td4 = tr.insertCell(3);
    td4.appendChild(editButton);

    let td5 = tr.insertCell(4);
    td5.appendChild(deleteButton);
  });

  entries = data;
}