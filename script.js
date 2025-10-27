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
    console.log("Simülasyon güncelleniyor (hesaplama yapılıyor)...");

    let leftTorque = 0;
    let rightTorque = 0;

    // Hafızadaki tüm nesneler üzerinde döngü başlat
    placedObjects.forEach(obj => {
        if (obj.distance < 0) {
            // Bu nesne Sol Tarafta
            // Tork = ağırlık * mesafe (mesafenin mutlak değerini alıyoruz)
            leftTorque += obj.weight * Math.abs(obj.distance);
        } else {
            // Bu nesne Sağ Tarafta
            rightTorque += obj.weight * obj.distance;
        }
    });


    const torqueDifference = rightTorque - leftTorque;


    const angle = Math.max(-30, Math.min(30, torqueDifference / 10));

    console.log(`Tork Farkı: ${torqueDifference}, Hesaplanan Açı: ${angle.toFixed(1)}°`);


}



seesawPlank.addEventListener('click', function (event) {
    console.log("Tahterevalliye tıklandı!");

    // 1. Ağırlığı ve Pozisyonları Hesapla
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