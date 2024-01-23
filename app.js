"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import { TaskImplementation } from "./task.js";
import { saveToLocalStorage, loadFromLocalStorage } from "./utils.js";
var ToDoList = /** @class */ (function () {
    function ToDoList() {
        this.tasks = [];
        this.loadFromLocalStorage(); // Завантажуємо збережені справи при створенні об'єкта
    }
    ToDoList.prototype.addTask = function (description) {
        var newTask = new TaskImplementation(this.tasks.length + 1, description, false);
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
        var tasks = this.loadFromLocalStorage('tasks');
        
        if (!tasks || tasks.length === 0) {
          console.log('No tasks to display.');
          return;
        }
      
        if (typeof document !== 'undefined') {
          var taskListElement = document.getElementById('taskList');
      
          if (!taskListElement) {
            console.error('Task list element not found.');
            return;
          }
      
          taskListElement.innerHTML = '';
      
          tasks.forEach(function (task) {
            var listItem = document.createElement('li');
      
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.done;
            checkbox.addEventListener('change', function () {
              markTaskAsDone(task.id);
            });
      
            var description = document.createTextNode(task.description);
      
            var removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', function () {
              removeTask(task.id);
            });
      
            listItem.appendChild(checkbox);
            listItem.appendChild(description);
            listItem.appendChild(removeButton);
      
            taskListElement.appendChild(listItem);
          });
        } else {
          console.log('This code is running in a non-browser environment.');
        }
      };
    ToDoList.prototype.saveToLocalStorage = function () {
        (0, saveToLocalStorage)('tasks', this.tasks);
    };
    ToDoList.prototype.loadFromLocalStorage = function (_p0) {
        var savedTasks = (0, loadFromLocalStorage)('tasks');
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
