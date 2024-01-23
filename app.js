"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var task_1 = require("./task");
var utils_1 = require("./utils");
var ToDoList = /** @class */ (function () {
    function ToDoList() {
        this.tasks = [];
        this.loadFromLocalStorage(); // Завантажуємо збережені справи при створенні об'єкта
    }
    ToDoList.prototype.addTask = function (description) {
        var newTask = new task_1.TaskImplementation(this.tasks.length + 1, description, false);
        this.tasks.push(newTask);
        this.displayTasks();
        this.saveToLocalStorage();
    };
    ToDoList.prototype.removeTask = function (id) {
        this.tasks = this.tasks.filter(function (task) { return task.id !== id; });
        this.displayTasks();
        this.saveToLocalStorage();
    };
    ToDoList.prototype.markTaskAsDone = function (id) {
        var task = null;
        for (var _i = 0, _a = this.tasks; _i < _a.length; _i++) {
            var t = _a[_i];
            if (t.id === id) {
                task = t;
                break;
            }
        }
        if (task) {
            task.done = !task.done;
            this.displayTasks();
            this.saveToLocalStorage();
        }
    };
    ToDoList.prototype.displayTasks = function () {
        var taskListElement = document.getElementById('taskList');
        if (taskListElement) {
            taskListElement.innerHTML = '';
            this.tasks.forEach(function (task) {
                var listItem = document.createElement('li');
                listItem.innerHTML = "\n              <input type=\"checkbox\" ".concat(task.done ? 'checked' : '', " onchange=\"markTaskAsDone(").concat(task.id, ")\">\n              ").concat(task.description, "\n              <button onclick=\"removeTask(").concat(task.id, ")\">Remove</button>\n            ");
                taskListElement.appendChild(listItem);
            });
        }
    };
    ToDoList.prototype.saveToLocalStorage = function () {
        (0, utils_1.saveToLocalStorage)('tasks', this.tasks);
    };
    ToDoList.prototype.loadFromLocalStorage = function () {
        var savedTasks = (0, utils_1.loadFromLocalStorage)('tasks');
        if (savedTasks) {
            this.tasks = savedTasks;
            this.displayTasks();
        }
    };
    return ToDoList;
}());
var todoList = new ToDoList();
function addTask() {
    var newTaskInput = document.getElementById('newTaskInput');
    if (newTaskInput && newTaskInput.value.trim() !== '') {
        todoList.addTask(newTaskInput.value.trim());
        newTaskInput.value = '';
    }
}
function removeTask(id) {
    todoList.removeTask(id);
}
function markTaskAsDone(id) {
    todoList.markTaskAsDone(id);
}
todoList.displayTasks();
