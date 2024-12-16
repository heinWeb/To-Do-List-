const inputBox = document.getElementById("inputBox");
const myBtn = document.getElementById("myBtn");
const result = document.querySelector(".result");

const toDoList = () => {
    const li = document.createElement("li");
    li.innerHTML = inputBox.value;
    result.append(li);
    const span = document.createElement("span");
    span.innerHTML = "❌";
    li.append(span);
    inputBox.value = "";
    li.addEventListener("click", () => {
        li.classList.toggle("done");
    })
    span.addEventListener("click", () => {
        li.remove();
    })
}

myBtn.addEventListener("click", toDoList)
inputBox.addEventListener("keyup", (e) => {
    if(e.key === "Enter") {
        toDoList();
    }
})