/* eslint-disable max-classes-per-file */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

function displayAllBooks(books) {
  const booksContainer = document.querySelector('.books');
  booksContainer.innerHTML = '';
  let current = books.head;
  let index = 0;
  while (current) {
    const newBook = `
          <li class="book flex">
            <div class="discription flex">
              <h3>"${current.value.title}"</h3>
              <span class="by">by</span>
              <p><strong>${current.value.author}</strong></p>
            </div>
            <button onclick="books.remove(${index})">Remove</button>
          </li>
          `;
    booksContainer.innerHTML += newBook;
    current = current.next;
    index += 1;
  }
}

class LinkedList {
  constructor(head, tail, size) {
    this.head = head;
    this.tail = tail;
    this.size = size;
  }

  add(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size += 1;
    const boks = JSON.stringify(this);
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
    } else if (index === 0) {
      this.head = current.next;
      this.size -= 1;
      const boks = JSON.stringify(this);
      localStorage.removeItem('books');
      localStorage.setItem('books', boks);
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
      this.size -= 1;
      const boks = JSON.stringify(this);
      localStorage.removeItem('books');
      localStorage.setItem('books', boks);
    }
    displayAllBooks(this);
  }

  // this is for testing
  display() {
    let current = this.head;
    let output = '';
    while (current) {
      output += `${current.value.title} ${current.value.author}\n`;
      current = current.next;
    }
    console.log(output);
  }
}

function displayBook(book, index) {
  const booksContainer = document.querySelector('.books');
  const newBook = `
        <li class="book flex">
          <div class="discription flex">
            <h3>"${book.title}"</h3>
            <span class="by">by</span>
            <p><strong>${book.author}</strong></p>
          </div>
          <button onclick="books.remove(${index})">Remove</button>
        </li>
        `;
  booksContainer.innerHTML += newBook;
}

function grabbingBooks() {
  let books = JSON.parse(localStorage.getItem('books'));
  if (books === null) {
    books = new LinkedList(null, null, 0);
  } else {
    books = new LinkedList(books.head, books.tail, books.size);
    const { tail } = books;
    books.remove(books.size - 1);
    books.add(tail.value);
    displayAllBooks(books);
  }
  return books;
}

function isValid() {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const btn = document.getElementById('add');

  if (title && author) {
    if (btn.classList.contains('disabled')) {
      btn.classList.remove('disabled');
    }
    btn.disabled = false;
  } else {
    if (!btn.classList.contains('disabled')) {
      btn.classList.add('disabled');
    }
    btn.disabled = true;
  }
}

function displaySection(sectionNumber) {
  const booksList = document.querySelector('#awesome-books');
  const addBooks = document.querySelector('#add-books');
  const contact = document.querySelector('#contact');
  const nav1 = document.querySelector('.nav1');
  const nav2 = document.querySelector('.nav2');
  const nav3 = document.querySelector('.nav3');

  booksList.classList.remove('invisible');
  addBooks.classList.remove('invisible');
  contact.classList.remove('invisible');
  nav1.classList.remove('active');
  nav2.classList.remove('active');
  nav3.classList.remove('active');

  if (sectionNumber === 1) {
    addBooks.classList.add('invisible');
    contact.classList.add('invisible');
    nav1.classList.add('active');
  } else if (sectionNumber === 2) {
    booksList.classList.add('invisible');
    contact.classList.add('invisible');
    nav2.classList.add('active');
  } else {
    booksList.classList.add('invisible');
    addBooks.classList.add('invisible');
    nav3.classList.add('active');
  }
}

const books = grabbingBooks();
const btn = document.getElementById('add');

btn.addEventListener('click', () => {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const newBook = new Book(title, author);
  books.add(newBook);
  displayBook(newBook, books.size - 1);
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  isValid();
});

// display date
const currentDate = document.querySelector('#current_date');
currentDate.innerHTML = Date();