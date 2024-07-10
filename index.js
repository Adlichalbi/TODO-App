// Retrieve existing tasks from Local Storage (if any)
let storedTasks = JSON.parse(localStorage.getItem("todos")) || [];

// Create the main container element
let container = document.createElement("div");
container.classList.add("container"); // Use classList for modern approach

// Add the container to the body
document.body.appendChild(container);

// Create the header element
let header = document.createElement("h1");
header.classList.add("header"); // Use classList for modern approach

// Set the header text
let headerText = document.createTextNode("TODO APP");
header.appendChild(headerText);

// Add the header to the container
container.appendChild(header);

// Create the form element
let form = document.createElement("form");
form.classList.add("form"); // Use classList for modern approach
container.appendChild(form);

// Create the task input field
let input = document.createElement("input");
input.id = "taskInput";
input.classList.add("input"); // Use classList for modern approach
input.placeholder = "Write your task and hit enter to add";

// Add the input field to the form
form.appendChild(input);

// Create the add button
let addButton = document.createElement("button");
addButton.classList.add("add"); // Use classList for modern approach
addButton.id = "add";
let buttonText = document.createTextNode("Add");
addButton.appendChild(buttonText);
form.appendChild(addButton);

// Create the task list
let taskList = document.createElement("ul");
taskList.classList.add("list"); // Use classList for modern approach
taskList.id = "list";
container.appendChild(taskList);

// Function to populate the task list
function populateTaskList(tasks) {
  const taskList = document.getElementById("list");
  taskList.innerHTML = ""; // Clear existing list items
  for (const task of tasks) {
    let newListItem = document.createElement("li");
    newListItem.classList.add("li");

    let taskCheckbox = document.createElement("input");
    taskCheckbox.type = "checkbox";
    taskCheckbox.classList.add("task");
    taskCheckbox.checked = task.completed || false; // Set checkbox state based on stored completion status (defaults to false)

    let taskText = document.createTextNode(task.text);

    // Create the delete button
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");

    // Create the SVG element using the provided SVG code
    let svgNS = "http://www.w3.org/2000/svg";
    let svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("height", "24px");
    svg.setAttribute("viewBox", "0 -960 960 960");
    svg.setAttribute("width", "24px");
    svg.setAttribute("fill", "#e8eaed");

    // Create the path element
    let path = document.createElementNS(svgNS, "path");
    path.setAttribute(
      "d",
      "M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
    );

    // Append the path to the SVG
    svg.appendChild(path);

    // Append the SVG to the button
    deleteButton.appendChild(svg);

    // Append elements to the list item
    newListItem.appendChild(taskCheckbox);
    newListItem.appendChild(taskText);
    newListItem.appendChild(deleteButton);

    // Append the list item to the task list
    taskList.appendChild(newListItem);

    // Add event listener to delete button
    deleteButton.addEventListener("click", () => {
      taskList.removeChild(newListItem);
      storedTasks = storedTasks.filter((t) => t !== task);
      localStorage.setItem("todos", JSON.stringify(storedTasks));
    });
  }
}

// Call populateTaskList to display existing tasks on load
populateTaskList(storedTasks);

// Function to add a new task
const newTask = (event) => {
  event.preventDefault(); // Prevent form submission

  let taskInputValue = document.getElementById("taskInput").value.trim();

  if (taskInputValue !== "") {
    let newTask = {
      text: taskInputValue,
      completed: false, // Set completed status to false by default
    };
    storedTasks.push(newTask); // Add the new task to the tasks array

    let newListItem = document.createElement("li");
    newListItem.classList.add("li");

    let taskCheckbox = document.createElement("input");
    taskCheckbox.type = "checkbox";
    taskCheckbox.classList.add("task");

    let taskText = document.createTextNode(taskInputValue);

    // Create the delete button
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");

    // Create the SVG element using the provided SVG code
    let svgNS = "http://www.w3.org/2000/svg";
    let svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("height", "24px");
    svg.setAttribute("viewBox", "0 -960 960 960");
    svg.setAttribute("width", "24px");
    svg.setAttribute("fill", "#e8eaed");

    // Create the path element
    let path = document.createElementNS(svgNS, "path");
    path.setAttribute(
      "d",
      "M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
    );

    // Append the path to the SVG
    svg.appendChild(path);

    // Append the SVG to the button
    deleteButton.appendChild(svg);

    // Append elements to the list item
    newListItem.appendChild(taskCheckbox);
    newListItem.appendChild(taskText);
    newListItem.appendChild(deleteButton);

    // Append the list item to the task list
    document.getElementById("list").appendChild(newListItem);

    // Add event listener to delete button
    deleteButton.addEventListener("click", () => {
      taskList.removeChild(newListItem);
      storedTasks = storedTasks.filter((t) => t !== newTask);
      localStorage.setItem("todos", JSON.stringify(storedTasks));
    });

    document.getElementById("taskInput").value = ""; // Clear the input field
    localStorage.setItem("todos", JSON.stringify(storedTasks)); // Update Local Storage with the new tasks
  }
};

// Add event listeners to form and button
form.addEventListener("submit", newTask);
addButton.addEventListener("click", newTask);
