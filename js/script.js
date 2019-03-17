/*
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
*/

const studentList = document.querySelector('.student-list');
const listItems = studentList.children;
const page = document.querySelector('.page');
let numberOfPages = 0;

const result = document.createElement('h1');
page.appendChild(result);

/**
 * Add Search Elements
 */

const pageHeader = document.querySelector('.page-header');
const studentSearch = document.createElement('div');
studentSearch.className = "student-search";
pageHeader.appendChild(studentSearch);

const input = document.createElement('input');
studentSearch.appendChild(input);
input.placeholder = "Search for students...";

const submitButton = document.createElement('button');
submitButton.textContent = "Search";
studentSearch.appendChild(submitButton);


/*
  Hides all students except for the 10 on the chosen page.
*/

function showPage(list, page) {
  for (let i = 0; i < list.length; i++) {
    if (i >= (page * 10 - 10) && i <= (page * 10) - 1) {
      list[i].style.display = 'block';
    } else {
      list[i].style.display = "none";
    }
  }
}

// Shows the first 10 students when the page initially loads
showPage(listItems, 1);


/*
  1. Iterates through list to determine how many pages are needed.
  2. Checks and removes current pagination elements.
  3. Creates div and ul to append new page links.
  4. Creates an li and a tag for each page.
  5. Adds event listener for each page link.
  6. Removes 'active' class on previously clicked page link.
  7. Adds 'active' class to most recent page clicked.
*/

function appendPageLinks(list) {
  for (let i = 0; i <= list.length; i++){
    numberOfPages = i / 10;
  }
  numberOfPages = Math.ceil(numberOfPages);
  
  if (document.querySelector('.pagination')) {
    deletePag = document.querySelector('.pagination')
    deletePag.parentNode.removeChild(deletePag);
  }

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
      showPage(list, i);
      const allATags = document.querySelectorAll('a');
      for (let i = 0; i < allATags.length; i++) {
        allATags[i].classList.remove("active");
  }
      e.target.className = "active";
    });
  }
}

// Shows the initial page links when the page first loads
appendPageLinks(listItems);

/*
 * 1. Searches for students by name and email.
 * 2. Shows students matching input.
 * 3. Hides students that don't match.
 * 4. Displays 'no results found' if no student matches.
 */

function searchForStudents(list) {
  const studentsFound = [];
  for (let i = 0; i < list.length; i++) {
    const studentDetails = document.querySelectorAll('.student-details');
    const h3 = studentDetails[i].children[1];
    const email = document.querySelectorAll('.email');
    if (h3.textContent.toLowerCase().includes(input.value.toLowerCase()) || email[i].textContent.toLowerCase().includes(input.value.toLowerCase())) {
      studentsFound.push(list[i]);
    } else {
      list[i].style.display = 'none';
    }
  }
  appendPageLinks(studentsFound);
  showPage(studentsFound, 1);
  if (studentsFound.length === 0 && input.value.length > 0) {
    result.textContent = "No results found";
  } else {
    result.textContent = "";
  }
}

input.addEventListener('keyup', () => {
  searchForStudents(listItems);
});
submitButton.addEventListener('click', () => {
  searchForStudents(listItems);
});