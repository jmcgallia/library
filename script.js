/////////////////
// Book Class //
///////////////
bookOne = new Book("Ender's Game", "Orson Scott Card", 250, 'true');
function Book(title, author, pages, read, id) {

    // Basic setup
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;

    // Get the template for a card
    this.cardTemplate = document.querySelector(".card-template")
    // Clone it
    this.cardDiv = this.cardTemplate.content.cloneNode(true);
    // Set author, pages, hasBeenRead
    this.titleText = this.cardDiv.querySelector(".card h3");
    this.authorText = this.cardDiv.querySelector(".card .authorName")
    this.pagesText = this.cardDiv.querySelector(".card .numberOfPages")
    this.readText = this.cardDiv.querySelector(".card .hasBeenRead")

    this.titleText.innerText = this.title;
    this.authorText.innerText = this.author;
    this.pagesText.innerText = this.pages;
    this.readText.innerText = this.read;

    // The input element 
    this.inputElement = this.cardDiv.querySelector(".card input");
    this.card = this.cardDiv.querySelector(".card");

    this.isSelected = function() {
        if (this.inputElement.checked == true) {
            return true;
        } else {
            return false;
        }
    }

}
///////////////////////
// Helper Functions //
/////////////////////

function addBookToLibrary(book) {
    // Add the book to out array of books
    library.push(book);
    // Add the dom element of the book to the document
    cardArea.append(book.card);
}

function removeBookFromLibrary(thisBook) {

    // Remove the book from the array of books
    library = library.filter(function(book) {
        if (book.id === thisBook.id) {
            return false;
        } else {
            return true;
        }
    });
    console.log("removeBookFromLibrary");
    thisBook.card.remove();

}

function printLibrary(book) {
    library.forEach(function(book) {
        cardArea.append(book.card);
        // Add the card element to dom under 'card-area'
    })
}

///////////////////////
// Global Variables //
/////////////////////

cardArea = document.querySelector(".card-area");
library = []

////////////////////
// Example Setup //
//////////////////

bookOne = new Book("Ender's Game", "Orson Scott Card", 250, 'true',1);
bookTwo = new Book("The Foundation Trilogy", "Isaac Asimov", 627, 'false',2);
bookThree = new Book("East of Eden", "John Steinbeck", 428, 'true',3);
bookFour = new Book("The Catcher in the Rye", "J.D. Salinger", 220, 'true',4);
let bookID = 5;

addBookToLibrary(bookOne);
addBookToLibrary(bookTwo);
addBookToLibrary(bookThree);
addBookToLibrary(bookFour);

printLibrary();


// For the buttons in the header
const addButton = document.querySelector(".addButton");
const removeButton = document.querySelector(".removeButton");
const markRead = document.querySelector(".markRead");

// For the menu where you add a book
const addButtonMenu = document.querySelector(".addButton-menu-wrapper")
addButtonMenu.style.display = "none";
const entryAddButton = document.querySelector(".entry-add-button");
const entryXButton = document.querySelector(".top-section button");
const titleInput = document.querySelector(".bookInput.title");
const authorInput = document.querySelector(".bookInput.author");
const pagesInput = document.querySelector(".bookInput.pages");
const hasBeenRead = document.querySelector(".bookInput.hasBeenRead");

entryXButton.addEventListener('click', function() {
    addButtonMenu.style.display = "none";
    titleInput.value = "";
    pagesInput.value = "";
    pagesInput.value = "";
})

entryAddButton.addEventListener('click', function() {

    let markAsRead = 'true';
    if (hasBeenRead.checked) {
        markAsRead = 'true';
    } else {
        markAsRead = 'false';
    }

    newBook = new Book(titleInput.value,authorInput.value,pagesInput.value,markAsRead,bookID);
    bookID += 1;
    addBookToLibrary(newBook);
    addButtonMenu.style.display = "none";
})

addButton.addEventListener('click', function() {

    // Set the addButtonMenu to open or close upon hitting addButton.
    // Reset the values of the inputs when closing it.
    if (addButtonMenu.style.display === "none") {
        addButtonMenu.style.display = "block";
    } else {
        addButtonMenu.style.display = "none";
        titleInput.value = "";
        pagesInput.value = "";
        pagesInput.value = "";
    }
});

removeButton.addEventListener('click', function() {
    library.forEach(function(book) {
        if (book.isSelected()) {
            removeBookFromLibrary(book);
        }
    })
});

markRead.addEventListener('click', function() {
    library.forEach(function(book) {
        if (book.isSelected()) {
            console.log(book.read);
            if (book.read === 'true') {
                book.readText.innerText = 'false';
                book.read = 'false';
            } else {
                book.readText.innerText = 'true';
                book.read = 'true';
            }
        }
    })
})
