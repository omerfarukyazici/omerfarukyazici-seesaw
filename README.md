# Tahterevalli Simülasyonu (Seesaw Simulation)

Bu proje, bir tahterevalli üzerinde tork ve denge fiziğini simüle eden interaktif bir web uygulamasıdır. Kullanıcılar, tahterevalli çubuğuna tıklayarak rastgele ağırlıklar ekleyebilir ve çubuğun denge durumunu gerçek zamanlı olarak gözlemleyebilir.

Bu proje, **hiçbir harici kütüphane veya framework (React, jQuery, vb.) kullanılmadan**, tamamen saf (Vanilla) JavaScript, HTML5 ve CSS3 ile geliştirilmiştir.


**Video Anlatımı (Video Explanation):** https://youtu.be/iKxm72cpYQk

---

## Proje Özellikleri

* **İnteraktif Ağırlık Ekleme:** Tahterevalli çubuğuna tıklanan herhangi bir noktaya 1-10 kg arası rastgele bir ağırlık eklenir.
* **Gerçek Zamanlı Fizik:** Her yeni ağırlık eklendiğinde, sol ve sağ tork anında yeniden hesaplanır ve tahterevalli, denge açısına göre hareket eder.
* **Pürüzsüz Animasyon:** Tahterevallinin eğim animasyonu, performans için JavaScript yerine `transition` özelliği kullanılarak saf CSS ile sağlanmıştır.
* **Dinamik Arayüz (UI):** Üst paneldeki toplam ağırlıklar ve eğim açısı, her eylemde anında güncellenir.
* **Kalıcı Hafıza (Persistence):** Simülasyonun mevcut durumu (eklenen tüm ağırlıklar ve pozisyonları) tarayıcının `localStorage` (Yerel Depolama) alanına kaydedilir. Sayfa yenilendiğinde durum kaybolmaz.
* **Sıfırlama:** "Reset" düğmesi, tüm ağırlıkları, logları ve yerel depolamayı temizleyerek simülasyonu başlangıç durumuna döndürür.
* **Olay Günlüğü (Event Log):** Eklenen her ağırlık veya sıfırlama işlemi, bir log listesine metin olarak kaydedilir.

---

## Kullanılan Teknolojiler

* **HTML5:** Uygulamanın temel iskeleti.
* **CSS3:** Flexbox (yerleşim için), `position: absolute` (ağırlıkları konumlandırmak için), `transform: rotate()` (eğimi vermek için) ve `transition` (animasyon için).
* **Saf (Vanilla) JavaScript (ES6+):**
    * DOM Manipülasyonu (`querySelector`, `createElement`, `appendChild`, `removeChild`)
    * Olay Dinleyicileri (`addEventListener`)
    * Yerel Depolama (`localStorage.setItem`, `localStorage.getItem`)
    * Diziler (Array) ve Obje (Object) yönetimi

---

## Düşünce Sürecim ve Tasarım Kararlarım

Bu bölüm, projeyi geliştirirken aldığım mimari kararları açıklamaktadır.

### 1. Durum Yönetimi (State Management)

Projenin "hafızasını" yönetmek için en önemli kararım, `placedObjects = []` adında bir dizi (array) kullanmak oldu. Bu dizi, benim "tek doğruluk kaynağım" (single source of truth) olarak görev yaptı. Ekrana eklenen her ağırlık için, onun görsel `div`'ini değil, sadece verisini (data) sakladım: ` { weight: 5, distance: -150 } `.

### 2. "Update Simulation" Fonksiyonu (Ana Beyin)

`updateSimulation()` adında bir ana fonksiyon oluşturdum. Bir ağırlık eklendiğinde veya simülasyon sıfırlandığında, bu fonksiyon tetiklenir. Bu fonksiyonun görevi:
1.  `placedObjects` dizisini `forEach` ile en baştan taramak.
2.  `leftTorque`, `rightTorque` ve toplam ağırlıkları sıfırdan hesaplamak.
3.  Eğim açısını (`angle`) formüle göre bulmak.
4.  Hesaplanan bu verilerle DOM'u (yani `style.transform` ve `textContent`'ları) güncellemek.

Bu yöntem, her seferinde tüm durumu yeniden hesaplayarak hatalı veya senkronize olmayan verilerin önüne geçer.

### 3. Fizik ve Koordinat Hesaplaması

Proje, torkun "merkezden uzaklığa" göre hesaplanmasını istiyordu.
* Tıklama pozisyonunu `event.offsetX` ile (çubuğun sol kenarından uzaklık) aldım.
* Bunu `distanceFromCenter = clickPosition - plankCenter` formülü ile merkezden uzaklığa çevirdim.
* Bu sayede sol taraf (örn: 100px - 200px = -100px) doğal olarak **negatif**, sağ taraf ise (örn: 300px - 200px = +100px) **pozitif** değerler üretti. Bu, tork hesaplamasını çok basitleştirdi.

### 4. Animasyon (CSS vs. JavaScript)

Tahterevallinin dönüş animasyonunu JavaScript ile (`setInterval` vb.) yapabilirdim. Ancak, `seesawPlank.style.transform = \`rotate(${angle}deg)\`;` komutunu kullanarak sadece CSS'e "gitmek istediğin son açıyı" söyledim. `style.css` dosyama eklediğim `transition: transform 0.5s ease;` kuralı, o açıya pürüzsüz ve performansı yüksek bir şekilde gitme işini tarayıcya devretti.

---

## Karşılaşılan Zorluklar ve Sınırlamalar (Trade-offs)

* **Zorluk:** En zor kısım, `localStorage`'dan veriyi geri yüklemekti. Sadece diziyi geri yüklemek yetmedi. Dizi yüklendikten sonra, `forEach` ile dizideki her bir obje için `createWeightElement()` fonksiyonunu manuel olarak çağırarak *görselleri yeniden oluşturmam* (re-render) gerekti.
* **Sınırlama:** Tork formülü basitleştirilmiştir. `(rightTorque - leftTorque) / 10` formülündeki `/ 10` faktörü, gerçek fiziksel bir katsayı değil, eğimin görsel olarak daha "yumuşak" ve abartısız görünmesi için benim tarafımdan eklenen bir "sönümleme" (damping) faktörüdür.
* **Sınırlama:** Ağırlıklar fiziksel nesneler değildir. Birbirleriyle çarpışmaz, üst üste binemezler. Sadece görsel `div` elemanlarıdır.
