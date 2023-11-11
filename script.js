// Global Variables
const itemForm = document.querySelector('#item-form');
const formInput = document.querySelector('#form-input');
const itemList = document.querySelector('#item-list');

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

// Event Listeners
itemForm.addEventListener('submit', addItem);







// Code snippet for reminder
/*
                <li>
                    <p>Bananas</p>
                    <button id="delete-button">
                        <img src="/images/icons/Delete.png" alt="delete-icon" id="delete-icon">
                    </button>
                </li>
*/