function openAddModal() {
  addModal.style.display = "flex";
}
function closeAddModal() {
  addModal.style.display = "none";
}

// var btnEdit = document.querySelectorAll(".edit-button");

// btnEdit.forEach((e, i) => {
//   e.addEventListener("click", (event) => {
//     var btn = event.target;
//     var data = btn.dataset.id;
//   });
// });

const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
const editMaMonInput = document.getElementById("editMaMon");
const editTenMonInput = document.getElementById("editTenMon");
const editGiaMonInput = document.getElementById("editGiaMon");
let editingMonRow; // Biến để lưu giữ hàng đang được sửa

function openEditModal() {
  editModal.style.display = "flex";
}

function closeEditModal() {
  editModal.style.display = "none";
}

function editMon(maMon) {
  // Tìm hàng món cần sửa
  const rows = document.querySelectorAll("tbody tr");
  for (const row of rows) {
    //Duyệt ra các body tr
    const maMonCell = row.querySelector("td:first-child").textContent;
    //Kiểm tra nếu mã món = mã món nhập thì lấy hết hàng đó ra
    if (maMonCell === maMon) {
      // Lưu thông tin của món vào biến để hiển thị trong modal
      const tenMon = row.querySelector("td:nth-child(2)").textContent;
      const giaMon = row.querySelector("td:nth-child(3)").textContent;
      editMaMonInput.value = maMon;
      editTenMonInput.value = tenMon;
      editGiaMonInput.value = giaMon;

      editingMonRow = row;

      // Hiển thị modal sửa món
      openEditModal();
      break;
    }
  }
  //Hàm thêm action vào cho form
  var formUpdate = document.forms["editSP"];
  const btnUpdate = document.querySelector(".btnUpdate");
  btnUpdate.addEventListener("click", () => {
    Swal.fire({
      title: "Sửa món",
      text: "Bạn đặt có xác nhận Sửa món",
      icon: "question",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Xác nhận",
      showCancelButton: true,
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Thành công",
          text: "Bạn đã Sửa món thành công",
          icon: "success",
          timer: 1500,
        }).then((result) => {
          formUpdate.action = "/quanli/suaMenu/" + `?masp=${maMon}&_method=PUT`;
          formUpdate.submit();
        });
      }
    });
  });
}

//Hiện modal sửa món

function openDeleteModal() {
  deleteModal.style.display = "flex";
}

function closeDeleteModal() {
  deleteModal.style.display = "none";
}
//Thêm action vào cho form delete
var formDelete = document.forms["delete_form"];
var idMon;
var btnDelete = document.querySelectorAll(".delete-button");
btnDelete.forEach((e, i) => {
  e.addEventListener("click", (event) => {
    Swal.fire({
      title: "Xóa món ăn",
      text: "Bạn có chắc muốn làm điều này",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Xóa thành công",
          icon: "success",
          timer: 1000,
        }).then((result) => {
          var btn = event.target;
          idMon = btn.dataset.mamon;
          formDelete.action =
            "/quanli/deleteMenu/" + `?masp=${idMon}&_method=PATCH`;
          formDelete.submit();
        });
      }
    });
  });
});
