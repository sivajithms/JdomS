const taskContainer = document.querySelector(".task__container")
let globalStorage = [];


const generateNewCard = (taskData) => {

  return (`
    <div class="col-sm-12 col-md-6 col-lg-4 mb-3" id= ${taskData.id}>
    <div class="card">
      <div class="card-header d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
        <button type="button" class="btn btn-outline-danger" onclick="removeCard(${taskData.id})"><i class="fas fa-trash-alt"></i></button>
      </div>
      <div class="card-body">
        <img
          src=${taskData.imageUrl}
          class="card-img-top" alt="...">
        <h4 class="card-title mt-3 fw-bold text-primary">${taskData.taskTitle}</h4>
        <h4 class="card-title mt-3 ">${taskData.taskType}</h4>
        <p class="card-text">${taskData.taskDescription}</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
`);
}


const loadInitialCardData = () => {
  // Retrieve the card data from localStorage
  const getCardData = localStorage.getItem('tasky');

  // Parse the card data into an array of objects
  const cards = JSON.parse(getCardData);

  // Iterate over each card object in the array
  cards.card.map((cardObj) => {
    // Generate HTML for the card object and insert it into the taskContainer element
    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObj));
    globalStorage.push(cardObj);
  });
}


const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}`,
    imageUrl: document.getElementById('imageurl').value,
    taskType: document.getElementById('tasktype').value,
    taskTitle: document.getElementById('tasktitle').value,
    taskDescription: document.getElementById('taskdescription').value
  };

  taskContainer.insertAdjacentHTML('beforeend', generateNewCard(taskData))
  globalStorage.push(taskData);
  localStorage.setItem("tasky", JSON.stringify({ card: globalStorage }))
};

const removeCard = (id) => {
  console.log(id);
  let taskId = id.toString();
  let removeTask = globalStorage.filter((task) => task.id !== taskId);
  console.log(removeTask);
  globalStorage = removeTask
  localStorage.setItem("tasky", JSON.stringify({ card: globalStorage }))
  let cardElement = document.getElementById(id);
  if (cardElement) {
    cardElement.remove();
  }
}