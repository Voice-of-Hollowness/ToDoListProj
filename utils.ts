export function saveToLocalStorage(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
  
export function loadFromLocalStorage(key: string): any {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : null;
}