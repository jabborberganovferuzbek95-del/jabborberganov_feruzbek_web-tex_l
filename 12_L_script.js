// script.js

// === DOM elementlarini tanlab olish ===
const bgElement = document.getElementById('bg');
const p2Element = document.getElementById("p2"); 

const nameInput = document.getElementById('name');
const surnameInput = document.getElementById('surname');
const ageInput = document.getElementById('age');

const pName = document.getElementById('p_name');
const pSurname = document.getElementById('p_surname');
const pAge = document.getElementById('p_age');

// ⭐ YANGI ELEMENT TANLANDI
const textColorInput = document.getElementById("textColor"); 
const colorInput = document.getElementById("color");
const fontsizeInput = document.getElementById("fontsize");

const btnSave = document.getElementById('btnSave');
const btnLoad = document.getElementById('btnLoad');
const btnChange = document.getElementById('btnChange');
const btnClear = document.getElementById('btnclear');


// === Funksiyalar ===

/**
 * Ma'lumotlarni Local Storage'ga saqlaydi
 */
function saveUserInfo() {
    const userInfo = {
        name: nameInput.value,
        surname: surnameInput.value,
        age: ageInput.value
    };
    
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    alert("Ma'lumotlar Local Storage'ga saqlandi!");
    loadUserInfo();
}

/**
 * Local Storage'dan ma'lumotlarni yuklaydi va displeyga chiqaradi
 */
function loadUserInfo() {
    const userInfoString = localStorage.getItem("userInfo");
    
    let ism, familiya, yosh;

    if (userInfoString) {
        const userInfo = JSON.parse(userInfoString);
        
        nameInput.value = userInfo.name || '';
        surnameInput.value = userInfo.surname || '';
        ageInput.value = userInfo.age || '';

        ism = userInfo.name || 'Mavjud emas';
        familiya = userInfo.surname || 'Mavjud emas';
        yosh = userInfo.age || 'Mavjud emas';

        pName.innerHTML = `Ism: <b>${ism}</b>`;
        pSurname.innerHTML = `Familiya: <b>${familiya}</b>`;
        pAge.innerHTML = `Yosh: <b>${yosh}</b>`;

    } else {
        ism = 'Mavjud emas';
        familiya = 'Mavjud emas';
        yosh = 'Mavjud emas';

        pName.innerHTML = 'Ism: <b>Mavjud emas</b>';
        pSurname.innerHTML = 'Familiya: <b>Mavjud emas</b>';
        pAge.innerHTML = 'Yosh: <b>Mavjud emas</b>';
    }

    // p2 elementiga ma'lumotlarni chiqarish
    p2Element.innerHTML = `
        **Assalomu alaykum, ${ism}!** Ma'lumotlaringiz:
        Familiya: **${familiya}**, Yosh: **${yosh}**
    `;
}

/**
 * Fon rangini, tekst rangini va shrift o'lchamini o'zgartiradi va Local Storage'da saqlaydi.
 */
function applyStyleChanges() {
    // ⭐ Tekst rangi qiymatini olish va saqlash
    const newTextColor = textColorInput.value; 
    localStorage.setItem("textColor", newTextColor); 

    const newColor = colorInput.value;
    localStorage.setItem("bgColor", newColor);

    const newFontSize = fontsizeInput.value;
    localStorage.setItem("fontSize", newFontSize);
    
    // O'zgartirishlarni darhol qo'llash
    p2Element.style.color = newTextColor; // Tekst rangini qo'llash
    bgElement.style.backgroundColor = newColor;
    p2Element.style.fontSize = newFontSize + "px";
    
    alert(`Dizayn sozlamalari yangilandi!`);
}

/**
 * Local Storage'dagi rang va shrift sozlamalarini yuklash.
 */
function loadStyleSettings() {
    // ⭐ Tekst rangi qiymatini yuklash
    const storedTextColor = localStorage.getItem("textColor");
    const storedColor = localStorage.getItem("bgColor");
    const storedFontSize = localStorage.getItem("fontSize");

    // Tekst rangini tiklash
    if (storedTextColor) {
        p2Element.style.color = storedTextColor;
        textColorInput.value = storedTextColor; 
    } else {
        p2Element.style.color = "blue"; // Boshlang'ich qiymat
    }

    // Fon rangini tiklash
    if (storedColor) {
        bgElement.style.backgroundColor = storedColor;
        colorInput.value = storedColor;
    }

    // Shrift o'lchamini tiklash
    if (storedFontSize) {
        p2Element.style.fontSize = storedFontSize + "px";
        fontsizeInput.value = storedFontSize;
    }
}


/**
 * Local Storage'ni tozalaydi va sahifani dastlabki holatga qaytaradi.
 */
function clearLocalStorage() {
    localStorage.clear();
    alert("Local Storage to'liq tozalandi!");
    
    // Stil sozlamalarini dastlabki holatga qaytarish uchun
    bgElement.style.backgroundColor = '#f0f0f0'; 
    colorInput.value = '#ffffff';
    
    // ⭐ Tekst rangini dastlabki holatga qaytarish
    p2Element.style.color = "blue"; 
    textColorInput.value = '#000000'; 
    
    p2Element.style.fontSize = '16px';
    fontsizeInput.value = '16';
    
    // Input maydonlarini bo'shatish
    nameInput.value = '';
    surnameInput.value = '';
    ageInput.value = '';

    loadUserInfo();
}


// === Dasturni ishga tushirish ===
loadStyleSettings();
loadUserInfo(); 

// === Hodisa (Event) tinglovchilarni ulash ===
btnSave.addEventListener('click', saveUserInfo);
btnLoad.addEventListener('click', loadUserInfo);
btnChange.addEventListener('click', applyStyleChanges);
btnClear.addEventListener('click', clearLocalStorage);

// Boshlang'ich stillar (fontFamily)
p2Element.style.fontFamily = "Arial";