/*
Create and append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;

   // 💬 Select the 'student-list' ul tag to show the list
   const studentList = document.querySelector('.student-list');

   // 💬 Clean the 'studentList' 
   studentList.innerHTML = '';

   // 💬 Loop inside the 'list' parameter  
   for (let i = 0; i < list.length; i++) {

      // 💬 Check if 'i' is between 'startIndex' and 'endIndex'
      if (i >= startIndex && i < endIndex) {
         const student = `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>
         `;
         studentList.insertAdjacentHTML("beforeend", student);
      }
   }
}

/* 
Create and append the elements needed for the pagination buttons
*/
function addPagination(list) {
   // 💬 Create the quantity of pagination needed
   const numOfPages = Math.ceil(list.length / 9);

   // 💬 Select the 'link-list' ul tag to show the pagination
   const linkList = document.querySelector('.link-list');

   // 💬 Clean the 'linkList'
   linkList.innerHTML = '';

   // 💬 Loop the number of pagination needed 
   for (let i = 1; i <= numOfPages; i++) {
      const pagination = `
         <li>
            <button type="button">${i}</button>
         </li>
      `;
      linkList.insertAdjacentHTML("beforeend", pagination);
   }

   // 💬 Select the FIRST button of the pagination
   const firstPagination = document.querySelector('.link-list button:first-child');

   // 💬 Add a class 'active' to 'firstPagination'
   firstPagination.classList.add('active');

   // 💬 Update the page on CLICK event
   linkList.addEventListener('click', e => {

      if (e.target.type === 'button') {
         // 💬 Select the button with 'active' class
         let activeButton = document.querySelector('.link-list button[class="active"]');

         // 💬 Remove 'active' class from any other pagination
         activeButton.classList.remove('active');

         // 💬 Add 'active' class to the button clicked
         e.target.classList.add('active');

         const currentPage = e.target.innerHTML;

         // 💬 Call 'showPage' function to refresh
         showPage(list, currentPage);
      }

   });
}

/* 
Create and append search component
*/
window.addEventListener('load', () => {
   // 💬 Select the 'header' tag
   const header = document.querySelector('.header');

   // 💬 Create 'search' component and append to HTML
   const searchComponent = `
      <label for="search" class="student-search">
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
   `;
   header.insertAdjacentHTML("beforeend", searchComponent);

   // 💬 Select and add event listener to search elements
   const buttonSearchElement = document.querySelector('button[type="button"]');
   const inputSearchElement = document.querySelector('#search');
   buttonSearchElement.addEventListener('click', search);
   inputSearchElement.addEventListener('keyup', search);

});

/* 
Search the value typed in the search box
*/
function search() {
   // 💬 Get the value in 'search' input in 'LowerCase'
   const contentSearch = document.querySelector('#search').value.toLowerCase();

   // 💬 Create a regex globally
   const myRegex = new RegExp(contentSearch, 'g');

   // 💬 Create a new array to store the new data
   let studentsFiltered = [];

   // 💬 Loop the 'data' for each person 
   data.forEach(person => {
      // 💬 Get the full name for each person
      let fullName = `${person.name.first} ${person.name.last}`.toLowerCase();

      // 💬 Search the name 
      let dataFound = fullName.search(myRegex);

      // 💬 Check if the name was found if it was we push into our new array
      if (dataFound !== -1) {
         studentsFiltered.push(person);
      }
   });

   // 💬 Get the message 'Not Found'
   const messageNoFound = document.querySelector('.js-message');
   // 🚧 WIP 🚧
   if (studentsFiltered.length === 0) {

      // 💬 If the message of 'Not found' does not exist we create it
      if (messageNoFound === null) {
         const paginationSection = document.querySelector('.pagination');
         const message = '<div class="js-message">No results found</div>';
         paginationSection.insertAdjacentHTML("beforeend", message);
      }

      // 💬 Clear all the students and pagination
      clear();
   } else {
      // 💬 Update the page and pagination with only the 'studentsFiltered'
      showPage(studentsFiltered, 1);
      addPagination(studentsFiltered);

      // 💬 If the message of 'Not found' exists delete it
      if (messageNoFound !== null) {
         messageNoFound.remove();
      }
   }
}

/* 
Clear the list of students and pagination
*/
function clear() {
   // 💬 Select the 'student-list' ul tag to show the list
   const studentList = document.querySelector('.student-list');

   // 💬 Clean the 'studentList' 
   studentList.innerHTML = '';

   // 💬 Select the 'link-list' ul tag to show the pagination
   const linkList = document.querySelector('.link-list');

   // 💬 Clean the 'linkList'
   linkList.innerHTML = '';
}

// Call functions
showPage(data, 1);
addPagination(data);