const yeniGorev = document.querySelector('.input-gorev');
const yeniGorevEkleBtn = document.querySelector('.btn-gorev-ekle');
const gorevListesi = document.querySelector('.gorev-listesi');

yeniGorevEkleBtn.addEventListener('click', gorevEkle);
gorevListesi.addEventListener('click', gorevSilTamamla);
document.addEventListener('DOMContentLoaded', localStorageOku);


function gorevSilTamamla (e) {
   const tiklanilanEleman = e.target;

   if(tiklanilanEleman.classList.contains('gorev-btn-tamamlandi')) {
        console.log("tiklandi check");
        tiklanilanEleman.parentElement.classList.toggle('gorev-tamamlandi')
   }

   if(tiklanilanEleman.classList.contains('gorev-btn-sil')) {
      
    if(confirm('Silecek misin?')) {
            tiklanilanEleman.parentElement.classList.toggle('kaybol');

        tiklanilanEleman.parentElement.addEventListener('transitionend', function(){
            tiklanilanEleman.parentElement.remove();
        });
    }
   }

}


function gorevEkle(e) {

    e.preventDefault();

    if (yeniGorev.value.length > 1 ) {
         gorevItemOlustur(yeniGorev.value);
        //local storage kaydet
        localStorageKaydet(yeniGorev.value);
        yeniGorev.value = '';
    } else {
    }  

};


function localStorageKaydet (yeniGorev) {
    let gorevler;

    if(localStorage.getItem('gorevler') === null) {
        gorevler = [];
    } else {
        gorevler = JSON.parse(localStorage.getItem('gorevler'));
    }

    gorevler.push(yeniGorev);
    localStorage.getItem('gorevler', JSON.stringify(gorevler));

}

function localStorageOku() {
    let gorevler;

    if(localStorage.getItem('gorevler') === null) {
        gorevler = [];
    } else {
        gorevler = JSON.parse(localStorage.getItem('gorevler'));
    }
    
    gorevler.forEach(function(gorev) {
        gorevItemOlustur(gorev);       
    });
}

function gorevItemOlustur(gorev) {
    //div oluşturma

    const gorevDiv = document.createElement('div');
    gorevDiv.classList.add('gorev-item');

    //li oluştur
    const gorevLi = document.createElement('li');
    gorevLi.classList.add('gorev-tanim');
    gorevLi.innerText = gorev;
    gorevDiv.appendChild(gorevLi);

    //tamamlandı butonu ekle
    const gorevTamamBtn = document.createElement('button');
    gorevTamamBtn.classList.add('gorev-btn');
    gorevTamamBtn.classList.add('gorev-btn-tamamlandi');
    gorevTamamBtn.innerHTML = '<i class="fas fa-check-square"></i>';
    gorevDiv.appendChild(gorevTamamBtn);

    //sil butonu ekle

    const gorevSilBtn = document.createElement('button');
    gorevSilBtn.classList.add('gorev-btn');
    gorevSilBtn.classList.add('gorev-btn-sil');
    gorevSilBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    gorevDiv.appendChild(gorevSilBtn);
   

    //ul div ekleme
    gorevListesi.appendChild(gorevDiv);

}

