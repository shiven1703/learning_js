class Book {

	constructor(title, author, ISBN){
		this.title = title;
		this.author = author;
		this.ISBN = ISBN;
	}
}


class UI {

	constructor(){}

	// adding all the books to the list which are saved in localstorage
	loadBooks(){
		this.storage = new LocalStorage();
		this.books = this.storage.getAllBooks();
		if(this.books != null){
			for(let i=0; i<this.books.length; i++){
			this.addToList(this.books[i]);
			}
		}
	}

	// adding new book
	addToList(book){
		try {

			// selecing table
			const table = document.querySelector("#bookTable");
			// creatinng new row
			const newRow = table.insertRow(-1);
			// new title cell
			const CellTitle = newRow.insertCell(0);
			CellTitle.innerHTML = book.title;
			// new author cell
			const CellAuthor = newRow.insertCell(1);
			CellAuthor.innerHTML = book.author;
			// new ISBN cell
			const CellISBN = newRow.insertCell(2);
			CellISBN.innerHTML = book.ISBN;
			// delete btn
			const CellButton = newRow.insertCell(3);
			// event for deleing click row
			const btn = document.createElement("button");
			btn.id = book.ISBN;
			btn.innerHTML = "Delete";
			btn.addEventListener('click', function(e){
				console.log(e.target.parentElement.parentElement.remove());
				const storage = new LocalStorage();
				storage.deleteBook(e.target.id.toString());
				const ui = new UI();
				ui.updateStatus("fail", "Book deleted");
			});

			CellButton.appendChild(btn);
			
			return "success";

		}catch(e){
			console.log(e);
			return "fail";
		}
	}
	// settings for status
	updateStatus(status, msg){
		// get status div
		const statusDiv = document.querySelector("#status");

		if(status === "success"){
			// creating succes tag
			const statusTag = document.createElement('h6');
			statusTag.setAttribute('class', 'success');
			statusTag.setAttribute('id', 'successTag');
			statusTag.innerHTML = msg;
			statusDiv.appendChild(statusTag);

			// deleting tag after 3 sec 
			setTimeout(function(){
				document.querySelector("#successTag").remove();
			}, 3000);

		}else if(status == "fail"){
			// creating error tag
			const statusTag = document.createElement('h6');
			statusTag.setAttribute('class', 'error');
			statusTag.setAttribute('id', 'errorTag');
			statusTag.innerHTML = msg;
			statusDiv.appendChild(statusTag);

			// deleting tag after 3 sec
			setTimeout(function(){
				document.querySelector("#errorTag").remove();
			}, 3000);
		}
	}
	// clearing form input field
	clearForm(){
		document.querySelector("#title").value = "";
		document.querySelector("#author").value = "";
		document.querySelector("#isbn").value = "";
	}
}

class LocalStorage{

	constructor(){
		this.storage = window.localStorage;
		this.books = [];
	}

	addBook(book){
		// checking if books key is in the localstorage or not
		if(this.storage.getItem('books') === null){
			this.books.push(book);
			this.storage.setItem('books',JSON.stringify(this.books).toString());	
		}else{
			// pushing new book to existing book json in localstorage
			this.books = JSON.parse(this.storage.getItem('books'));
			this.books.push(book);
			this.storage.setItem('books', JSON.stringify(this.books));
		}

	}

	deleteBook(isbn){
		// delete book from localstorage if it matches with isbn number requested to delete
		this.books = JSON.parse(this.storage.getItem('books'));
		for(let i=0; i<this.books.length; i++){
			if(this.books[i].ISBN === isbn){
				this.books.splice(i, 1);
			}
		}
		// updating localstorage
		this.storage.setItem('books', JSON.stringify(this.books));
	}

	getAllBooks(){
		return JSON.parse(this.storage.getItem('books'));
	}
}

// loading books
const ui = new UI();
ui.loadBooks();

// fetcing form
const form = document.querySelector("#book-form");

// set on click listener
form.addEventListener('submit', function(e){

	let title = document.querySelector("#title").value;
	let author = document.querySelector("#author").value;
	let isbn = document.querySelector("#isbn").value;

	const ui = new UI();
	// checking if form is filled or not
	if(title !== "" && author !== "" && isbn !== ""){
		// creating book obj
		const newBook = new Book(title, author, isbn);
		ui.addToList(newBook);
		// adding obj to local storage
		const storage = new LocalStorage();
		storage.addBook(newBook);
		// sending success notification
		ui.updateStatus("success", "New Book added.");
		ui.clearForm();
		
	}else{
		// sending fail notification
		ui.updateStatus("fail", "Please fill the form.")
	}

	e.preventDefault();
});



