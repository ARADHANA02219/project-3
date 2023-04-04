const studentNameElement = document.getElementById('student-name');
const emailElement = document.getElementById("email");
const ageElement = document.getElementById("age");
const gpaElement = document.getElementById("gpa");
const degreeElement = document.getElementById("degree");
const btnElement = document.getElementById('btn');
const tableBody = document.querySelector("tbody");
const books = [
];

function handleEdit(event) {
   const buttonElement  = event.target;
   console.log(buttonElement);
    const id = buttonElement.id;

   if (buttonElement.textContent === 'Edit') {
    event.target.textContent = "Save";
    const parentElement = buttonElement.parentElement;

    parentElement.removeChild(parentElement.firstChild);

    const input = document.createElement("input");
    input.id = 'degree-inp';
    input.value = books[id - 1].degree;
    parentElement.insertBefore(input, event.target);
   } 
   else{
      const degreeElement = document.getElementById('degree-inp');
      books[id - 1].degree = degreeElement.value;
      renderBooksInsideTable();
   }

}
function createTableRow (data, tableBody, bookId) {
    

    const tr = document.createElement("tr");
    // create 5 ths and add data inside it

    const idTd = document.createElement("td");
    idTd.textContent = bookId;

    const studentNameTd = document.createElement("td");
    studentNameTd.textContent = data.name;

     const emailTd = document.createElement("td");
     emailTd.textContent = data.email;
     const ageTd = document.createElement("td");
     ageTd.textContent = data.age;
     const gpaTd = document.createElement("td");
     gpaTd.textContent = data.gpa;
     const degreeTd = document.createElement("td");
     degreeTd.classList.add('flex');
     

  
    

    const button = document.createElement('button');
    const span = document.createElement('span');

    span.textContent = data.degree;
    const className = data.degree === "not returned" ? "red" : "green";
    span.classList.add(className);

    button.textContent = 'Edit';
    button.id = bookId;
    button.addEventListener("click", handleEdit);

    degreeTd.appendChild(span);
    degreeTd.appendChild(button);
     
    // add these ths in tr 

    tr.appendChild(idTd);
    tr.appendChild(studentNameTd);
    tr.appendChild(emailTd);
    tr.appendChild(ageTd);
    tr.appendChild(gpaTd);
    tr.appendChild(degreeTd);

    // add this tr in tbody
    tableBody.appendChild(tr);
}

let saveData = () => {
    let task = {
        Name: studentname.value,
        email: email.value,
        age: age.value,
        gpa: gpa.value,
        degree: degree.value
    };

    tasks.push(task);
    localStorage.setItem('books', JSON.stringify(books));
    showTasks()
    console.log(books);
}
let showTasks = () => {
    taskContainer.innerHTML = "";
    books.map((task, idx) => {
        return ( taskContainer.innerHTML += ` <div id=${idx}>
            <span class="fw-bold">${task.studentname}</span>
            <span class="small text-secondary">${task.email}</span>
            <span>${task.age}</span>
            <span>${task.gpa}</span>
            <span>${task.degree}</span>

            <span class="options">
                <i onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form"  class="bi bi-pencil-square"></i>
                <i onclick="deleteTask(this)" class="bi bi-trash"></i>
            </span>

        </div>` )
    })

    resetForm()
   
}

let resetForm = () => { 
    studentName.value = "";
    email.value = "";
   age.value = "";
   gpa.value = "";
   degree.value = "";
}

function renderBooksInsideTable() {
 
   books.map(function (book, index) {

    // This will create a row and add it inside tbody
    createTableRow(book, tableBody,index+1);
   })
}

function handleFormSubmit () {
    // read book data 
    const studentName = studentNameElement.value;
    //studentNameElement.value = "";

     
    const email = emailElement.value;
    //emailElement.value = "";
    const age = ageElement.value;
    //ageElement.value = "";
    const gpa = gpaElement.value;
    //gpaElement.value = "";
    const degree= degreeElement.value;
    //degreelElement.value = "";

    

    if(studentName && email) {
        const book = {
          name: studentName,
          email: email,
          age: age,
          gpa:gpa,
          degree: degree,
        };

        books.push(book);
        renderBooksInsideTable();
    }
    else {
        alert("You are trying to enter empty details");
    }
    
}
let deleteTask = (e) => { 
    console.log(e.parentElement.parentElement.id);
    // removes the element from the UI
    e.parentElement.parentElement.remove()
    // remove it from the tasks array
    tasks.splice(e.parentElement.parentElement.id, 1)
    // update localstorage
    localStorage.setItem("books", JSON.stringify(books))
    console.log(books);

}
let editTask = (e) => {
    console.log(e.parentElement.parentElement);
    let selectedTask = e.parentElement.parentElement;
    console.log(selectedTask.children);
    // setting the value
    studentName.value = selectedTask.children[0].innerHTML;
    email.value = selectedTask.children[1].innerHTML;
    age.value = selectedTask.children[2].innerHTML;
    gpa.value = selectedTask.children[3].innerHTML;
    degree.value = selectedTask.children[4].innerHTML;



    console.log(e);
    deleteTask(e)
}

const searchFun =() =>{
    let filter = document.getElementById('search').value.toUpperCase();
    let table= document.getElementById('books');
    let  tr=table.getElementsByTagName('tr');
    for(var i=0;i<tr.length;i++){
        let td=tr[i].getElementsByTagName('td')[0];
        if(td){
            let textValue=td.textContent  ;
        if(textValue.toUpperCase().indexOf(filter)>-1){
            tr[1].style.display="";
        }
        else{
            tr[i].style.display="none";
        }
        }
    }
}

btnElement.addEventListener('click', handleFormSubmit);