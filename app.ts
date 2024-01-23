import { TaskImplementation } from './task';
import { saveToLocalStorage, loadFromLocalStorage } from './utils';

class ToDoList {
    tasks: TaskImplementation[] = [];
  
    constructor() {
        this.loadFromLocalStorage(); // Завантажуємо збережені справи при створенні об'єкта
    }


    addTask(description: string): void {
        const newTask = new TaskImplementation(this.tasks.length + 1, description, false);
        this.tasks.push(newTask);
        this.displayTasks();
        this.saveToLocalStorage();
    }
      
  
    removeTask(id: number): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.displayTasks();
        this.saveToLocalStorage();
    }
      
  
    markTaskAsDone(id: number): void {
        let task: TaskImplementation | null = null;
        for (const t of this.tasks) {
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
    }
  
    displayTasks(): void {
        
        const tasks = this.loadFromLocalStorage('tasks');
        const taskListElement = document.getElementById('taskList');
      

        if (taskListElement) {
          taskListElement.innerHTML = '';
    
          this.tasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
              <input type="checkbox" ${task.done ? 'checked' : ''} onchange="markTaskAsDone(${task.id})">
              ${task.description}
              <button onclick="removeTask(${task.id})">Remove</button>
            `;
            taskListElement.appendChild(listItem);
          });
        }
    }

    saveToLocalStorage(): void {
        saveToLocalStorage('tasks', this.tasks);
    }

    loadFromLocalStorage(_p0?: string): void {
        const savedTasks = loadFromLocalStorage('tasks');
        if (savedTasks) {
            this.tasks = savedTasks;
            this.displayTasks();
        }
    }
    
  }
  
  const todoList = new ToDoList();

  
    function addTask(): void {
        const newTaskInput = document.getElementById('newTaskInput') as HTMLInputElement;
        if (newTaskInput && newTaskInput.value.trim() !== '') {
          todoList.addTask(newTaskInput.value.trim());
          newTaskInput.value = '';
        }
    }
  
  function removeTask(id: number): void {
    todoList.removeTask(id);
  }
  
  function markTaskAsDone(id: number): void {
    todoList.markTaskAsDone(id);
  }
  
  todoList.displayTasks();


  