import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  
  constructor(){
    
  }
  visible=false;
  showDialog(){
    this.visible = true;
  }
  ngOnInit(): void{
    
  }

  nav(){
  

  const dropdownBtn = document.querySelectorAll(".dropdown-btn");
  const dropdown = document.querySelectorAll(".dropdown");
  const hamburgerBtn = document.getElementById("hamburger");
  const navMenu = document.querySelector(".menu");
  const links = document.querySelectorAll(".dropdown a");
  const dataset:string = '';

function setAriaExpandedFalse() {
  dropdownBtn.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
}

function closeDropdownMenu() {
  dropdown.forEach((drop) => {
    drop.classList.remove("active");
    drop.addEventListener("click", (e) => e.stopPropagation());
  });
}

// function toggleHamburger() {
//   navMenu.classList.toggle("show");
// }

// dropdownBtn.forEach((btn) => {
//   btn.addEventListener("click", function (e) {
//     // Cast e.currentTarget to HTMLElement
//     const targetElement = e.currentTarget as HTMLElement;

//     // Now, you can access the dataset property
//     const dropdownIndex = targetElement.dataset['dropdown'];
//      const dropdownElement = document.getElementById(dropdownIndex);

//     dropdownElement.classList.toggle("active");
//     dropdown.forEach((drop) => {
//       if (drop.id !== targetElement.dataset["dropdown"]) {
//         drop.classList.remove("active");
//       }
//     });
//     e.stopPropagation();
//     btn.setAttribute(
//       "aria-expanded",
//       btn.getAttribute("aria-expanded") === "false" ? "true" : "false"
//     );
//   });
// });

// // close dropdown menu when the dropdown links are clicked
// links.forEach((link) =>
//   link.addEventListener("click", () => {
//     closeDropdownMenu();
//     setAriaExpandedFalse();
//     toggleHamburger();
//   })
// );

// close dropdown menu when you click on the document body
// document.documentElement.addEventListener("click", () => {
//   closeDropdownMenu();
//   setAriaExpandedFalse();
// });

// // close dropdown when the escape key is pressed
// document.addEventListener("keydown", (e) => {
//   if (e.key === "Escape") {
//     closeDropdownMenu();
//     setAriaExpandedFalse();
//   }
// });

// // toggle hamburger menu
// hamburgerBtn.addEventListener("click", toggleHamburger);

  }

}
