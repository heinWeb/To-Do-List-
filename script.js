const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("add-btn");
const result = document.querySelector(".result");
const clearAll = document.querySelector("#clear-all");
const alertBox = document.querySelector(".alert-box");
const okBtn = document.querySelectorAll(".alert-box button")[0];
const cancleBtn = document.querySelectorAll(".alert-box button")[1];
const filterBtn = document.querySelectorAll(".nav ul li");

// there is no value in toDo make it empty arry to prevent duplicating of local storage.
let toDo = JSON.parse(localStorage.getItem("to-do-list")) || [];

let isUserEdit = false; //to check user click edit or not;
let userEditId = null; //to know which item user want to edit;

// For User Interface
function toShowTasks(filterStatus) {
  // Only show button if there is attribute unless hide.
  if (toDo.length > 0) {
    clearAll.style.display = "block";
  } else clearAll.style.display = "none";
  inputBox.focus();
  result.innerHTML = ""; //To prevent duplicate result output
  toDo.forEach((value, index) => {
    let alreadyDone = value.status == "done" ? "done" : "";
    if (filterStatus === value.status || filterStatus == "all" || !filterStatus) {
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
    }
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
      if(isUserEdit && userEditId == userWantToDelete){
        isUserEdit = false;
        userEditId = null;
        inputBox.value = "";
      }
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
}

//For Clear All Button
clearAll.addEventListener("click", () => {
  alertBox.style.zIndex = "999";

  //Clear all data if user click ok, if not nothing happen.
  okBtn.addEventListener("click", () => {
    toDo.splice(0, toDo.length);
    localStorage.setItem("to-do-list", JSON.stringify(toDo));
    toShowTasks();
    alertBox.style.zIndex = "-999";
  });

  cancleBtn.addEventListener("click", () => {
    alertBox.style.zIndex = "-999";
  });
});

//For Filter Button
for (let filterTitle of filterBtn) {
  filterTitle.addEventListener("click", () => {
    filterBtn.forEach((e) => e.classList.remove("active"));
    filterTitle.classList.add("active");
    toShowTasks(filterTitle.id);
  });
}

const toDoList = () => {
  let userInput = inputBox.value;
  if (isUserEdit) {
    toDo[userEditId].task = userInput;
    isUserEdit = false;
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
