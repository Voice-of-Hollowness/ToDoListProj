const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadFromLocalStorage(key) {
    var savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : null;
}

module.exports = { saveToLocalStorage, loadFromLocalStorage };