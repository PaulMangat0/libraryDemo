
/********************* Navigation / Menu ****************************/

//Grab the add book menu buttons and menu
const addBookMenuButtons  = document.querySelectorAll("#add-book-menu-button");
const addBookMenu = document.querySelector("#add-book-menu");

//Add listeners
addBookMenuButtons.forEach(element => {
  element.addEventListener("click", () => {
    addBookMenu.classList.toggle("active"); //turn on menu when clicked
  } );
});

//Grab the clear button
const clearBookButton = document.querySelector("#clear-all");

//add listener
clearBookButton.addEventListener('click',() => {
  clearBooks();
});

/******************** Book / Library Data Structures *****************/

function Book(title,author,pages,read) {
  this.title=title,
  this.author=author,
  this.pages=pages,
  this.read=read;
}
  
const Library = {
  books : [],
  getNumberOfBooks : function() { return this.books.length; },
  addBook : function(book)  {this.books.push(book); },
  getBook : function(index) {return this.books[index];},
  removeBook : function(index) { this.books.splice(index,1);},
  clearBooks : function() {this.books=[];} 
}


/*********** Function to create card from book data ***********/

function createBookCard(book, index)  {

  var bookCardHTML = 
  `
  <div class="book card" data-library-index="${index}">
  <p><b>${book.title}</b></p>
  <p>by <em>${book.author}</em></p>
  <p>${book.pages} pages</p>
  <div class="delete" id="book-delete">X</div>
  <div class="read-check">    
    <label for="read">Read?</label>
    <input type="checkbox" id="book-card-read" name="read" value="read" ${book.read}>
  </div>
</div>
  `;
  return bookCardHTML;
}


/******************** Refresh Library and Display *****************/

 function updateBookList() {

  /* grab section to place books */
  const  bookList = document.querySelector("#book-list");
  bookList.innerHTML="";

  /*create book card for each books*/
  Library.books.forEach( (item, index) => {
    let bookDOM = document.createElement("div");
    bookDOM.innerHTML = createBookCard(item, index);
    bookList.appendChild(bookDOM);
  });


  /***************** Book listeners ************/

  //book delete button
  const bookDeleteButtons = document.querySelectorAll("#book-delete");

  bookDeleteButtons.forEach( (item) => {
    item.addEventListener('click', deletebook);
  });

  //book read checkmark
  const bookReadButtons = document.querySelectorAll("#book-card-read");

    bookReadButtons.forEach((item) => { item.addEventListener('change', (event)=>
    {
      const bookIndex = event.target.parentNode.parentNode.getAttribute("data-library-index");
      
      if(item.checked) {
        updateBookRead(bookIndex,"checked");
      } else {
        updateBookRead(bookIndex,"");
      }});
    });

  
} //end of updateBookList

/******************* Functions  *********************/

function deletebook(event) {
  const bookIndex = this.parentNode.getAttribute("data-library-index");
  Library.removeBook(bookIndex);
  updateBookList();
}


function clearBooks() {
  Library.clearBooks();
  updateBookList();
}
 
function addBook(title,author,pages,checkedValue) {
  Library.addBook(new Book(title,author,pages,checkedValue));
  updateBookList();
}

function updateBookRead(index,checkedValue) {
  Library.books[index].read=checkedValue;
}

/********************* Add book Form **********************/

//grab the form
const addBookForm = document.querySelector("#add-book-form");

//add listener to button
addBookForm.addEventListener('submit',(event)=> { 
  event.preventDefault();
  title = addBookForm.querySelector("#title").value;
  author = addBookForm.querySelector("#author").value;
  pages = addBookForm.querySelector("#pages").value;
  checkedValue="";
  if(addBookForm.querySelector("#read").checked) {
    checkedValue="checked";
  }

  addBook(title,author,pages,checkedValue);
  addBookForm.reset();
  addBookMenu.classList.toggle("active"); //turn on menu when clicked
  updateBookList();
});


/**** INIT ****/

/*********** Some default books ***********/

Library.addBook(new Book("Fairy Tale","Stephen King",608,"checked"));
Library.addBook(new Book("Rich Dad Poor Dad","Robert Kiyoshaki",336,""));
Library.addBook(new Book("Icebreaker","Hannah Grace",429,"checked"));

updateBookList(); //refresh and display library
