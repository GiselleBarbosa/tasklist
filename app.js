// Defines UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event Listeners
loadEventListeners();

// Load all event Listeners
function loadEventListeners() {
	// Add Task events
	form.addEventListener("submit", addTask);
	// Remove task Event
	taskList.addEventListener("click", removeTask);
}

// Add Task
function addTask(e) {
	if (taskInput.value === "") {
		alert("Add a Task");
	}

	// Create li element
	const li = document.createElement("li");
	// Add Class
	li.className = "collection-item";
	// Create text node and append to li
	li.appendChild(document.createTextNode(taskInput.value));
	// Create New Link Element
	const link = document.createElement("a");
	// Add Class
	link.className = "delete-item secondary-content";
	// Add icon html
	link.innerHTML = '<i class="bi bi-x-circle">';
	//Append the link to li
	li.appendChild(link);

	//Append li to ul
	taskList.appendChild(li);

	// Clear Input
	taskInput.value = "";

	e.preventDefault();
}

// Remove task
function removeTask(e) {
	if (e.target.parentElement.classList.contains("delete-item")) {
		e.target.parentElement.parentElement.remove();
	}
}
