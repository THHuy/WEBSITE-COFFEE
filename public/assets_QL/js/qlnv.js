const modal = document.getElementById("myModal");
function openModal() {
  modal.style.display = "flex";
}
function closeModal() {
  modal.style.display = "none";
}
// Hàm để thêm dấu phẩy vào số
function formatNumber(number) {
  return number
    .toString()
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// Lắng nghe sự kiện khi người dùng nhập số vào input
const inputElement = document.getElementById("salary"); // Thay 'inputNumber' bằng id của input trong HTML
inputElement.addEventListener("input", function (event) {
  let userInput = event.target.value;

  // Loại bỏ các dấu phẩy có thể đã được thêm trước đó
  userInput = userInput.replace(/,/g, "").replace(/\./g, "").replace(/\D/g, "");
  // Kiểm tra xem người dùng đã nhập một số hợp lệ hay không
  if (!isNaN(userInput) && userInput !== "") {
    // Nếu người dùng nhập một số hợp lệ, thêm dấu phẩy và cập nhật giá trị của input
    const numberWithCommas = formatNumber(userInput);
    inputElement.value = numberWithCommas;
  }
});
const idetElement = document.getElementById("editSalary"); // Thay 'inputNumber' bằng id của input trong HTML
idetElement.addEventListener("input", function (event) {
  let userInput = event.target.value;

  // Loại bỏ các dấu phẩy có thể đã được thêm trước đó
  userInput = userInput.replace(/,/g, "").replace(/\./g, "").replace(/\D/g, "");
  // Kiểm tra xem người dùng đã nhập một số hợp lệ hay không
  if (!isNaN(userInput) && userInput !== "") {
    // Nếu người dùng nhập một số hợp lệ, thêm dấu phẩy và cập nhật giá trị của input
    const numberWithCommas = formatNumber(userInput);
    idetElement.value = numberWithCommas;
  }
});
//Form xác nhận thêm nhanvien
var btnAdd = document.querySelector(".btn-add");
btnAdd.addEventListener("click", () => {
  const formAddNV = document.getElementById("addEmployeeForm");
  Swal.fire({
    title: "Thêm Nhân Viên",
    text: "Bạn đặt có xác nhận Thêm Nhân Viên",
    icon: "question",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Xác nhận",
    showCancelButton: true,
    cancelButtonColor: "#d33",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Thành công",
        text: "Bạn đã Thêm Nhân Viên thành công",
        icon: "success",
        timer: 1500,
      }).then((result) => {
        formAddNV.action = "/quanli/themNV";
        formAddNV.submit();
      });
    }
  });
});

//sửa đổi nhân viên

const editModal = document.getElementById("editModal");
function openEditModal(
  employeeId,
  employeeName,
  employeeSex,
  phoneNumber,
  position,
  salary
) {
  document.getElementById("editEmployeeId").value = employeeId;
  document.getElementById("editEmployeeName").value = employeeName;
  document.getElementById("employeeSex").value = employeeSex;
  document.getElementById("editPhoneNumber").value = phoneNumber;
  document.getElementById("editPosition").value = position;
  document.getElementById("editSalary").value = salary;

  editModal.style.display = "flex";
}

function closeEditModal() {
  editModal.style.display = "none";
}
document.addEventListener("DOMContentLoaded", function () {
  const editButtons = document.querySelectorAll(".edit-button");
  editButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const row = this.closest("tr");
      const employeeId = row.cells[0].innerText;
      const employeeName = row.cells[1].innerText;
      const employeeSex = row.cells[2].innerText;
      const phoneNumber = row.cells[3].innerText;
      const position = row.cells[4].innerText;
      const salary = row.cells[5].innerText;
      openEditModal(
        employeeId,
        employeeName,
        employeeSex,
        phoneNumber,
        position,
        salary
      );
    });
  });
});

//Gửi truy vấn xác nhận sửa nhân viên

var btnEdit = document.querySelector("#updateNv");
btnEdit.addEventListener("click", () => {
  const formEditNv = document.getElementById("editEmployeeForm");
  Swal.fire({
    title: "Sửa Nhân Viên",
    text: "Bạn đặt có xác nhận Sửa Nhân Viên",
    icon: "question",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Xác nhận",
    showCancelButton: true,
    cancelButtonColor: "#d33",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Thành công",
        text: "Bạn đã Sửa Nhân Viên thành công",
        icon: "success",
        timer: 1000,
      }).then((result) => {
        const idNv = document.getElementById("editEmployeeId").value;
        formEditNv.action = `/quanli/editNv?manv=${idNv}&_method=PUT`;
        formEditNv.submit();
      });
    }
  });
});

//Truy vấn xóa
var btnDeleted = document.querySelectorAll(".delete-button");
btnDeleted.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const manv = btn.getAttribute('data-manv');
    const formDeletedNv = document.getElementById("delete-form");
    Swal.fire({
      title: "Xóa Nhân Viên",
      text: "Bạn đặt có xác nhận Xóa Nhân Viên",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Xác nhận",
      showCancelButton: true,
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Thành công",
          text: "Bạn đã Xóa Nhân Viên thành công",
          icon: "success",
          timer: 1000,
        }).then((result) => {
          formDeletedNv.action = `/quanli/deletedNv?manv=${manv}&_method=PATCH`;
          formDeletedNv.submit();
        });
      }
    });
  });
});
