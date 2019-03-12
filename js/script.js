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
let numberOfPages = 0;


/*
  Hides all students except for the 10 on the chosen page.
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

// Shows the first 10 students when the page initially loads
showPage(listItems, 1);


/*
  1. Iterate through list to determine how many pages are needed.
  2. Create div and ul to append page links.
  3. Create an li and a tag for each page.
  4. Add event listener for each page link.
  5. Remove 'active' class on previously clicked page link.
  6. Add 'active' class to most recent page clicked.
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