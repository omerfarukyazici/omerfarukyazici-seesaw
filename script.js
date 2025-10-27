console.log("JavaScript dosyası yüklendi!");

const seesawPlank = document.querySelector("#seesaw-plank");
const resetButton = document.querySelector("#reset-button");
const leftWeightDisplay = document.querySelector("#left-weight-display");
const rightWeightDisplay = document.querySelector("#right-weight-display");
const nextWeightDisplay = document.querySelector("#next-weight-display");
const tiltAngleDisplay = document.querySelector("#tilt-angle-display");
const logList = document.querySelector("#log-list");


let placedObjects = [];
const plankWidth = 400;
const plankCenter = plankWidth / 2;



function getRandomWeight() {
    return Math.floor(Math.random() * 10) + 1;
}

function createWeightElement(weight, positionFromLeft) {
    const newWeight = document.createElement("div");
    newWeight.className = "weight-object";
    newWeight.style.left = `${positionFromLeft}px`;
    newWeight.textContent = `${weight}kg`;
    newWeight.setAttribute("data-weight", weight);
    seesawPlank.appendChild(newWeight);
}

function updateSimulation() {
    console.log("Simülasyon güncelleniyor...");

    let leftTorque = 0;
    let rightTorque = 0;
    let totalLeftWeight = 0;
    let totalRightWeight = 0;

    placedObjects.forEach(obj => {
        if (obj.distance < 0) {
            leftTorque += obj.weight * Math.abs(obj.distance);
            totalLeftWeight += obj.weight;
        } else {
            rightTorque += obj.weight * obj.distance;
            totalRightWeight += obj.weight;
        }
    });

    const torqueDifference = rightTorque - leftTorque;
    const angle = Math.max(-30, Math.min(30, torqueDifference / 10));


    seesawPlank.style.transform = `rotate(${angle}deg)`;

    leftWeightDisplay.textContent = `${totalLeftWeight.toFixed(1)} kg`;
    rightWeightDisplay.textContent = `${totalRightWeight.toFixed(1)} kg`;
    tiltAngleDisplay.textContent = `${angle.toFixed(1)}°`;
}

seesawPlank.addEventListener('click', function (event) {
    console.log("Tahterevalliye tıklandı!");

    const newWeightValue = getRandomWeight();
    const clickPosition = event.offsetX;
    const distanceFromCenter = clickPosition - plankCenter;

    // Nesneyi Yarattık
    createWeightElement(newWeightValue, clickPosition);

    // Hafızaya  Ekle
    const newObject = {
        weight: newWeightValue,
        distance: distanceFromCenter
    };
    placedObjects.push(newObject);

    console.log("Hafızadaki nesneler:", placedObjects);

    // Her yeni nesne eklendiğinde, tüm fiziği yeniden hesapla
    updateSimulation();
});

resetButton.addEventListener('click', function () {
    console.log("Clicked reset button!");
});