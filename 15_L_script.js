let allData = [];
let filteredData = [];
const itemsPerPage = 10;
let currentPage = 1;

$(document).ready(function () {
    $("#loading").show();
    
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/posts",
        type: "GET",
        success: function (data) {
            allData = data;
            filteredData = data;
            displayTable();
            updateStats();
            $("#loading").hide();
            $("#mainTable").show();
        },
        error: function (err) {
            $("#loading").hide();
            $("#error").html("<div class='error'>❌ Xato: Ma'lumotlarni yuklab bo'lmadi. Iltimos qayta urinib ko'ring.</div>");
        }
    });
    
    $("#myInput").on("keyup", function () {
        filterTable();
    });
});

function filterTable() {
    const input = $("#myInput").val().toLowerCase();
    filteredData = allData.filter(item => {
        return item.userId.toString().includes(input) ||
               item.id.toString().includes(input) ||
               item.title.toLowerCase().includes(input) ||
               item.body.toLowerCase().includes(input);
    });
    currentPage = 1;
    displayTable();
    updateStats();
}

function displayTable() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);
    
    let tr = "";
    pageData.forEach(function (v) {
        tr += `<tr>
            <td>${v.userId}</td>
            <td>${v.id}</td>
            <td><strong>${v.title}</strong></td>
            <td>${v.body.substring(0, 100)}...</td>
        </tr>`;
    });
    
    $("#myTable").html(tr);
    updatePagination();
}

function updatePagination() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    let paginationHTML = "";
    
    if (totalPages > 1) {
        for (let i = 1; i <= totalPages; i++) {
            const activeClass = i === currentPage ? "active" : "";
            paginationHTML += `<button class="${activeClass}" onclick="goToPage(${i})">${i}</button>`;
        }
    }
    
    $("#pagination").html(paginationHTML);
}

function goToPage(page) {
    currentPage = page;
    displayTable();
}

function updateStats() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    $("#stats").html(`📊 Jami: ${filteredData.length} ta natija | Sahifa: ${currentPage}/${totalPages}`);
}