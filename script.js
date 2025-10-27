const seesawPlank = document.querySelector("#seesaw-plank");

// Reset butonunun 'id'si ile seçiyoruz
const resetButton = document.querySelector("#reset-button");

// Bilgi panelindeki yazıları da js elemanlarına bağlıyoruz
const leftWeightDisplay = document.querySelector(" #left-weight-display");
const rightWeightDisplay = document.querySelector("#right-weight-display");
const nextWeightDisplay = document.querySelector(" #next-weight-display");
const tiltAngleDisplay = document.querySelector("#tilt-angle-display");
const logList = document.querySelector("#log-list");

//Event listenerlar eklenecek
//tahterevalli çubuğuna dokunulduğunda çalışacak
seesawPlank.addEventListener('click', function (event) {

    console.log("Clicked seesaw!");

    console.log(event);
});

// Reset düğmesine click olayı eklendi
resetButton.addEventListener('click', function () {

    console.log("Clicked reset button!");
});