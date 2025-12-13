$(document).ready(function(){
    // Qidiruv maydonchasi bo'yicha hodisa (event) tinglovchisini o'rnatamiz
    $("#myInput").on("keyup", function() {
        // Inputdagi matnni olamiz va qidiruvni osonlashtirish uchun kichik harfga o'tkazamiz
        var value = $(this).val().toLowerCase();
        
        // myTable ID-siga ega tbody ichidagi barcha tr (qator) larni filtrlash
        $("#myTable tr").filter(function() {
            // Qator ichidagi barcha matnni olib, uni qidiruv matni bilan solishtiramiz
            var isVisible = $(this).text().toLowerCase().indexOf(value) > -1;
            
            // Agar mos kelmasa (false), yashiramiz. Mos kelsa (true), ko'rsatamiz.
            $(this).toggle(isVisible);
        });
    });
});