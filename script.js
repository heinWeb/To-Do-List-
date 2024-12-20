const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("add-btn");
const result = document.querySelector(".result");

// there is no value in toDo make it empty arry to prevent duplicating of local storage.
let toDo = JSON.parse(localStorage.getItem("to-do-list")) || [];

let isUserEdit = false; //to check user click edit or not;
let userEditId; //to know which item user want to edit;

function toShowTasks() {
  inputBox.focus();
  result.innerHTML = ""; //To prevent duplicate result output
  toDo.forEach((value, index) => {
    let alreadyDone = value.status == "done" ? "done" : "";
    result.innerHTML += `
        <div class="forComplete">
            <div id=${index} class="userValue ${alreadyDone}">
                <p>${value.task}</p>
            </div>
            <div>
                <span class="edit" id="${index}">🔄️</span>
                <span class="delete" id="${index}">❌</span>
            </div>
        </div>
        `;
  });
  // line through toggle if user complete their tasks
  const forComplete = document.querySelectorAll(".forComplete .userValue");
  for (let item of forComplete) {
    item.addEventListener("click", () => {
      item.classList.toggle("done");
      if (item.classList.contains("done")) {
        toDo[item.id].status = "done";
        localStorage.setItem("to-do-list", JSON.stringify(toDo));
      } else {
        toDo[item.id].status = "pending";
        localStorage.setItem("to-do-list", JSON.stringify(toDo));
      }
    });
  }
  // For delete button
  const deleteBtn = document.querySelectorAll(".delete");
  deleteBtn.forEach((k) => {
    k.addEventListener("click", () => {
      let userWantToDelete = k.id;
      toDo.splice(userWantToDelete, 1);
      localStorage.setItem("to-do-list", JSON.stringify(toDo));
      toShowTasks();
    });
  });
  // For Edit button
  const editBtn = document.querySelectorAll(".edit");
  for (let k of editBtn) {
    let userWantToEdit = k.id;
    k.addEventListener("click", () => {
      inputBox.value = toDo[userWantToEdit].task;
      inputBox.select();
      userEditId = userWantToEdit;
      isUserEdit = true;
      toShowTasks();
    });
  }
  console.log(userEditId);
}

const toDoList = () => {
  let userInput = inputBox.value;
  if (isUserEdit) {
    toDo[userEditId].task = userInput;
  } else {
    // there is no value it's doesn't work
    if (userInput) {
      let userTasks = { task: userInput, status: "pending" };
      toDo.push(userTasks);
    }
  }
  inputBox.value = "";
  localStorage.setItem("to-do-list", JSON.stringify(toDo));
  toShowTasks();
};

addBtn.addEventListener("click", toDoList);
inputBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") toDoList();
});
toShowTasks();
