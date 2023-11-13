// Global Variables
const itemForm = document.querySelector('#item-form');
const formInput = document.querySelector('#form-input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const filter = document.querySelector('.filter');
const filterInput = document.querySelector('#filter');

// Functions

function addItem (e) {
    
    const newItem = formInput.value;
    e.preventDefault();

    //Validate Input
    if (newItem === '') {
        alert('Please enter an item');
        return;
    }

    // Create list item
    const li = document.createElement('li');
 /*   li.appendChild(document.createTextNode(newItem)); */
    const itemText = createPElement(newItem);
    li.appendChild(itemText);
    const button = createButton('delete-button');
    li.appendChild(button);
    itemList.appendChild(li);
    revealFilter();
    revealClearBtn();

//clear input for next item
    formInput.value = '';
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
    if (e.target.parentElement.id === "delete-button") {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove()
    }};
    if (itemList.children.length === 0) {
        hideFilter();
        hideClearBtn();
    };
};

//clear all items

function clearItems(e) {
    if (confirm("Are you sure")) {
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
            hideFilter();
            hideClearBtn();
        }
    };
};
//reveal clear button

const revealClearBtn = () => clearBtn.style.visibility = "visible";

//hide clear button

const hideClearBtn = () => clearBtn.style.visibility = "hidden";

//reveal filter
const revealFilter = () => filter.style.visibility = "visible";

// hide filter
const hideFilter = () => filter.style.visibility = "hidden";

// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', deleteItem);
clearBtn.addEventListener('click', clearItems);
filter.addEventListener('input', filterItems);







// Code snippet for reminder
/*
                <li>
                    <p>Bananas</p>
                    <button id="delete-button">
                        <img src="/images/icons/Delete.png" alt="delete-icon" id="delete-icon">
                    </button>
                </li>
*/