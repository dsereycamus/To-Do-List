let newTask = document.getElementById("input-newtask");
const btnNewTask = document.getElementById("btn-newtask");
let taskList = [
  { id: 1, taskName: "Ir al supermercado", estado: false },
  { id: 2, taskName: "Sembrar semillas para almácigos verano", estado: false },
  { id: 3, taskName: "Comprar nuevo rascador", estado: false },
];

// Recuperar tareas almacenadas en localStorage al cargar la página
// if (localStorage.getItem("taskList")) {
//   taskList = JSON.parse(localStorage.getItem("taskList"));
// }

const renderizarTaskList = (taskList) => {
  let html = "";

  taskList.forEach((task) => {
    const taskClass = task.estado ? "completed-task" : "";
    const disableChangeStatus = task.estado ? "disabled" : ""; // Deshabilitar el cambio de estado si la tarea está completada

    html += `<tr>
                <td>${task.id}</td>
                <td class="${taskClass}">${task.taskName}</td>
                <td><i class="bi ${disableChangeStatus} ${
      task.estado ? "bi-clipboard-check-fill" : "bi-clipboard-fill"
    }" onclick="changeStatusTask(${task.id})"></i></td>
                <td><i class="bi bi-trash-fill" onclick="deleteTask(${
                  task.id
                })"></i></td>
            </tr>`;
  });

  document.getElementById("task-list").innerHTML = html;
  document.getElementById("task-total").innerHTML = taskList.length;
  document.getElementById("task-closed").innerHTML = taskList.filter(
    (task) => task.estado === true
  ).length;

  // Guardar tareas en localStorage cada vez que se renderiza la lista
  //   localStorage.setItem("taskList", JSON.stringify(taskList));
};

const changeStatusTask = (id) => {
  //Cambiar estado tarea
  const task = taskList.find((task) => task.id === id);

  if (task && !task.estado) {
    // Cambiar el estado solo si la tarea no está completada
    task.estado = true;
    renderizarTaskList(taskList);
  } // No hacer nada si la tarea está completada
};

const deleteTask = (id) => {
  //Eliminar tarea
  const index = taskList.findIndex((task) => task.id === id);

  if (index !== -1) {
    taskList.splice(index, 1);
  } else {
    console.log("Error al eliminar");
  }

  renderizarTaskList(taskList);
};

const generarId = (taskList) => {
  //Generar ID
  return taskList.length ? taskList[taskList.length - 1].id + 1 : 1;
};

btnNewTask.addEventListener("click", () => {
  //Evento para agregar al array
  if (newTask.value.trim() !== "") {
    const task = {
      id: generarId(taskList),
      taskName: newTask.value,
      estado: false,
    };

    taskList.push(task);
    renderizarTaskList(taskList);
    newTask.value = "";
    newTask.focus();
  } else {
    newTask.classList.add("is-invalid");
  }
});

newTask.addEventListener("click", () => {
  newTask.classList.remove("is-invalid");
});

renderizarTaskList(taskList);
