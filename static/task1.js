let tasks = [];

// Array of motivational quotes
const motivationalQuotes = [
    "Believe in yourself and all that you are. — Christian D. Larson",
    "Success is not the key to happiness. Happiness is the key to success. — Albert Schweitzer",
    "Don't watch the clock; do what it does. Keep going. — Sam Levenson",
    "The only way to do great work is to love what you do. — Steve Jobs",
    "You are never too old to set another goal or to dream a new dream. — C.S. Lewis",
    "It does not matter how slowly you go as long as you do not stop. — Confucius",
    "Your limitation—it's only your imagination.",
    "Push yourself, because no one else is going to do it for you.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
    "Success doesn’t just find you. You have to go out and get it.",
    "The harder you work for something, the greater you’ll feel when you achieve it.",
    "Dream bigger. Do bigger.",
    "Don’t stop when you’re tired. Stop when you’re done.",
    "Wake up with determination. Go to bed with satisfaction."
];

// Store the last displayed motivational quotes to avoid repetition
const lastDisplayedQuotes = new Set();

// Function to get a random motivational quote
function getRandomMotivationalQuote() {
    if (motivationalQuotes.length === lastDisplayedQuotes.size) {
        // If all quotes have been displayed, reset the set
        lastDisplayedQuotes.clear();
    }

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    } while (lastDisplayedQuotes.has(randomIndex));

    lastDisplayedQuotes.add(randomIndex);
    return motivationalQuotes[randomIndex];
}

// Function to play alarm
function playAlarm() {
    const audio = document.getElementById("alarm-sound");
    if (audio) audio.play();
}

// Function to update task count
function updateTaskCount() {
    document.getElementById('task-count').textContent = `Total Tasks: ${tasks.length}`;
}

// Function to start stopwatch
function startStopwatch(taskIndex) {
    const stopwatchElement = document.getElementById(`stopwatch-${taskIndex}`);
    let stopwatchTime = 0;
    tasks[taskIndex].interval = setInterval(() => {
        stopwatchTime++;
        const minutes = Math.floor(stopwatchTime / 60);
        const seconds = stopwatchTime % 60;
        stopwatchElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

// Function to stop stopwatch
function stopStopwatch(taskIndex) {
    clearInterval(tasks[taskIndex].interval);
}

// Function to set alarm
function setAlarm(alarmTime, taskText, type, taskIndex) {
    const now = new Date().getTime();
    const timeToAlarm = new Date(alarmTime).getTime() - now;

    if (timeToAlarm >= 0) {
        setTimeout(() => {
            if (type === 'start') {
                alert(`Time to start your task: ${taskText}`);
                playAlarm();
                startStopwatch(taskIndex);
            } else {
                alert(`Time to complete your task: ${taskText}`);
                playAlarm();
                stopStopwatch(taskIndex);
                tasks[taskIndex].completed = true; // Mark task as completed
                renderTasks(); // Re-render tasks to update color
            }
        }, timeToAlarm);
    } else {
        alert("Alarm time must be in the future.");
    }
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('task-input').value.trim();
    const startAlarm = document.getElementById('start-alarm').value;
    const endAlarm = document.getElementById('end-alarm').value;

    if (taskInput && startAlarm && endAlarm) {
        const task = {
            text: taskInput,
            startAlarm: new Date(startAlarm),
            endAlarm: new Date(endAlarm),
            interval: null,
            completed: false
        };

        tasks.push(task);
        renderTasks();
        updateTaskCount();

        setAlarm(startAlarm, task.text, 'start', tasks.length - 1);
        setAlarm(endAlarm, task.text, 'end', tasks.length - 1);

        // Show a random motivational quote when a task is added
        const quote = getRandomMotivationalQuote();
        alert(quote);
    } else {
        alert("Please enter a task and set start and end alarms!");
    }
}

// Motivational Notification every 3 hours
function motivationalNotification() {
    const quote = getRandomMotivationalQuote();
    alert(quote);
    setTimeout(motivationalNotification, 3 * 60 * 60 * 1000); // Trigger every 3 hours
}

// Start the motivational notification timer on page load
window.onload = function () {
    motivationalNotification();
};

// Function to render tasks
function renderTasks() {
    const taskListElement = document.getElementById('task-list');
    taskListElement.innerHTML = ''; // Clear the list before re-rendering

    tasks.forEach((task, index) => {
        renderTask(task, index, taskListElement);
    });
}

// Function to render individual task
function renderTask(task, index, taskListElement) {
    const taskElement = document.createElement('div');
    taskElement.className = 'task-container';
    taskElement.style.backgroundColor = task.completed ? 'lightgreen' : 'lightcoral'; // Green for completed, Red for incomplete

    // Create checkbox for task completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
        toggleTaskCompletion(index);
    });

    // Task Text
    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    taskText.style.textDecoration = task.completed ? 'line-through' : 'none';

    // Start and End Alarm
    const startAlarm = document.createElement('span');
    startAlarm.textContent = `Start: ${task.startAlarm.toLocaleString()}`;

    const endAlarm = document.createElement('span');
    endAlarm.textContent = `End: ${task.endAlarm.toLocaleString()}`;

    // Stopwatch
    const stopwatch = document.createElement('span');
    stopwatch.id = `stopwatch-${index}`;
    stopwatch.className = 'stopwatch';
    stopwatch.textContent = '00:00';

    // Update and Delete Buttons
    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.addEventListener('click', () => updateTask(index));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(index));

    // Append elements to the task element
    taskElement.appendChild(checkbox);
    taskElement.appendChild(taskText);
    taskElement.appendChild(startAlarm);
    taskElement.appendChild(endAlarm);
    taskElement.appendChild(stopwatch);
    taskElement.appendChild(updateButton);
    taskElement.appendChild(deleteButton);

    taskListElement.appendChild(taskElement);
}

// Function to delete a task
function deleteTask(index) {
    clearInterval(tasks[index].interval); // Stop the stopwatch
    tasks.splice(index, 1);
    renderTasks();
    updateTaskCount();
}

// Function to toggle task completion
function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
    updateTaskCount();
}

// Function to update a task
function updateTask(index) {
    const newTaskText = prompt('Update your task:', tasks[index].text);
    const newStartAlarm = prompt('Update your start alarm time:', tasks[index].startAlarm.toISOString().slice(0, 16));
    const newEndAlarm = prompt('Update your end alarm time:', tasks[index].endAlarm.toISOString().slice(0, 16));

    if (newTaskText && newStartAlarm && newEndAlarm) {
        tasks[index].text = newTaskText;
        tasks[index].startAlarm = new Date(newStartAlarm);
        tasks[index].endAlarm = new Date(newEndAlarm);
        renderTasks();
        updateTaskCount();

        // Clear previous alarms before setting new ones
        clearInterval(tasks[index].interval);

        setAlarm(newStartAlarm, tasks[index].text, 'start', index);
        setAlarm(newEndAlarm, tasks[index].text, 'end', index);
    } else {
        alert("Please provide valid inputs for the update!");
    }
}

// Event listener for adding tasks
document.getElementById('add-task-btn').addEventListener('click', addTask);
