/*
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
*/

/*
   Add your global variables that store the DOM elements you will
   need to reference and/or manipulate.
*/
const studentList = document.querySelector('.student-list');
const listItems = studentList.children;
const page = document.querySelector('.page');

let numberOfPages = 0;


/*
   Create the `showPage` function to hide all of the items in the
   list except for the ten you want to show.
*/

function showPage(listOfStudents, page) {
  for (let i = 0; i < listOfStudents.length; i++) {
    if (i >= (page * 10 - 10) && i <= (page * 10) - 1) {
      listOfStudents[i].style.display = 'block';
    } else {
      listOfStudents[i].style.display = "none";
    }
  }
}

showPage(listItems, 1);

/*
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
*/

function appendPageLinks(list) {
  for (let i = 0; i <= list.length; i++){
    numberOfPages = i / 10;
  }
  numberOfPages = Math.ceil(numberOfPages);
  const paginationDiv = document.createElement('div');
  paginationDiv.className = "pagination";
  page.appendChild(paginationDiv);
  const ul = document.createElement('ul');
  paginationDiv.appendChild(ul);

  for (let i = 1; i <= numberOfPages; i++) {
    const li = document.createElement('li');
    ul.appendChild(li);
    const a = document.createElement('a');
    li.appendChild(a);
    a.textContent = i;
    a.addEventListener('click', (e) => {
      showPage(listItems, i);
      const allATags = document.querySelectorAll('a');
      for (let i = 0; i < allATags.length; i++) {
        allATags[i].classList.remove("active");
  }
      e.target.className = "active";
    });
  }
}

appendPageLinks(listItems);