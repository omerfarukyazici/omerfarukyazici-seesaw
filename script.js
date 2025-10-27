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

let nextWeight = 0;

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

function clearWeightElements() {
    // seesawPlank'in içindeki .weight-object sınıfına sahip tüm elemanları seç
    const weights = seesawPlank.querySelectorAll(".weight-object");

    // Hepsini tek tek ebeveyninden (seesawPlank) kaldır
    weights.forEach(weight => {
        seesawPlank.removeChild(weight);
    });
}

// --- YENİ: Log listesini temizleyen fonksiyon ---
/**
 * Log listesinin ('ul') içindeki tüm 'li' elemanlarını siler.
 */
function clearLogs() {
    // innerHTML'i boş bir string'e ayarlamak, tüm alt elemanları silmenin en hızlı yoludur.
    logList.innerHTML = "";
}

function generateNextWeight() {
    nextWeight = getRandomWeight();
    nextWeightDisplay.textContent = `${nextWeight} kg`;
}

function addLog(message) {
    const newLogItem = document.createElement("li");
    newLogItem.textContent = message;
    // .prepend() kullanarak yeni log'un en üste gelmesini sağlıyoruz
    logList.prepend(newLogItem);
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

    // 1. Ağırlığı ve Pozisyonları Hesapla
    const newWeightValue = nextWeight;
    const clickPosition = event.offsetX;
    const distanceFromCenter = clickPosition - plankCenter;

    // 2. Nesneyi Yarat
    createWeightElement(newWeightValue, clickPosition);

    // 3. Hafızaya Ekle
    const newObject = {
        weight: newWeightValue,
        distance: distanceFromCenter
    };
    placedObjects.push(newObject);

    // 4. Log Ekle
    const side = distanceFromCenter < 0 ? "left" : "right";
    const dist = Math.abs(Math.round(distanceFromCenter));
    addLog(`${newWeightValue}kg dropped on ${side} side at ${dist}px from center`);

    // 5. Bir Sonraki Ağırlığı Hazırla
    generateNextWeight();

    // 6. Fiziği yeniden hesapla
    updateSimulation();
});

resetButton.addEventListener('click', function () {
    console.log("Reset düğmesine tıklandı! Her şey sıfırlanıyor...");

    // 1. Hafızayı (State) Temizle
    placedObjects = [];

    // 2. Görsel Ağırlıkları (DOM) Temizle
    clearWeightElements();

    // 3. Logları Temizle
    clearLogs();

    // 4. Simülasyonu Güncelle (Boş diziyle çalışacak ve her şeyi sıfırlayacak)
    // Bu komut, tahterevalliyi 0 dereceye döndürecek ve UI'ı sıfırlayacak.
    updateSimulation();

    // 5. Yeni bir "Next Weight" hazırla
    generateNextWeight();

    // 6. Reset log'u ekle
    addLog("Seesaw has been reset.");
});
generateNextWeight();