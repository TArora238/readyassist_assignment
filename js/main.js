displayDetailsSlider = (id) => {
    document.getElementById(id).classList.add("showDetailsSlider");
    if (id === 'serviceDetails') {
        document.querySelector('#serviceSidebar .fa-search').classList.add("invisible");
        document.querySelector('#serviceSidebar .fa-search').classList.remove("visible");
    } else {
        document.querySelector('#customerSidebar .fa-search').classList.add("invisible");
        document.querySelector('#customerSidebar .fa-search').classList.remove("visible");        
    }
}


hideDetailsSlider = (id) => {
    document.getElementById(id).classList.remove("showDetailsSlider");
    if (id === 'serviceDetails') {
        document.querySelector('#serviceSidebar .fa-search').classList.add("visible");
        document.querySelector('#serviceSidebar .fa-search').classList.remove("invisible");
    } else {
        document.querySelector('#customerSidebar .fa-search').classList.add("visible");
        document.querySelector('#customerSidebar .fa-search').classList.remove("invisible");
    }
    resetMap();
}

const customerItems = document.querySelectorAll('#customerSidebar .taskItem');
const mechanicsItems = document.querySelectorAll('#serviceSidebar .taskItem');
customerItems.forEach(el => el.addEventListener('click', () => displayDetailsSlider('customerDetails')));
mechanicsItems.forEach(el => el.addEventListener('click', () => displayDetailsSlider('serviceDetails')));
