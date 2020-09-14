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
         // console.log(e.target.innerHTML);

         // 💬 Call 'showPage' function to refresh
         showPage(data, currentPage);
      }

   });
}

// Call functions
showPage(data, 1);
addPagination(data);