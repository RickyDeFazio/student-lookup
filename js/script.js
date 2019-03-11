/*
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
*/

/*
  Global variables
*/

const studentList = document.querySelector('.student-list');
const listItems = studentList.children;
const page = document.querySelector('.page');


// creates button 
function createButton() {
  return document.createElement('button');
}

// creates buttons individually but I want to create them dynamically depending on number of pages needed for students

const pageButtons1 = createButton();
const pageButtons2 = createButton();
const pageButtons3 = createButton();
const pageButtons4 = createButton();
const pageButtons5 = createButton();
const pageButtons6 = createButton();

let numberOfPages = 0;

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

/*
  ShowPage function displays 10 students depending on what list is passed into it.
*/


function showPage(listOfStudents) {
  for (let i = 0; i < listOfStudents.length; i++){
    numberOfPages = i / 10;
    if (i < 10) {
      listOfStudents[i].style.display = 'block';
    } else {
      listOfStudents[i].style.display = 'none';
    }
  }
  numberOfPages = Math.ceil(numberOfPages);
  return numberOfPages;
}
showPage(listItems);

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

function appendPageLinks(button, value) {
  page.appendChild(button);
  button.textContent = value;
}

// appends buttons individually
appendPageLinks(pageButtons1, "1");
appendPageLinks(pageButtons2, "2");
appendPageLinks(pageButtons3, "3");
appendPageLinks(pageButtons4, "4");
appendPageLinks(pageButtons5, "5");
appendPageLinks(pageButtons6, "6");


// create event listener , when button clicked, show corresponding 10 students

pageButtons1.addEventListener('click', () => {
  for (let i = 0; i < listItems.length; i++){
    if (i < 10) {
      listItems[i].style.display = 'block';
    } else {
      listItems[i].style.display = 'none';
    }
  }
});

pageButtons2.addEventListener('click', () => {
  for (let i = 0; i < listItems.length; i++){
    if (i < 10 || i > 19) {
      listItems[i].style.display = 'none';
    } else {
      listItems[i].style.display = 'block';      
    }
  }
});

pageButtons3.addEventListener('click', () => {
  for (let i = 0; i < listItems.length; i++){
    if (i < 20 || i > 29) {
      listItems[i].style.display = 'none';
    } else {
      listItems[i].style.display = 'block';      
    }
  }
});

pageButtons4.addEventListener('click', () => {
  for (let i = 0; i < listItems.length; i++){
    if (i < 30 || i > 39) {
      listItems[i].style.display = 'none';
    } else {
      listItems[i].style.display = 'block';      
    }
  }
});

pageButtons5.addEventListener('click', () => {
  for (let i = 0; i < listItems.length; i++){
    if (i < 40 || i > 49) {
      listItems[i].style.display = 'none';
    } else {
      listItems[i].style.display = 'block';      
    }
  }
});

pageButtons6.addEventListener('click', () => {
  for (let i = 0; i < listItems.length; i++){
    if (i < 50 || i > 59) {
      listItems[i].style.display = 'none';
    } else {
      listItems[i].style.display = 'block';      
    }
  }
});