document.addEventListener('DOMContentLoaded', function () {
    //Get districts by city
    //Author: Nguyen Manh Hung, Le Quang Dung
    $("#CityID").change(function () {
        var CityID = $(this).val();
        $("#DistrictID").html('<option>Đang tải...</option>');
        $.getJSON(urlGetDistricts, { CityID: CityID }, function (data) {
            var options = '<option value>-- Chọn Quận/Huyện --</option>';
            $.each(data, function (i, d) {
                options += `<option value="${d.DistrictID}">${d.DistrictName}</option>`;
            });
            $("#DistrictID").html(options);
            $("#WardID").html('<option value>-- Chọn Phường/Xã --</option>');
        });
    });

    //Get wards by districts
    //Author: Nguyen Manh Hung, Le Quang Dung
    $("#DistrictID").change(function () {
    var DistrictID = $(this).val();
    $("#WardID").html('<option>Đang tải...</option>');
    $.getJSON(urlGetWards, { DistrictID: DistrictID }, function (data) {
    var options = '<option value>-- Chọn Phường/Xã --</option>';
    $.each(data, function (i, w) {
    options += `<option value="${w.WardID}">${w.WardName}</option>`;
    });
    $("#WardID").html(options);
    $("#AddressID").html('<option value>-- Chọn Đường/Phố --</option>');
    });
    });

    //Get addresses by wards
    //Author: Nguyen Manh Hung, Le Quang Dung
    $("#WardID").change(function () {
    var WardID = $(this).val();
    $("#AddressID").html('<option>Đang tải...</option>');
    $.getJSON(urlGetAddresses, { WardID: WardID }, function (data) {
    var options = '<option value>-- Chọn Đường/Phố --</option>';
    $.each(data, function (i, a) {
    options += `<option value="${a.AddressID}">${a.Street}</option>`;
    });
    $("#AddressID").html(options);
    });
    });

    //Tạo upload từng ảnh
    //Author: Le Quang Dung
    document.getElementById('addImgItem').addEventListener('click', function () {
    const imgList = document.getElementById('imgList');

    //Tạo khung để chứa input file, preview ảnh đó và nút xóa
    const imgItem = document.createElement('div');
    imgItem.className = 'd-flex align-items-center';

    //Tạo thẻ input
    const img = document.createElement('input');
    img.type = 'file';
    img.name = 'Images';
    img.accept = 'image/*';
    img.className = 'form-control';

    //Tạo thẻ preview
    const preview = document.createElement('img');
    preview.style.maxWidth = '100px';
    preview.style.maxWidth = '100px';
    preview.style.objectFit = 'cover';
    preview.style.display = 'none';
    preview.style.cursor = 'pointer';

    //Tạo nút xóa
    const x = document.createElement('button');
    x.type = 'button';
    x.textContent = 'x';
    x.className = 'btn btn-danger';
    x.addEventListener('click', function () {
    imgItem.remove();
    });

    //Gán ảnh vừa input vào thẻ preview
    img.addEventListener('change', function (a) {
        const file = a.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                preview.src = event.target.result;
                preview.style.display = 'block';
            };
        reader.readAsDataURL(file);
        }
        else {
            preview.style.display = 'none';
        }
    });

    //Click vào để xem rõ ảnh
    preview.addEventListener('click', function () {
        const preImg = document.getElementById('previewImg');
        preImg.src = preview.src;
        const modal = new bootstrap.Modal(document.getElementById('imgPreviewItem'));
        modal.show();
        });

        //Thêm các thẻ con vào cha của chúng
        imgItem.appendChild(img);
        imgItem.appendChild(preview);
        imgItem.appendChild(x);
        imgList.appendChild(imgItem);
    });

    // Chọn gói
    const packageCards = document.querySelectorAll('.package-card');
    packageCards.forEach(card => {
        card.addEventListener('click', () => {
        packageCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        document.querySelector('[name="PackageID"]').value = card.dataset.package;
        });
    });

    // Chọn thời gian
    const durationBtns = document.querySelectorAll('.duration-btn');
    durationBtns.forEach(btn => {
        btn.addEventListener('click', () => {
        if (btn.classList.contains('disabled')) return;
        durationBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelector('[name="DurationDays"]').value = btn.dataset.duration;
        });
    });
});



  
        