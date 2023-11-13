// Global Variables
const itemForm = document.querySelector('#item-form');
const formInput = document.querySelector('#form-input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const filter = document.querySelector('.filter');
const filterInput = document.querySelector('#filter');

// Functions

function displayItems () {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDom(item));
    checkUI();
}

function onAddItemSubmit (e) {
    const newItem = formInput.value;
    e.preventDefault();

    //Validate Input
    if (newItem === '') {
        alert('Please enter an item');
        return;
    }

    // create item DOM element
    addItemToDom(newItem);

    // add item to local storage
    addItemToLocalStorage(newItem);
    
    checkUI()

// clear input for next item
    formInput.value = '';
}

// add item to DOM

function addItemToDom (item) {
    // Create list item
    const li = document.createElement('li');
    /*   li.appendChild(document.createTextNode(newItem)); */
    const itemText = createPElement(item);
    li.appendChild(itemText);
    const button = createButton('delete-button');
    li.appendChild(button);
    itemList.appendChild(li);
}

// Create P element

function createPElement(content) {
    const PContent = document.createElement('p')
    PContent.innerText = content;
    return PContent;
}

// Create delete button for list items

function createButton(elementId) {
    const button = document.createElement('button');
    button.id = elementId;
    const image = createButtonImage('delete-icon', '/images/icons/Delete.png', 'delete-icon')
    button.appendChild(image);
    return button;
}

// Create image for delete button

function createButtonImage(buttonImageId, source, altText) {
    const image = document.createElement('img');
    image.id = buttonImageId;
    image.src = source
    image.alt = altText
    return image;
}

// add item to local storage

function addItemToLocalStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    // Add new item to array
    itemsFromStorage.push(item);

    // convert to JSON string and set to local storage 
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// update local storage

function updateLocalStorage(item) {
    const itemsFromStorage = getItemsFromStorage();
    console.log(itemsFromStorage);

    //remove item from array
    const itemIndex = itemsFromStorage.indexOf(item);
    console.log(itemIndex);
    if (itemIndex > -1) {
        itemsFromStorage.splice(itemIndex,1);
    }

    //convert to Json string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// get items from storage

function getItemsFromStorage() {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

// filter while user types 

function filterItems (e) {
    const currentFilter = filterInput.value.toLowerCase();
    const items = itemList.querySelectorAll('li');
    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if (itemName.indexOf(currentFilter) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    })
}

// delete items

function deleteItem(e) {
    itemText = e.target.parentElement.parentElement.textContent;
    if (e.target.parentElement.id === "delete-button") {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove()
            updateLocalStorage(itemText);
            checkUI();
        }
    };
};

//clear all items

function clearItems(e) {
    if (confirm("Are you sure")) {
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        };
        checkUI()
        localStorage.clear();
    };
};

//checkUI

function checkUI () {
    if (itemList.children.length === 0) {
        clearBtn.style.visibility = "hidden";
        filter.style.visibility = "hidden";
    } else {
        clearBtn.style.visibility = "visible";
        filter.style.visibility = "visible";
    }
}

// Initialize app
function init() {
    // Event Listeners
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', deleteItem);
    clearBtn.addEventListener('click', clearItems);
    filter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);
}

init();







// Code snippet for reminder
/*
                <li>
                    <p>Bananas</p>
                    <button id="delete-button">
                        <img src="/images/icons/Delete.png" alt="delete-icon" id="delete-icon">
                    </button>
                </li>
*/