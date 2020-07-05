class Book {

	constructor(title, author, ISBN){
		this.title = title;
		this.author = author;
		this.ISBN = ISBN;
	}


	addToList(){
		try {

			// selecing table
			const table = document.querySelector("#bookTable");
			// creatinng new row
			const newRow = table.insertRow(-1);
			// new title cell
			const CellTitle = newRow.insertCell(0);
			CellTitle.innerHTML = this.title;
			// new author cell
			const CellAuthor = newRow.insertCell(1);
			CellAuthor.innerHTML = this.author;
			// new ISBN cell
			const CellISBN = newRow.insertCell(2);
			CellISBN.innerHTML = this.ISBN;
			// delete btn
			const CellButton = newRow.insertCell(3);
			// event for deleing click row
			const btn = document.createElement("button");
			btn.id = this.ISBN;
			btn.innerHTML = "Delete";
			btn.addEventListener('click', function(e){
				console.log(e.target.parentElement.parentElement.remove());
				updateStatus(-1);
			});

			CellButton.appendChild(btn);
			return 1;

		}catch(e){
			return 2;
		}
	}

	

}


function updateStatus(status){
	// get status div
	const statusDiv = document.querySelector("#status");

	if(status === 1){
		// creating succes tag
		const statusTag = document.createElement('h6');
		statusTag.setAttribute('class', 'success');
		statusTag.setAttribute('id', 'successTag');
		statusTag.innerHTML = "Book added.";
		statusDiv.appendChild(statusTag);

		// deleting tag after 3 sec 
		setTimeout(function(){
			document.querySelector("#successTag").remove();
		}, 3000);

	}else if(status == 0){
		// creating error tag
		const statusTag = document.createElement('h6');
		statusTag.setAttribute('class', 'error');
		statusTag.setAttribute('id', 'errorTag');
		statusTag.innerHTML = "Please fill up all details.";
		statusDiv.appendChild(statusTag);

		// deleting tag after 3 sec
		setTimeout(function(){
			document.querySelector("#errorTag").remove();
		}, 3000);

	}else if(status == -1){
		// creating error tag
		const statusTag = document.createElement('h6');
		statusTag.setAttribute('class', 'error');
		statusTag.setAttribute('id', 'errorTag');
		statusTag.innerHTML = "Book Deleted.";
		statusDiv.appendChild(statusTag);

		// deleting tag after 3 sec
		setTimeout(function(){
			document.querySelector("#errorTag").remove();
		}, 3000);

	}else{
		// creating error tag
		const statusTag = document.createElement('h6');
		statusTag.setAttribute('class', 'error');
		statusTag.setAttribute('id', 'errorTag');
		statusTag.innerHTML = "Error adding Book.";
		statusDiv.appendChild(statusTag);

		// deleting tag after 3 sec
		setTimeout(function(){
			document.querySelector("#errorTag").remove();
		}, 3000);
	}
}

// fetcing form
const form = document.querySelector("#book-form");

// set on click listener
form.addEventListener('submit', function(e){

	let title = document.querySelector("#title");
	let author = document.querySelector("#author");
	let isbn = document.querySelector("#isbn");

	if(title !== "" && author !== "" && isbn !== ""){
		const newBook = new Book(title.value, author.value, isbn.value);
		const status = newBook.addToList();
		updateStatus(status);

		title.value = "";
		author.value = "";
		isbn.value = "";

	}else{
		updateStatus(0);
	}

	e.preventDefault();
});



