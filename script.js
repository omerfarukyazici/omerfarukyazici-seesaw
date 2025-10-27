const seesawPlank = document.querySelector("#seesaw-plank");

// Reset butonunun 'id'si ile seçiyoruz
const resetButton = document.querySelector("#reset-button");

// Bilgi panelindeki yazıları da js elemanlarına bağlıyoruz
const leftWeightDisplay = document.querySelector(" #left-weight-display");
const rightWeightDisplay = document.querySelector("#right-weight-display");
const nextWeightDisplay = document.querySelector(" #next-weight-display");
const tiltAngleDisplay = document.querySelector("#tilt-angle-display");
const logList = document.querySelector("#log-list");



//Metotlar
//1 ile 10 kg arasındaki kiloyu rastgele oluşturan metot
function getRandomWeight() {
    return Math.floor(Math.random() * 10) + 1;
}

//Event listenerlar eklenecek

//tahterevalli çubuğuna dokunulduğunda çalışacak
seesawPlank.addEventListener('click', function (event) {
    // 'event' SADECE BU SÜSLÜ PARANTEZLER İÇİNDE GEÇERLİDİR

    console.log("Clicked seesaw!");

    // --- DOĞRU YER BURASI ---
    // Bu kod artık sadece tıklandığında çalışacak.
    const newWeightValue = getRandomWeight();
    const clickPosition = event.offsetX; // Hata vermez, çünkü 'event' artık tanımlı
    createWeightElement(newWeightValue, clickPosition);

    // Konsol log'unu da içeri alalım
    console.log(`Yeni ağırlık eklendi: ${newWeightValue}kg, Pozisyon: ${clickPosition}px`);
    console.log(event);
}); // <-- FONKSİYONUN BİTİŞİ

// Reset düğmesine click olayı eklendi
resetButton.addEventListener('click', function () {
    console.log("Clicked reset button!");
});

console.log(`Yeni ağırlık eklendi: ${newWeightValue}kg, Pozisyon: ${clickPosition}px`);

function createWeightElement(weight, positionFromLeft) {
    //  Yeni bir <div> elemanı oluştur 
    const newWeight = document.createElement("div");

    //  CSS sınıfını atanır
    newWeight.className = "weight-object";

    // Pozisyonunu ayarlanır
    // Tıklanan yerin pozisyonunu 'left' stili olarak veririz
    newWeight.style.left = `${positionFromLeft}px`;

    // 4. İçine ağırlık değerini yaz 
    newWeight.textContent = `${weight}kg`;

    // 5. CSS'te renkleri ayarlamak için data-attribute 
    newWeight.setAttribute("data-weight", weight);

    // 6. Yaratılan bu div'i tahterevalli çubuğunun içine 
    seesawPlank.appendChild(newWeight);
}