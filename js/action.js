import {data} from "./index.js"

export function render(data){
    let table = document.querySelector('[data-role = "items"]');
    table.innerHTML = "";
    data.forEach((item, index) => {
        table.insertAdjacentHTML("afterbegin", `
        <tr data-count="${index}" draggable="true" data-role="item">
                <td class = "drop-icon">=</td>
                <td>#${index}</td>
                <td data-input data-role="input-name" contenteditable>${item.name}</td>
                <td data-input data-role="input-value" contenteditable>${item.value}</td>
                <td data-role="remove-button" class="btn btn-danger button" data-index="${index}">Удалить</td>
            </tr>
            `)
    })
    buttonRemoveListener()
    changeInputListener()
    
}

export function add (){
    let inputName = document.querySelector('[data-role="add-name"]');
    let inputValue = document.querySelector('[data-role="add-value"]');
    let newItem = {name: inputName.value, value: inputValue.value};
    
    data.push(newItem);
    render(data);
    buttonRemoveListener(data.length)
    inputName.value = '';
    inputValue.value = '';
}  

function buttonRemoveListener (btnInd = false) {
    let removeButtons = btnInd ? document.querySelectorAll(`[data-index="${btnInd}"]`) : document.querySelectorAll('[data-role="remove-button"]');
    removeButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => removeItem(e.target))
    })
}

function removeItem (target) {
    let index = target.getAttribute('data-index');
    let rmItem = document.querySelector(`[data-count="${index}"]`);
    data.shift(index);
    rmItem.remove();

}
function changeInputListener(){
    let inputName = document.querySelectorAll('[data-role="input-name"], [data-role="input-value"]');
    inputName.forEach((input) => {
        input.addEventListener('blur', (e) => { changeInput(e.target)})
    })
}
function changeInput(target){
    let index = target.parentNode.getAttribute('data-count');
    let objItem = target.getAttribute('data-role').split("-")[1];
    data[index][objItem] = target.innerHTML;
}

export function uploadJson () {
    const textArea = document.querySelector('[data-role="add-textarea"]');
    textArea.value = "";
    const dataObj = JSON.stringify(Object.assign({}, data))
    textArea.value = dataObj;

}

export function addJson(){
    const textArea = document.querySelector('[data-role="add-textarea"]');
    let obj = JSON.parse(textArea.value);
    var quest = confirm('Удалить старые данные?');
    if(quest){
        data.length = 0;
    }
    for(let indx in obj){
        data.push(obj[indx])
    }
    render(data);
    textArea.value = "";
    
}
