//class for item that takes a name and id 
class Item {
    constructor(name, id){
        this.name = name
        this.id = id
    }
}

//array of items
let items = []

//items Id that will be incremented with each new item added
let itemId = 0; 


//onclick function that takes the id given to each new item and an action which will be a function
function onclick (id, action){
    let element = document.getElementById(id); //take the element (in this case an item)by its id 
    element.addEventListener('click', action); //add an event listern to it 
    return element; //return the element 
}

//call of the function onclick to the new item button "Add Grocery Item"
 onclick('new-item-btn', () =>{
    const itemName = getValue('new-item'); //to get the items name -- get the value from the input box 'new-item' the user will type in 
    const item = new Item(itemId++, itemName); //with each call of onclick function - a new item will be created with an incremented id and its item name 
    items.push(item) //take the new item and push it to the items array 
    createItemRow(item) // with each new item added to the list -- create a new row on the table 
    clearinput('new-item') //function to clear the input box everytime a new item is added 
    
})

//clear input function to set the input box to an empty string for a new item to easily be entered
function clearinput(id){
    document.getElementById(id).value = '';
}

// finds the value of an item entered in the input box effectively finding its name
function getValue(id){
    return document.getElementById(id).value;
}

//
function createDeleteItemButton(item){
    let btn = document.createElement('button'); //creating a button in our HTML doc
    btn.className='btn btn-info'; //set the buttons style
    btn.innerHTML='Delete Item'; //set the buttons text 
    btn.onclick = () => { //add the onclick function to the button 
        let index = items.indexOf(item); //finds the index of the item in the items array 
        if (index !== -1) { // if the index is not equal to -1 it will cut out the one item at the specified index 
            items.splice(index, 1);
            refreshTable(); //function to redraw the table 
        } 
    };
    return btn;
}

//Reset: attaching an event listener to the button so it will clear the table body and empty the items array 
document.getElementById('clearList').addEventListener('click', ()=>{
    let tableBody = document.querySelector('#grocery-list');
    tableBody.innerHTML = ''
    items = [];
})

//function to create a new item row when a new item is created, along with the delete button and checkbox 
function createItemRow (item) {
    let tableBody = document.getElementById('grocery-list');
    let itemRow = tableBody.insertRow(0);
    let itemCell= itemRow.insertCell(0); 
    let deleteItemCell = itemRow.insertCell(1);
    let checkBoxCell = itemRow.insertCell(2)
    itemCell.textContent = `${item.id}`
    deleteItemCell.appendChild(createDeleteItemButton(item))
    checkBoxCell.appendChild(createCheckbox());

}

//function clears the table body, resets the itemId and then re-adds each item in the items array to refresh the table with the current list of items after deleting one 
function refreshTable(){
    let tableBody = document.querySelector('#grocery-list');
    tableBody.innerHTML = ''
    itemId = 0 
    items.forEach(item => createItemRow(item))
}
//add a checkbox function to each item row for users to check off their items on their list 
function createCheckbox(){
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox'
    checkbox.addEventListener('change', () => {
        if(checkbox.checked){
            alert('Nice work! Feels good to cross something off your list!')
        } 
    })
    return checkbox;
}

