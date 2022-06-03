const infoTable = document.getElementById("info-table");
const loggedUserName = document.getElementById("logged-in-user-name");
const userArr = ["user1", "user2", "user3", "user4", "user5", "user6"];
let globalUser = "";
const tableDetails = [
  {
    id: 1,
    title: "Data Structure Usig C++",
    author: "Harish Patnaik",
    lender: "user2",
    borrower: "-",
  },
  {
    id: 2,
    title: "Computer Architecture",
    author: "Bindu Agarwal",
    lender: "user3",
    borrower: "user2",
  },
  {
    id: 3,
    title: "Operating System",
    author: "Saurav Mohanty",
    lender: "user1",
    borrower: "user3",
  },
  {
    id: 4,
    title: "Software Engineering",
    author: "Jagannath Singh",
    lender: "user2",
    borrower: "user4",
  },
  {
    id: 5,
    title: "Artificial Intelligence",
    author: "Somenath Bhera",
    lender: "user4",
    borrower: "user3",
  },
  {
    id: 6,
    title: "DBMS",
    author: "Samresh Mishra",
    lender: "user5",
    borrower: "user2",
  },
];

//Function for Login
function loginFunction() {
  const loggedUser = document.getElementById("logged-user").value;
  globalUser = loggedUser;
  const index = userArr.indexOf(loggedUser);
  if (index !== -1) {
    loggedUserName.innerText = `Logged in User: ${loggedUser}`;
    displayBooks();
  } else {
    window.alert("There is no such User,\n Users are " + userArr);
    globalUser = "";
    loggedUserName.innerText = `No User Logged in`;
    displayBooks();
  }
}

const insertBook = () => {
  if (globalUser) {
    infoTable.innerHTML += `<tdata>
  <td>${tableDetails.length + 1}</td>
            <td><input id='title' type='text'></td>
            <td><input id='author' type='text'></td>
            <td>${globalUser}</td>
            <td>-</td>
            <td><button id='borrowBook' onclick='addBook()'>Add Book</button></td>
            </tdata>`;
  }
};

const displayHeader = () => {
  infoTable.innerHTML = `<thead>
  <tr>
      <th>Id</th>
      <th>Title</th>
      <th>Author</th>
      <th>Lender</th>
      <th>Borrower</th>
      <th>Action</th>
  </tr>
  </thead>`;
};

const displayBook = (book) => {
  infoTable.innerHTML += `<tdata>
  <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.lender}</td>
            <td>${book.borrower}</td>
            <td>${
              book.lender === globalUser
                ? "-"
                : book.borrower === globalUser
                ? "<button id='returnBook' onclick='returnBook(this)'>Return</button>"
                : globalUser && book.borrower === "-"
                ? "<button id='borrowBook' onclick='borrowBook(this)'>borrow</button>"
                : "-"
            }</td>
            </tdata>`;
};

const displayBooks = () => {
  displayHeader();
  tableDetails.forEach((book) => {
    displayBook(book);
  });
  insertBook();
};

const findIndex = (node) => {
  const bookId = Number(node.parentNode.parentNode.childNodes[0].innerText);
  return tableDetails.findIndex((book) => book.id === bookId);
};

const borrowBook = (node) => {
  tableDetails[findIndex(node)].borrower = globalUser;
  displayBooks();
};

const returnBook = (node) => {
  tableDetails[findIndex(node)].borrower = "-";
  displayBooks();
};

// Adding Book
function addBook() {
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();

  const book = {
    id: tableDetails.length + 1,
    title: title,
    author: author,
    lender: globalUser,
    borrower: "-",
  };
  if (title && author) {
    tableDetails.push(book);
    infoTable.lastChild.remove();
    displayBook(book);
    insertBook();
  } else {
    window.alert("Please Fill all the Fields ");
  }
}

// function calls
displayBooks();
