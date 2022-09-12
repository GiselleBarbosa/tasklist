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
	//DOM Load Event
	document.addEventListener("DOMContentLoaded", getTasks);
	// Add Task events
	form.addEventListener("submit", addTask);

	// Remove Task Event
	taskList.addEventListener("click", removeTask);

	// Remove Task Event
	clearBtn.addEventListener("click", clearTasks);

	// Filter Task Event
	filter.addEventListener("keyup", filterTasks);
}

// Get Tasks from LS
function getTasks() {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	tasks.forEach(function (task) {
		// Create li element
		const li = document.createElement("li");
		// Add Class
		li.className = "collection-item";
		// Create text node and append to li
		li.appendChild(document.createTextNode(task));
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
	});
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

	// Store in Local Storage
	storeTaskInLocalStorage(taskInput.value);

	// Clear Input
	taskInput.value = "";

	e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	tasks.push(task);

	localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
	if (e.target.parentElement.classList.contains("delete-item")) {
		if (confirm("Are you Sure?")) {
			e.target.parentElement.parentElement.remove();

			// Remove from LS
			removeTaskFromLocalStorage(e.target.parentElement.parentElement);
		}
	}
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	tasks.forEach(function (task, index) {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
	// taskList.innerHTML = "";  // alternative

	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}
	// Clear Tasks LS
	clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
	localStorage.clear();
}

//Filter Tasks
function filterTasks(e) {
	const text = e.target.value.toLowerCase();

	document.querySelectorAll(".collection-item").forEach(function (task) {
		const item = task.firstChild.textContent;
		if (item.toLowerCase().indexOf(text) != -1) {
			task.style.display = "block";
		} else {
			task.style.display = "none";
		}
	});
}
