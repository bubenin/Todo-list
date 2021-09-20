let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
let valueInput = "";
let input = null;

// после загрузки всех элементов
window.onload = function init() {
  input = document.getElementById("add-task");
  input.addEventListener("change", updateValue);
  render()
};
//кнопка Add
onClickButton = () => {
  allTasks.push({
    text: valueInput,
    isCheck: false,
  });
  valueInput = "";
  input.value = "";
  render();
};
// по нажатию в input
updateValue = (event) => {
  valueInput = event.target.value;
};

//удаление всех задач из списка и  localstorage 
onClickRemove = () =>{
    allTasks = []
    localStorage.removeItem('tasks')
    render()
}

// отрисовка задач
render = () => {
  const content = document.getElementById("content-page");

  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
  allTasks.map((item, index) => {
    const container = document.createElement("div");
    container.id = `task-${index}`;
    container.className = "task-container";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.isCheck;
    checkbox.onclick = function () {
      onClickCheckBox(index);
    };
    container.appendChild(checkbox);
    const text = document.createElement("p");
    text.innerText = item.text;
    text.className = item.isCheck ? "text-task done-text" : "text-task";
    container.appendChild(text);

    const imageEdit = document.createElement("img");
    imageEdit.src = "images/edit.svg";
    imageEdit.className = "img-edit";
    container.appendChild(imageEdit);
    const imageDelete = document.createElement("img");
    imageDelete.src = "images/delete-icon.svg";
    imageDelete.className = "img-edit";
    container.appendChild(imageDelete);

    content.appendChild(container);
    //удаление элемента
    imageDelete.onclick = () => onClickDelete(index);

    //редактирование элемента
    imageEdit.onclick = () => {
      const buttonDisable = document.querySelector('button')
      buttonDisable.setAttribute("disabled", "disabled");
      checkbox.style.display = "none";
      text.style.display = "none";
      imageEdit.style.display = "none";
      imageDelete.style.display = "none";
      let inputEdit = document.createElement("input");
      inputEdit.id = `input-${index}`;
      inputEdit.value = item.text;
      const imageOk = document.createElement("img");
      imageOk.className = "img-edit";
      imageOk.src = "images/ok.svg";
      container.appendChild(inputEdit);
      container.appendChild(imageOk);
      //кнопка галочка
      imageOk.onclick = () => {
        onClickEdit(index);
        buttonDisable.removeAttribute("disabled");
      };
    };
  });
  localStorage.setItem('tasks', JSON.stringify(allTasks))
};
// меняет значение checkbox при нажатии на противовположное
onClickCheckBox = (index) => {
  allTasks[index].isCheck = !allTasks[index].isCheck;
  render();
};
//возвращает массив где индекс не равен передаваемому индексу
onClickDelete = (value) => {
  allTasks = allTasks.filter((task, index) => index !== value);
  render();
};
// редактирует элемент меня значение .text
onClickEdit = (index) => {
  const editedValue = document.getElementById(`input-${index}`).value;
  allTasks[index].text = editedValue;
  render();
};
