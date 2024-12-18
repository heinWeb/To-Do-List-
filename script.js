const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("add-btn");
const result = document.querySelector(".result");

// there is no value in toDo make it empty arry to prevent duplicating of local storage.
let toDo = JSON.parse(localStorage.getItem("to-do-list")) || [];

function toShowTasks() {
  toDo.forEach((value, index) => {
    result.innerHTML += `
        <div class="forComplete">
            <div id=${index} class="userValue">
                <p>${value.task}</p>
            </div>
            <div>
                <span class="edit">🔄️</span>
                <span class="delete">❌</span>
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
}

const toDoList = () => {
  let userInput = inputBox.value;
  // there is no value it's doesn't work
  if (userInput) {
    let userTasks = { task: userInput, status: "pending" };
    toDo.push(userTasks);
    localStorage.setItem("to-do-list", JSON.stringify(toDo));
    inputBox.value = "";
    toShowTasks();
  }
};

addBtn.addEventListener("click", toDoList);
inputBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    toDoList();
  }
});
toShowTasks();
