// Get references to HTML elements
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedContainer = document.getElementById("completed-container");

// Function to add a new task to the to-do list
function addTask(){
    // Check if the input box is empty
    if (inputBox.value === ""){
        alert("You must add a task");  // Alert user if no task is entered
    }
    else{
        // Create a new <li> element for the task
        let li = document.createElement("li");
        li.textContent = inputBox.value;  // Set the text of the <li> to the task entered by the user
        listContainer.appendChild(li);  // Add the new task to the to-do list

        // Create a span element for the delete icon (×)
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";  // Unicode character for '×'
        li.appendChild(span);  // Append the delete icon to the task
    }
    inputBox.value = "";  // Clear the input box after the task is added
    saveData();  // Save the current state of the list to localStorage
}

// Event listener for click events on the to-do list
listContainer.addEventListener("click", function(e){
    // If a task (li) is clicked
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");  // Toggle the 'checked' class on the task

        // Move the task between the active list and the completed list based on its 'checked' class
        if(e.target.classList.contains("checked")){
            completedContainer.appendChild(e.target);  // Move to completed tasks
        } else {
            listContainer.appendChild(e.target);  // Move back to the active list
        }
        saveData();  // Save the updated lists to localStorage
    }
    // If the delete icon (span) is clicked
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();  // Remove the task from the list
        saveData();  // Save the updated lists to localStorage
    }
});
// Event listener for click events on the completed tasks list
completedContainer.addEventListener("click", function(e){
    // If the delete icon (span) is clicked in completed tasks
    if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();  // Remove the completed task
        saveData();  // Save the updated lists to localStorage
    }
    
    // If a completed task (li) is clicked, uncheck it and move it back to the to-do list
    if (e.target.tagName === "LI"){
        e.target.classList.remove("checked");  // Remove the 'checked' class from the task
        listContainer.appendChild(e.target);  // Move the task back to the to-do list
        saveData();  // Save the updated lists to localStorage
    }
});

// Event listener for click events on the completed tasks list
completedContainer.addEventListener("click", function(e){
    // If the delete icon (span) is clicked in completed tasks
    if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();  // Remove the completed task
        saveData();  // Save the updated lists to localStorage
    }
});

// Event listener for "Enter" key press to add a task
inputBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();  // Add the task when "Enter" key is pressed
    }
});

// Function to save the current state of tasks in the lists to localStorage
function saveData(){
    // Save the innerHTML of the list containers to localStorage
    localStorage.setItem("data", listContainer.innerHTML);
    localStorage.setItem("completedTasks", completedContainer.innerHTML);
}

// Function to load tasks from localStorage and display them on page load
function showTask(){
    // Retrieve saved tasks from localStorage and populate the lists
    listContainer.innerHTML = localStorage.getItem("data");
    completedContainer.innerHTML = localStorage.getItem("completedTasks") || "";  // Use empty string if no data

    // Loop through completed tasks and add a delete icon to each
    let completedTasks = completedContainer.getElementsByTagName("li");
    for (let task of completedTasks) {
        task.classList.add("checked");  // Mark tasks as checked
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";  // Unicode character for '×'
        task.appendChild(span);  // Add the delete icon to the task
    }
}

// Call showTask to load tasks from localStorage on page load
showTask();
