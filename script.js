class node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class book {
    constructor(title,author) {
        this.title = title;
        this.author = author;
    }
}

class linkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    add(value) {
        const newNode = new node(value); 
        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size += 1;
    }

    remove(index) {
        let current = this.head;
        if (this.size === 1) {
            this.head = null;
            this.tail = null;
            this.size = 0;
        } else if (index === 0) {
            this.head = current.next;
            this.size -= 1;
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
    }

    // this is for testing
    display() {
		let current = this.head;
		let output = "";
		while (current) {
			output += current.value.title + " "+ current.value.author + "\n";
			current = current.next
		}; console.log(output);
	}
}

function displayBooks(books) {
    const booksContainer = document.querySelector(".books");
    let current = books.head;
    let index = 0;
    while(current){
        const newBook = `
        <div class="book">
            <p>${current.value.title}</p>
            <p>${current.value.author}</p>
            <button onclick="remove${index}">Remove</button>
            <hr>
        </div>
        `;
        booksContainer.innerHTML += newBook;
        current = current.next;
        index += 1;
    }
}

const body = document.body;
const books = new linkedList();
const btn = document.getElementById("add");


btn.addEventListener("click", function() {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const newBook = new book(title, author);
    books.add(newBook);
    displayBooks(books);
})
