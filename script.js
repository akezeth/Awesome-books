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
}



let books = new linkedList();