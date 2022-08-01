// Select the elements
const clear = document.querySelector('.clear');
const list = document.getElementById('list');
const input = document.getElementById('input');
const inputTodo = document.querySelector('.add-to-do');


// Classes name
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;

// get item from localstorage
let data = localStorage.getItem('TODO');

// check if the browser has been used to before (for localstorage)
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the last
    loadlist(LIST);
} else {
    //otherwise...
    LIST = [];
    id = 0;
}

// load items to the user's interface
function loadlist(array) {
    array.forEach(item => {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// Add to do function
function addToDo(todo, id, done, trash) {

    // prevent the code below from running if it is in the trash
    if (trash) { return; }

    // check if to do is completed
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item qwerty">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text" ${LINE}>${todo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>  
                  </li>
                  `

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

// add an item to the list when the user presses the enter key 
inputTodo.addEventListener('keyup', function(event) {
    if(event.keyCode == 13) {
        const toDo = input.value;

        //if the input isn't empty
        if (toDo) {
            addToDo(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id, 
                done : false, 
                trash : false
            });

            // add item to localstorage ( this code must be everywhere the LIST array is updated)
            localStorage.setItem('TODO', JSON.stringify(LIST));

            // ajax code 
            let dict_value = { toDo };  //Pass the javascript variables to a dictionary.
            let todoDB = JSON.stringify(dict_value);  // Stringify converts a JavaScript object or value to a JSON string
            console.log(todoDB);

            $.ajax({
                url:"/stat",
                type:"POST",
                contentType: "application/json",
                data: JSON.stringify(todoDB)
            });

            
            id++;
        }
        input.value = "";
    }
});

// complete to do
function completetodo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do 
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// target the items created dynamically
list.addEventListener('click', function(event) {
    const element = event.target; // returns the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete

    if (elementJob == "complete") {
        completetodo(element);
    }else if (elementJob == "delete") {
        removeToDo(element);
    }

    // add item to localstorage ( this code must be everywhere the LIST array is updated)
    localStorage.setItem('TODO', JSON.stringify(LIST));

});

// clear the localstorage
clear.addEventListener('click', function() {
    localStorage.clear();
    location.reload();
});