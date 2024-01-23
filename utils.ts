import { LocalStorage } from 'node-localstorage';
import { Task } from './task';
const localStorage = new LocalStorage('./scratch');


export function saveToLocalStorage(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
}
  
export function loadFromLocalStorage(key: string): Task[] | null {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : null;
  }