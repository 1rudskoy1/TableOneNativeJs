import { render, add, uploadJson, addJson } from "./action.js";
import { dragItems } from "./drop.js";
export let data = [{name:"name1", value:"value1"},{name:"name2", value: "value2"},{name:"name3", value: "value3"}];
function startApp(data){
    const addButton = document.querySelector('[data-role = "add-button"]');
    const uploadButton = document.querySelector('[data-role="upload"]');
    const addLotButton = document.querySelector('[data-role="add-lot-button"]');
    addButton.addEventListener('click', add);
    uploadButton.addEventListener('click', uploadJson);
    addLotButton.addEventListener('click', addJson);
    render(data);
    dragItems();
}
startApp(data);