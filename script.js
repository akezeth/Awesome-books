class node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}

class linkedList {
    constructor(head, tail, size) {
        this.head = head;
        this.tail = tail;
        this.size = size;
    }

    add(value) {
        const newNode = new node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size += 1;
        let boks = JSON.stringify(this);
        localStorage.removeItem('books');
        localStorage.setItem('books', boks);
    }

    remove(index) {
        let current = this.head;
        if (this.size === 1) {
            this.head = null;
            this.tail = null;
            this.size = 0;
            localStorage.removeItem('books');
        } else {
            if (index === 0) {
                this.head = current.next;
            } else {
                let previous;
                for (let i = 1; i <= index; i += 1) {
                    previous = current;
                    current = current.next;
                }
                if (index === this.size - 1) {
                    this.tail = previous;
                }
                previous.next = current.next;
            }
            let boks = JSON.stringify(this);
            localStorage.removeItem('books');
            localStorage.setItem('books', boks);
            this.size -= 1;
        }
        displayAllBooks(this);
    }

    // this is for testing
    display() {
        let current = this.head;
        let output = "";
        while (current) {
            output += current.value.title + " " + current.value.author + "\n";
            current = current.next
        }; console.log(output);
    }
}

function displayAllBooks(books) {
    const booksContainer = document.querySelector(".books");
    booksContainer.innerHTML = "";
    let current = books.head;
    let index = 0;
    while (current) {
        const newBook = `
        <div class="book">
            <h2>${current.value.title}</h2>
            <p>${current.value.author}</p>
            <button onclick="books.remove(${index})">Remove</button>
            <hr>
        </div>
        `;
        booksContainer.innerHTML += newBook;
        current = current.next;
        index += 1;
    }
}

function displayBook(book, index) {
    const booksContainer = document.querySelector(".books");
    const newBook = `
        <div class="book">
            <h2>${book.title}</h2>
            <p>${book.author}</p>
            <button onclick="books.remove(${index})">Remove</button>
            <hr>
        </div>
        `;
    booksContainer.innerHTML += newBook;
}



function grabbingBooks() {
    let books = JSON.parse(localStorage.getItem('books'));
    if (books === null) {
        books = new linkedList(null, null, 0);
    } else {
        books = new linkedList(books.head, books.tail, books.size);
        const tail = books.tail;
        books.remove(books.size - 1);
        books.add(tail.value);
        displayAllBooks(books);
    }
    return books;
}

const books = grabbingBooks();
const btn = document.getElementById("add");

btn.addEventListener("click", function () {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const newBook = new book(title, author);
    books.add(newBook);
    displayBook(newBook, books.size - 1);
})
