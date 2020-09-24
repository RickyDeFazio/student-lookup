// Global Variables

const page = document.querySelector('.page');
const pageHeader = document.querySelector('.page-header');
const studentList = document.createElement('ul');
const listItems = studentList.children;
const result = document.createElement('h2');
const studentSearch = document.createElement('div');
const input = document.createElement('input');
let numberOfPages = 0;

studentList.className = 'student-list';
studentSearch.className = "student-search";
input.placeholder = "Search for students...";

// Append elements to DOM
page.appendChild(studentList);
page.appendChild(result);
pageHeader.appendChild(studentSearch);
studentSearch.appendChild(input);

/**
 * Main logic for initial setup
 */
async function main() {
  await populateStudents();
  appendPageLinks(listItems);
  showPage(listItems, 1);
  document.querySelector('.pagination a').classList.add('active');
}

/**
 * Fetches students from API
 */
async function getStudents() {
  try {
    const res = await fetch('https://randomuser.me/api/?results=100');
    return res.json();
  }
  catch(error) {
    console.error(error);
  }
}

/**
 * Acquires student data and creates DOM structure for students
 */
async function populateStudents() {
  const data = await getStudents();
  const { results: users } = data;
  let html = ``;

  users.forEach(user => {
    html += /*html*/ `
      <li class="student-item cf">
        <div class="student-details">
          <img class="avatar" src="${user.picture.thumbnail}">
          <h3>${user.name.first} ${user.name.last}</h3>
            <span class="email">${user.email}</span>
        </div>
        <div class="joined-details">
          <span class="date">Joined Recently</span>
        </div>
      </li>
    `;
  })

  studentList.innerHTML = html;
}

/**
 * Hides all students except for the 10 on the chosen page.
 * @param {HTMLCollection} students List of students
 * @param {Number} page Current page
 */
function showPage(students, page) {
  Array.from(students).forEach((student, i) => {
    if (i >= (page * 10 - 10) && i <= (page * 10) - 1) {
      student.style.display = 'block';
    } else {
      student.style.display = "none";
    }
  })
}

/**
 * - Iterates through list to determine how many pages are needed.
 * - Checks and removes current pagination elements.
 * - Creates div and ul to append new page links.
 * - Creates an li and a tag for each page.
 * - Adds event listener for each page link.
 * - Removes 'active' class on previously clicked page link.
 * - Adds 'active' class to most recent page clicked.
 * @param {HTMLCollection} students
 */
function appendPageLinks(students) {
  const paginationEl = document.querySelector('.pagination');
  const paginationDiv = document.createElement('div');
  const ul = document.createElement('ul');

  paginationDiv.className = "pagination";
  page.appendChild(paginationDiv);
  paginationDiv.appendChild(ul);

  for (let i = 0; i <= students.length; i++){
    numberOfPages = i / 10;
  }

  numberOfPages = Math.ceil(numberOfPages);

  if (paginationEl) {
    paginationEl.parentNode.removeChild(paginationEl);
  }

  for (let i = 1; i <= numberOfPages; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');

    a.textContent = i;
    ul.appendChild(li);
    li.appendChild(a);

    a.addEventListener('click', (e) => {
      const activeTags = document.querySelectorAll('a.active');
      showPage(students, i);
      activeTags.forEach(a => {
        a.classList.remove("active");
      })
      e.target.className = "active";
    });
  }
}

/**
 * - Searches for students by name and email.
 * - Shows students matching input.
 * - Hides students that don't match.
 * - Displays 'no results found' if no student matches.
 * @param {HTMLCollection} students
 */
function searchForStudents(students) {
  const studentsFound = [];

  Array.from(students).forEach((student, i) => {
    const studentDetails = document.querySelectorAll('.student-details');
    const name = studentDetails[i].children[1];
    const email = document.querySelectorAll('.email');
    const hasName = name.textContent.toLowerCase().includes(input.value.toLowerCase());
    const hasEmail = email[i].textContent.toLowerCase().includes(input.value.toLowerCase());

    hasName || hasEmail ? studentsFound.push(student) : student.style.display = 'none';
  })

  appendPageLinks(studentsFound);
  showPage(studentsFound, 1);

  if (studentsFound.length === 0 && input.value.length > 0) {
    result.textContent = "No results found";
  } else {
    result.textContent = "";
    document.querySelector('.pagination a').classList.add('active');
  }
}

// Event listeners
input.addEventListener('keyup', () => {
  searchForStudents(listItems);
});

main();
