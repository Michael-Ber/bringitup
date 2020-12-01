export default class Difference {
    constructor(oldOfficer, newOfficer, items) {
        this.oldOfficer = document.querySelector(oldOfficer);
        this.newOfficer = document.querySelector(newOfficer);
        this.itemsOld = this.oldOfficer.querySelectorAll(items);
        this.itemsNew = this.newOfficer.querySelectorAll(items);
        this.counterOld = 0;
        this.counterNew = 0;
    }

    bindTriggers(nodeElem, counter, items) {
        nodeElem.querySelector('.plus').addEventListener('click', () => {
            if(counter < items.length - 2) {
                items[counter].style.display = 'flex';
                items[counter].classList.add('fadeIn');
                counter++;
            }else {
                items[counter].style.display = 'flex';
                items[counter].classList.add('fadeIn');
                items[items.length-1].remove();
            }
                
        });

    }

    hideItems(nodeElem) {
        nodeElem.forEach((item, i, arr) => {
            if(i !== (arr.length-1)) {
                item.style.display = 'none';
                item.classList.add('animated');
                item.classList.remove('fadeIn');
            }
        });

    }

    init() {
        this.hideItems(this.itemsOld);
        this.hideItems(this.itemsNew);
        this.bindTriggers(this.oldOfficer, this.counterOld, this.itemsOld);
        this.bindTriggers(this.newOfficer, this.counterNew, this.itemsNew);
    }
}