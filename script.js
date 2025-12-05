// ==========================================
// CONSTANTS & CONFIG
// ==========================================
const CONFIG = {
  MIN_USERNAME_LENGTH: 3,
  MIN_PASSWORD_LENGTH: 6,
  NOTIFICATION_DURATION: 3000,
  AUTO_LOGIN_REDIRECT_DELAY: 2000
};

// ==========================================
// USER DATABASE
// ==========================================
const ADMIN_USERS = {
  "feruzbek_jabborberganov": { 
    password: "bek3437", 
    role: "admin", 
    email: "feruzbek@admin.com" 
  },
  "admin": { 
    password: "admin123", 
    role: "admin", 
    email: "admin@kitobxon.uz" 
  },
  "moderator": { 
    password: "mod2024", 
    role: "admin", 
    email: "moderator@kitobxon.uz" 
  }
};

let REGISTERED_USERS = {};
let CURRENT_USER = null;

// ==========================================
// BOOKS DATABASE
// ==========================================
const BOOKS_DATABASE = {
  "O'tkan Kunlar": {
    localPath: "https://zakm.uz/media/books/Bahodir_Karim._Otkan_kunlar_ibrati.pdf",
    googleDrive: "https://zakm.uz/media/books/Bahodir_Karim._Otkan_kunlar_ibrati.pdf", 
    downloadLink: "https://zakm.uz/media/books/Bahodir_Karim._Otkan_kunlar_ibrati.pdf"
  },
  "Mehrobdan Chayon": {
    localPath: "https://zakm.uz/media/books/Abdulla_Qodiriy._Mehrobdan_chayon.pdf",
    googleDrive: "https://zakm.uz/media/books/Abdulla_Qodiriy._Mehrobdan_chayon.pdf",
    downloadLink: "https://zakm.uz/media/books/Abdulla_Qodiriy._Mehrobdan_chayon.pdf"
  },
  "Kecha va Kunduz": {
    localPath: "http://rasul.template.uz/sites/default/files/cholpon-kecha-va-kunduz.pdf",
    googleDrive: "http://rasul.template.uz/sites/default/files/cholpon-kecha-va-kunduz.pdf",
    downloadLink: "http://rasul.template.uz/sites/default/files/cholpon-kecha-va-kunduz.pdf"
  },
  "Sarob": {
    localPath: "http://iht.uz/download/slides/2kurs/literature/adabiyot/2sem/0010_10_mavzu_A_Qahhor_Sarob_.pdf",
    googleDrive: "http://iht.uz/download/slides/2kurs/literature/adabiyot/2sem/0010_10_mavzu_A_Qahhor_Sarob_.pdf",
    downloadLink: "http://iht.uz/download/slides/2kurs/literature/adabiyot/2sem/0010_10_mavzu_A_Qahhor_Sarob_.pdf"
  },
  "Tushda kechgan umrlar": {
    localPath: "https://edu.utu-ranch.uz/media/files/2024/08/26/Tushda_kechgan_umrlar_Otkir_Hoshimov.pdf",
    googleDrive: "https://edu.utu-ranch.uz/media/files/2024/08/26/Tushda_kechgan_umrlar_Otkir_Hoshimov.pdf",
    downloadLink: "https://edu.utu-ranch.uz/media/files/2024/08/26/Tushda_kechgan_umrlar_Otkir_Hoshimov.pdf"
  },
  "Bahor qaytmaydi": {
    localPath: "https://edu.utu-ranch.uz/media/files/2024/07/26/Otkir-Hoshimov-Bahor-qaytmaydi.pdf",
    googleDrive: "https://edu.utu-ranch.uz/media/files/2024/07/26/Otkir-Hoshimov-Bahor-qaytmaydi.pdf",
    downloadLink: "https://edu.utu-ranch.uz/media/files/2024/07/26/Otkir-Hoshimov-Bahor-qaytmaydi.pdf"
  }
,
  "Yulduzli Tunlar": {
    localPath: "https://namdu.uz/media/Books/pdf/2024/10/15/NamDU-ARM-13454-Yulduzli_tunlar.pdf",
    googleDrive: "https://namdu.uz/media/Books/pdf/2024/10/15/NamDU-ARM-13454-Yulduzli_tunlar.pdf",
    downloadLink: "https://namdu.uz/media/Books/pdf/2024/10/15/NamDU-ARM-13454-Yulduzli_tunlar.pdf"
  },
  "Ikki Eshik Orasi": {
    localPath: "https://ipkmvd.uz/media/pdf/kitoblar/Ikki_eshik_orasi_Otkir_Hoshimov_Xo9QkWN.pdf",
    googleDrive: "https://ipkmvd.uz/media/pdf/kitoblar/Ikki_eshik_orasi_Otkir_Hoshimov_Xo9QkWN.pdf",
    downloadLink: "https://ipkmvd.uz/media/pdf/kitoblar/Ikki_eshik_orasi_Otkir_Hoshimov_Xo9QkWN.pdf"
  },
  "Dunyoning Ishlari": {
    localPath: "https://zakm.uz/media/books/O._Hoshimov_Dunyoning_ishlari.pdf",
    googleDrive: "https://zakm.uz/media/books/O._Hoshimov_Dunyoning_ishlari.pdf",
    downloadLink: "https://zakm.uz/media/books/O._Hoshimov_Dunyoning_ishlari.pdf"
  },
  "Ufq": {
    localPath: "https://uznel.natlib.uz:444/FN/dl_image/uload/userfiles/files/31_%20Ufq.pdf",
    googleDrive: "https://uznel.natlib.uz:444/FN/dl_image/uload/userfiles/files/31_%20Ufq.pdf",
    downloadLink: "https://uznel.natlib.uz:444/FN/dl_image/uload/userfiles/files/31_%20Ufq.pdf"
  },
  "Kichkina Shahzoda": {
    localPath: "https://zakm.uz/media/books/A.S.Ekzyuperi._Kichkina_Shahzoda.pdf",
    googleDrive: "https://zakm.uz/media/books/A.S.Ekzyuperi._Kichkina_Shahzoda.pdf",
    downloadLink: "https://zakm.uz/media/books/A.S.Ekzyuperi._Kichkina_Shahzoda.pdf"
  },
  "Qutlug' Qon": {
    localPath: "https://cabinet.uzrvb.uz/downloadFile?id=2&book=1",
    googleDrive: "https://cabinet.uzrvb.uz/downloadFile?id=2&book=1",
    downloadLink: "https://cabinet.uzrvb.uz/downloadFile?id=2&book=1"
  },
  "Odam bolish qiyin": {
    localPath: "https://srsl.uz/adminpanel/files/global/kitoblar/22/Odam%20bo%27lish%20qiyin.pdf",
    googleDrive: "https://srsl.uz/adminpanel/files/global/kitoblar/22/Odam%20bo%27lish%20qiyin.pdf",
    downloadLink: "https://srsl.uz/adminpanel/files/global/kitoblar/22/Odam%20bo%27lish%20qiyin.pdf"
  },
  "Yorug' tog'larga ketamiz": {
    localPath: "https://tiu-edu.uz/media/books/2024/05/23/1712389089.pdf",
    googleDrive: "https://tiu-edu.uz/media/books/2024/05/23/1712389089.pdf",
    downloadLink: "https://tiu-edu.uz/media/books/2024/05/23/1712389089.pdf"
  },
  "Alkimyogar": {
    localPath: "https://kitobsevar.uz/kxpv/xrpt_pha0s7epk1e53bl8aoa2xo662bmb3j9is9ia6mrgdxa7ym4z34poikjalybe80np9xp509advb0.pdf",
    googleDrive: "https://kitobsevar.uz/kxpv/xrpt_pha0s7epk1e53bl8aoa2xo662bmb3j9is9ia6mrgdxa7ym4z34poikjalybe80np9xp509advb0.pdf",
    downloadLink: "https://kitobsevar.uz/kxpv/xrpt_pha0s7epk1e53bl8aoa2xo662bmb3j9is9ia6mrgdxa7ym4z34poikjalybe80np9xp509advb0.pdf"
  },
  "Jinoyat va Jazo": {
    localPath: "https://zakm.uz/media/books/%D0%A4.%D0%94%D0%BE%D1%81%D1%82%D0%BE%D0%B5%D0%B2%D1%81%D0%BA%D0%B8%D0%B9_%D0%96%D0%B8%D0%BD%D0%BE%D1%8F%D1%82_%D0%B2%D0%B0_%D0%B6%D0%B0%D0%B7%D0%BE.pdf",
    googleDrive: "https://zakm.uz/media/books/%D0%A4.%D0%94%D0%BE%D1%81%D1%82%D0%BE%D0%B5%D0%B2%D1%81%D0%BA%D0%B8%D0%B9_%D0%96%D0%B8%D0%BD%D0%BE%D1%8F%D1%82_%D0%B2%D0%B0_%D0%B6%D0%B0%D0%B7%D0%BE.pdf:",
    downloadLink: "https://zakm.uz/media/books/%D0%A4.%D0%94%D0%BE%D1%81%D1%82%D0%BE%D0%B5%D0%B2%D1%81%D0%BA%D0%B8%D0%B9_%D0%96%D0%B8%D0%BD%D0%BE%D1%8F%D1%82_%D0%B2%D0%B0_%D0%B6%D0%B0%D0%B7%D0%BE.pdf"
  },
  "Muqaddima": {
    localPath: "https://cyberleninka.ru/article/n/ibn-xaldunning-muqaddima-asarida-jamiyat-taraqqiyotiga-ta-sir-qiluvchi-omillar-talqini/pdf",
    googleDrive: "https://cyberleninka.ru/article/n/ibn-xaldunning-muqaddima-asarida-jamiyat-taraqqiyotiga-ta-sir-qiluvchi-omillar-talqini/pdf",
    downloadLink:"https://cyberleninka.ru/article/n/ibn-xaldunning-muqaddima-asarida-jamiyat-taraqqiyotiga-ta-sir-qiluvchi-omillar-talqini/pdf"
  }

};

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
const Utils = {
  sanitizeInput(input) {
    return input.trim().replace(/[<>]/g, '');
  },
  
  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },
  
  extractGoogleDriveId(url) {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  },
  
  showLoading() {
    document.getElementById('loadingSpinner').style.display = 'flex';
  },
  
  hideLoading() {
    document.getElementById('loadingSpinner').style.display = 'none';
  },
  
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================
const Notification = {
  show(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.setAttribute('role', 'alert');
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'fadeOut 0.5s ease';
      setTimeout(() => notification.remove(), 500);
    }, CONFIG.NOTIFICATION_DURATION);
  },
  
  success(message) {
    this.show(message, 'success');
  },
  
  error(message) {
    this.show(message, 'error');
  }
};

// ==========================================
// SMALL ALERT / VALIDATION MODAL
// Reusable tiny modal to show validation messages (falls back to alert())
// ==========================================
function openSmallModal(htmlContent) {
  const small = document.getElementById('smallModal');
  const textEl = document.getElementById('smallModalText');
  if (!small || !textEl) {
    // Fallback to native alert when markup not available
    if (typeof htmlContent === 'string') {
      // strip tags for alert
      const tmp = document.createElement('div');
      tmp.innerHTML = htmlContent;
      alert(tmp.textContent || tmp.innerText || htmlContent);
    } else {
      alert(String(htmlContent));
    }
    return;
  }

  textEl.innerHTML = htmlContent;
  small.style.display = 'flex';
  // small fade-in via class for transition
  setTimeout(() => small.classList.add('visible'), 10);
  small.setAttribute('aria-hidden', 'false');
}

function closeSmallModal() {
  const small = document.getElementById('smallModal');
  if (!small) return;
  small.classList.remove('visible');
  small.setAttribute('aria-hidden', 'true');
  // wait for transition then hide
  setTimeout(() => { if (small) small.style.display = 'none'; }, 250);
}

function showMissingFieldsModal(fields) {
  if (!Array.isArray(fields)) fields = [String(fields)];
  const list = fields.map(f => `<li>${f}</li>`).join('');
  const content = `<strong>Iltimos quyidagi maydonlarni to'ldiring:</strong><ul style="text-align:left;margin:8px 0 0 18px">${list}</ul>`;
  openSmallModal(content);
}

// ==========================================
// FORM HANDLING
// ==========================================
function showRegisterForm() {
  // Hide login box and welcome header, show register box
  const header = document.getElementById('loginHeader');
  if (header) header.style.display = 'none';
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("registerBox").style.display = "block";
  document.getElementById("registerMsg").textContent = "";
  document.getElementById("regUsername").focus();
}

function showLoginForm() {
  // Show login box and restore welcome header
  const header = document.getElementById('loginHeader');
  if (header) header.style.display = '';
  document.getElementById("registerBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
  document.getElementById("loginMsg").textContent = "";
  document.getElementById("loginUsername").focus();
}

// ==========================================
// REGISTRATION
// ==========================================
function handleRegister(event) {
  event.preventDefault();
  
  const username = Utils.sanitizeInput(document.getElementById("regUsername").value);
  const email = Utils.sanitizeInput(document.getElementById("regEmail").value);
  const password = document.getElementById("regPassword").value;
  const confirmPassword = document.getElementById("regConfirmPassword").value;
  const msg = document.getElementById("registerMsg");

  // Validation
  // Check for missing fields and show modal listing them
  const missing = [];
  if (!username) missing.push("Foydalanuvchi nomi");
  if (!email) missing.push("Email");
  if (!password) missing.push("Parol");
  if (!confirmPassword) missing.push("Parolni tasdiqlash");
  if (missing.length) {
    showMissingFieldsModal(missing);
    msg.className = "error-msg";
    msg.textContent = ""; // keep inline message area empty when modal is used
    return;
  }

  if (username.length < CONFIG.MIN_USERNAME_LENGTH) {
    msg.className = "error-msg";
    msg.textContent = `❌ Foydalanuvchi nomi kamida ${CONFIG.MIN_USERNAME_LENGTH} ta belgidan iborat bo'lishi kerak!`;
    return;
  }

  if (!Utils.validateEmail(email)) {
    msg.className = "error-msg";
    msg.textContent = "❌ Email noto'g'ri formatda!";
    return;
  }

  if (password.length < CONFIG.MIN_PASSWORD_LENGTH) {
    msg.className = "error-msg";
    msg.textContent = `❌ Parol kamida ${CONFIG.MIN_PASSWORD_LENGTH} ta belgidan iborat bo'lishi kerak!`;
    return;
  }

  if (password !== confirmPassword) {
    msg.className = "error-msg";
    msg.textContent = "❌ Parollar mos kelmayapti!";
    return;
  }

  // Check if username already exists
  if (ADMIN_USERS[username] || REGISTERED_USERS[username]) {
    msg.className = "error-msg";
    msg.textContent = "❌ Bu foydalanuvchi nomi band!";
    return;
  }

  // Register user
  REGISTERED_USERS[username] = {
    password: password,
    email: email,
    role: "user",
    registeredAt: new Date().toISOString()
  };

  msg.className = "success-msg";
  msg.textContent = "✅ Muvaffaqiyatli ro'yxatdan o'tdingiz! Endi kirish mumkin.";
  
  // Clear form
  document.getElementById("registerForm").reset();

  // Switch to login after delay
  setTimeout(() => {
    showLoginForm();
    Notification.success("Endi tizimga kiring!");
  }, CONFIG.AUTO_LOGIN_REDIRECT_DELAY);
}

// ==========================================
// LOGIN
// ==========================================
function handleLogin(event) {
  event.preventDefault();
  
  const user = Utils.sanitizeInput(document.getElementById("loginUsername").value);
  const pass = document.getElementById("loginPassword").value;
  const msg = document.getElementById("loginMsg");

  if (!user || !pass) {
    const missing = [];
    if (!user) missing.push('Foydalanuvchi nomi');
    if (!pass) missing.push('Parol');
    showMissingFieldsModal(missing);
    msg.className = "error-msg";
    msg.textContent = "";
    return;
  }

  // Check admin users
  if (ADMIN_USERS[user] && ADMIN_USERS[user].password === pass) {
    CURRENT_USER = { username: user, role: "admin" };
    startSession();
    return;
  }

  // Check registered users
  if (REGISTERED_USERS[user] && REGISTERED_USERS[user].password === pass) {
    CURRENT_USER = { username: user, role: "user" };
    startSession();
    return;
  }

  // Login failed
  msg.className = "error-msg";
  msg.textContent = "❌ Login yoki parol xato!";
  
  // Shake animation
  const box = document.getElementById("loginBox");
  box.style.animation = "none";
  setTimeout(() => box.style.animation = "fadeInUp 0.8s ease", 10);
}

function startSession() {
  Utils.showLoading();
  
  setTimeout(() => {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("mainPage").style.display = "block";
    
    // Update user info
    document.getElementById("currentUser").textContent = CURRENT_USER.username;
    
    if (CURRENT_USER.role === "admin") {
      document.getElementById("adminBadge").style.display = "inline-block";
    }
    
    // Load content
    loadBooks();
    loadPhotos();
    loadVideos();
    
    Utils.hideLoading();
    Notification.success(`Xush kelibsiz, ${CURRENT_USER.username}! 👋`);
  }, 500);
}

// ==========================================
// LOGOUT
// ==========================================
function handleLogout() {
  if (confirm("Tizimdan chiqishni xohlaysizmi?")) {
    CURRENT_USER = null;
    document.getElementById("mainPage").style.display = "none";
    document.getElementById("loginPage").style.display = "flex";
    document.getElementById("loginForm").reset();
    document.getElementById("adminBadge").style.display = "none";
    Notification.success("Tizimdan chiqdingiz");
  }
}

// ==========================================
// SECTION NAVIGATION
// ==========================================
function showSection(section, element) {
  // Hide all sections
  document.getElementById("bookList").style.display = "none";
  document.getElementById("photoList").style.display = "none";
  document.getElementById("videoList").style.display = "none";
  
  // Remove active class from all nav links
  document.querySelectorAll('.nav-link').forEach(a => a.classList.remove('active'));
  if (element) element.classList.add('active');

  // Show selected section
  const sections = {
    books: { element: "bookList", title: "📖 Kitoblar" },
    photos: { element: "photoList", title: "🖼️ Suratlar" },
    videos: { element: "videoList", title: "🎬 Videolar darslar" }
  };
  
  if (sections[section]) {
    document.getElementById(sections[section].element).style.display = "grid";
    document.getElementById("sectionTitle").innerHTML = sections[section].title;
  }
}

// ==========================================
// LOAD BOOKS
// ==========================================
function loadBooks() {
  const books = [
    { 
      title: "O'tkan Kunlar", 
      author: "Abdulla Qodiriy", 
      description: "O'zbek adabiyotining eng yirik asarlaridan biri",
      cover: "https://library.tdau.uz/storage/books/face/images/6_66c70a07742c9_1724320263.jpg"
    },
    { 
      title: "Mehrobdan Chayon", 
      author: "Abdulla Qodiriy", 
      description: "Tarixiy roman, milliy qahramon haqida",
      cover: "https://backend.book.uz/user-api/img/img-3b1392f69733f8f151f233e92b5a20cc.jpg"
    },
    { 
      title: "Kecha va Kunduz", 
      author: "Cho'lpon", 
      description: "Lirik she'rlar to'plami",
      cover: "https://hilolnashr.uz/image/cache/catalog/001-Kitoblar/003_boshqalar/002_badiy/2024/va-kunduz-482x750.jpg"
    },
    { 
      title: "Sarob", 
      author: "Abdulla Qahhor", 
      description: "Ijtimoiy roman, hayot haqiqatlari",
      cover: "https://backend.book.uz/user-api/img/img-file-11d8219d74f4160b23a3205c02d77932.jpg"
    },
    { 
      title: "Tushda kechgan umrlar", 
      author: "O'tkir Hoshimov", 
      description: "Zamonaviy ijtimoiy roman",
      cover:"https://hilolnashr.uz/image/cache/catalog/001-Kitoblar/003_boshqalar/002_badiy/2024/tushda-kechgan-umrlar-web-550x550h.jpg"
    },
    { 
      title: "Bahor Qaytmaydi", 
      author: "Pirimqul Qodirov", 
      description: "Tarixiy roman, qadimgi davr",
      cover: "https://tovar.uz/images/company/444/tovar/98172/o_645077a7414b0.jpg"
    },
    { 
      title: "Yulduzli Tunlar", 
      author: "Pirimqul Qodirov", 
      description: "Ijtimoiy-tarixiy roman",
      cover: "https://api.mutolaa.com/media/books/2024/02/yulduzli_tunlar_H2f0X0d.jpg"
    },
    { 
      title: "Ikki Eshik Orasi", 
      author: "O'tkir Hoshimov", 
      description: "Zamonaviy ijtimoiy roman",
      cover: "https://hilolnashr.uz/image/cache/catalog/001-Kitoblar/003_boshqalar/002_badiy/2024/Ikki-eshik-orasi-web-500x750.jpg"
    },
    { 
      title: "Dunyoning Ishlari", 
      author: "O'tkir Hoshimov", 
      description: "Hayotiy voqealar haqida",
      cover: "https://hilolnashr.uz/image/cache/catalog/001-Kitoblar/003_boshqalar/002_badiy/2024/dunyoning-ishlari-web-500x750.jpg"
    },
    { 
      title: "Ufq", 
      author: "Said Ahmad", 
      description: "She'rlar to'plami",
      cover: "https://backend.book.uz/user-api/img/img-file-1e36369680232e19d200afe89b7aa90b.jpg"
    },
    { 
      title: "Kichkina Shahzoda", 
      author: "Antuan de Sent-Ekzyuperi", 
      description: "Bolalar uchun ertak",
      cover: "https://backend.book.uz/user-api/img/img-048f1735de2faef58d995e91e4d25c41.jpg"
    },
    { 
      title: "Qutlug' Qon", 
      author: "Oybek", 
      description: "Amir Temur davri haqida",
      cover: "https://api.mutolaa.com/media/books/2024/05/Oybek._Qutlug%CA%BB_qon_roman.jpg"
    },
    { 
      title: "Odam bolish qiyin", 
      author: "O'lmas Umarbekov", 
      description: "Tarixiy roman",
      cover: "https://upload.wikimedia.org/wikipedia/uz/4/46/Odam-bolish-qiyin-.jpg"
    },
    { 
      title: "Yorug' tog'larga ketamiz ", 
      author: "Shukur Xolmirzayev", 
      description: "Lirik asarlar",
      cover: "https://images.uzum.uz/csm6l2dpq3go3q2ia3g0/original.jpg"
    },
    { 
      title: "Alkimyogar", 
      author: "Paulo Koelyo", 
      description: "Dunyo mashhur asari",
      cover: "https://api.mutolaa.com/media/books/2024/02/IMG_20240201_135352_148.png"
    },
    { 
      title: "Jinoyat va Jazo", 
      author: "Fyodor Dostoyevskiy", 
      description: "Psixologik roman",
      cover: "https://api.mutolaa.com/media/books/2024/03/Fyodor_Dostoyevskiy._Jinoyat_va_jazo.jpg"
    },
    { 
      title: "Muqaddima", 
      author: "Ibn Xaldun", 
      description: "Ijtimoiy-falsafiy asar",
      cover: "https://api.mutolaa.com/media/books/2025/05/MUQADDIMA_1-1.jpg"
    },
    { 
      title: "Yashamoq", 
      author: "Yuy Xua", 
      description: "Hayot va o'lim haqida falsafiy asar",
      cover: "https://backend.book.uz/user-api/img/img-file-5dae11c36d59db78aaef346583800928.jpg"
    },
    { 
      title: "Umid uchquni", 
      author: "Exrik Maria Remark", 
      description: "Ikkinchi jahon urushi orasidagi hayot",
      cover: "https://assets.asaxiy.uz/product/items/desktop/474a3baf3ad8a7fc9d0b5a52c9b81e0820250501151143905339lxN5MlumF.jpg.webp"
    },
    { 
      title: "Shaytanat", 
      author: "Toxir Malik", 
      description: "Siyosiy-sotsial roman",
      cover: "https://api.mutolaa.com/media/books/2024/08/Tohir_Malik._Shaytanat._5-kitob_qissa.jpg"
    }
  ];
  
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = "";
  
  const fragment = document.createDocumentFragment();
  
  books.forEach((book, i) => {
    const div = document.createElement("div");
    div.className = "book";
    div.style.animationDelay = `${i * 0.05}s`;
    div.setAttribute('role', 'listitem');
    
    const coverImg = new Image();
    coverImg.src = book.cover;
    coverImg.alt = book.title;
    coverImg.loading = 'lazy';
    coverImg.onerror = function() {
      this.src = `https://via.placeholder.com/300x400/667eea/ffffff?text=${encodeURIComponent(book.title)}`;
    };
    
    const bookInfo = document.createElement('div');
    bookInfo.className = 'book-info';
    bookInfo.innerHTML = `
      <h3>${book.title}</h3>
      <p><b>Muallif:</b> ${book.author}</p>
      <p>${book.description}</p>
    `;
    
    const actions = document.createElement('div');
    actions.className = 'actions';
    actions.innerHTML = `
      <button onclick="openBook('${book.title.replace(/'/g, "\\'")}')">📖 O'qish</button>
      <a class="download" href="#" onclick="downloadBook('${book.title.replace(/'/g, "\\'")}'); return false;">⬇ Yuklab olish</a>
    `;
    
    div.appendChild(coverImg);
    div.appendChild(bookInfo);
    div.appendChild(actions);
    fragment.appendChild(div);
  });
  
  bookList.appendChild(fragment);
}

// ==========================================
// BOOK OPERATIONS
// ==========================================
function openBook(title) {
  const bookData = BOOKS_DATABASE[title];
  
  if (!bookData) {
    Notification.error("❌ Kitob topilmadi! Ma'lumotlar bazasiga qo'shing.");
    return;
  }
  
  // Google Drive Preview URL yaratish
  const pdfUrl = `https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(bookData.localPath)}`;
  
  document.getElementById("bookFrame").src = pdfUrl;
  document.getElementById("modal").style.display = "flex";
  Notification.success("📖 Kitob ochilmoqda...");
}

function downloadBook(title) {
  const bookData = BOOKS_DATABASE[title];
  
  if (!bookData) {
    Notification.error("❌ Kitob topilmadi!");
    return;
  }
  
  let downloadUrl = bookData.downloadLink;
  
  if (bookData.localPath && !bookData.localPath.includes("YOUR_FILE_ID")) {
    downloadUrl = bookData.localPath;
  }
  
  if (!downloadUrl || downloadUrl.includes("YOUR_FILE_ID")) {
    Notification.error("⚠️ Yuklab olish havolasi hali sozlanmagan!");
    return;
  }
  
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = `${title}.pdf`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  Notification.success(`✅ "${title}" yuklab olinmoqda...`);
}

// ==========================================
// LOAD PHOTOS
// ==========================================
function loadPhotos() {
  const photoList = document.getElementById("photoList");
  photoList.innerHTML = "";
  
  const fragment = document.createDocumentFragment();
  
  for (let i = 1; i <= 20; i++) {
    const div = document.createElement("div");
    div.className = "photo";
    div.style.animationDelay = `${i * 0.05}s`;
    div.setAttribute('role', 'listitem');
    div.setAttribute('tabindex', '0');
    
    const img = new Image();
    img.src = `https://picsum.photos/300/220?random=${i}`;
    img.alt = `Surat ${i}`;
    img.loading = 'lazy';
    
    div.appendChild(img);
    div.onclick = function() {
      openPhoto(`https://picsum.photos/800/600?random=${i}`);
    };
    div.onkeypress = function(e) {
      if (e.key === 'Enter') {
        openPhoto(`https://picsum.photos/800/600?random=${i}`);
      }
    };
    
    fragment.appendChild(div);
  }
  
  photoList.appendChild(fragment);
}

// ==========================================
// LOAD VIDEOS
// ==========================================
function loadVideos() {
  const videoList = document.getElementById("videoList");
  videoList.innerHTML = "";
  
  const videos = [
    { id: "https://youtu.be/vRq9eQHuods?list=RDvRq9eQHuods", title: "O'zbek adabiyoti tarixi: Boburnoma" },
    { id: "", title: "Alisher Navoiy hayoti va ijodi" },
    { id: "Q4J6KqazxRg", title: "O'zbek mumtoz adabiyoti" },
    { id: "2zEcVVDC1Fk", title: "Mirzo Ulug'bek va ilm-fan" },
    { id: "WbxFl_-eUvY", title: "Ibn Sino merosi" },
    { id: "Y0uCm5VJ9co", title: "Al-Xorazmiy ilmiy kashfiyotlari" },
    { id: "qM7X2fEeuRU", title: "Beruniy va tabiiy fanlar" },
    { id: "XdG0Kb9EBCc", title: "Amir Temur davri madaniyati" },
    { id: "V_BQjMh0bUk", title: "O'zbek xalq og'zaki ijodi" },
    { id: "nBS5GwKhba8", title: "Kitob o'qish madaniyati" },
    { id: "WT0JU0N8hZk", title: "Zamonaviy o'zbek adabiyoti" },
    { id: "YL9K2DXiPDw", title: "O'zbek she'riyati durdonalari" },
    { id: "gVCx6D-gLF0", title: "O'zbek xalq dostonlari" },
    { id: "rJuxKM3EwKs", title: "Abdulla Qodiriy asarlari" },
    { id: "Q2vq6mVGTPk", title: "Cho'lpon ijodiyoti" },
    { id: "L5X8wKRshy4", title: "O'tkir Hoshimov hikoyalari" },
    { id: "KwF9mJxTxaY", title: "Said Ahmad ijodi" },
    { id: "H2f0mA5WgxY", title: "Erkin Vohidov she'riyati" },
    { id: "pB7BDff1Iys", title: "Muhammad Yusuf xotirasi" },
    { id: "vHe7MhkbWnM", title: "Abdulhamid Cho'lpon hayoti" }
  ];
  
  const fragment = document.createDocumentFragment();
  
  for (let i = 0; i < 20; i++) {
    const video = videos[i % videos.length];
    const div = document.createElement("div");
    div.className = "video";
    div.style.animationDelay = `${i * 0.05}s`;
    div.setAttribute('role', 'listitem');
    
    const img = new Image();
    img.src = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;
    img.alt = `${video.title} ${i + 1}`;
    img.loading = 'lazy';
    
    const videoInfo = document.createElement('div');
    videoInfo.className = 'video-info';
    videoInfo.innerHTML = `
      <h3>${video.title} ${i + 1}</h3>
      <p>O'quv video materiallari</p>
    `;
    
    const actions = document.createElement('div');
    actions.className = 'actions';
    actions.innerHTML = `
      <button onclick="openVideo('${video.id}')" class="watch">▶ Ko'rish</button>
    `;
    
    div.appendChild(img);
    div.appendChild(videoInfo);
    div.appendChild(actions);
    fragment.appendChild(div);
  }
  
  videoList.appendChild(fragment);
}

// ==========================================
// MODAL FUNCTIONS
// ==========================================
function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("bookFrame").src = "";
}

function openPhoto(src) {
  document.getElementById("photoModalImg").src = src;
  document.getElementById("photoModal").style.display = "flex";
}

function closePhotoModal() {
  document.getElementById("photoModal").style.display = "none";
  document.getElementById("photoModalImg").src = "";
}

function openVideo(videoId) {
  // To'g'ridan-to'g'ri YouTube sahifasiga o'tish
  window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
}

// Video modal kerak emas, chunki to'g'ridan-to'g'ri YouTube ga o'tiladi

// ==========================================
// EVENT LISTENERS
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
  // Focus first input on page load
  document.getElementById('loginUsername').focus();
  
  // Keyboard navigation for switch forms
  document.querySelectorAll('.switch-form').forEach(el => {
    el.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        this.click();
      }
    });
  });
  
  // Close modal on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
      closePhotoModal();
    }
  });
  
  // Prevent form resubmission on page refresh
  if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
  }
});

// ==========================================
// ERROR HANDLING
// ==========================================
window.addEventListener('error', function(e) {
  console.error('Global error:', e.error);
  Notification.error('❌ Xatolik yuz berdi. Sahifani yangilang.');
});

window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled promise rejection:', e.reason);
  Notification.error('❌ Xatolik yuz berdi. Qaytadan urinib ko\'ring.');
});

// ==========================================
// PERFORMANCE MONITORING (Optional)
// ==========================================
if ('performance' in window) {
  window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page load time: ${pageLoadTime}ms`);
  });
}