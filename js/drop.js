export function dragItems(){
    const tasksListElement = document.querySelector(`[data-role="items"]`);
    tasksListElement.addEventListener(`dragstart`, (evt) => {
        evt.target.classList.add(`selected`);
      })
      tasksListElement.addEventListener(`dragend`, (evt) => {
        evt.target.classList.remove(`selected`);
      });

      
      tasksListElement.addEventListener(`dragover`, (evt) => {
        evt.preventDefault();
      
        const activeElement = tasksListElement.querySelector(`.selected`);
        const currentElement = evt.target.parentNode;
        const isMoveable = activeElement !== currentElement &&
        currentElement.hasAttribute(`data-role="items"`);
        if (isMoveable) {
        return;
        }
        const nextElement = getNextElement(evt.clientY, currentElement);
            if (
                nextElement && 
                activeElement === nextElement.previousElementSibling ||
                activeElement === nextElement
            ) {
                return;
            }
        tasksListElement.insertBefore(activeElement, nextElement);
        
      });
      

      const getNextElement = (cursorPosition, currentElement) => {
            const currentElementCoord = currentElement.getBoundingClientRect();
            const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
            const nextElement = (cursorPosition < currentElementCenter) ?
            currentElement :
            currentElement.nextElementSibling;

            return nextElement;
        };

}