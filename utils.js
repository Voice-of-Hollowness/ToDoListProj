"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadFromLocalStorage = exports.saveToLocalStorage = void 0;
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
exports.saveToLocalStorage = saveToLocalStorage;
function loadFromLocalStorage(key) {
    var savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : null;
}
exports.loadFromLocalStorage = loadFromLocalStorage;
