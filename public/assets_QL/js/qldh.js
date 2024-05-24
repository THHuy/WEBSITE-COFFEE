//tạo bill
var btnCreateBill = document.querySelector(".payment-button");
btnCreateBill.addEventListener("click", () => {
  const formCreateBillNv = document.getElementById("createBill");
  Swal.fire({
    title: "Tạo Hóa Đơn",
    text: "Bạn đặt có xác nhận Tạo Hóa Đơn",
    icon: "warning",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "In Hóa Đơn",
    showCancelButton: true,
    cancelButtonColor: "#d33",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Thành công",
        text: "Bạn đã thanh toán thành công",
        icon: "success",
        timer: 1000,
      }).then((result) => {
        formCreateBillNv.action = `/quanli/thanhtoan`;
        formCreateBillNv.submit();
      });
    }
  });
});
//Hoàn thành đặt hàng
var btnDoneBill = document.querySelectorAll(".doneShipBill");
btnDoneBill.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const formDoneBill = document.getElementById("doneOrder");
    Swal.fire({
      title: "Hoàn Thành Hóa Đơn",
      text: "Bạn đặt có xác nhận Hoàn Thành Hóa Đơn",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Hoàn Thành",
      showCancelButton: true,
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1000,
        }).then((result) => {
          const makh = btn.getAttribute("data-id");
          formDoneBill.action = `/quanli/doneOrder?makh=${makh}&_method=PATCH`;
          formDoneBill.submit();
        });
      }
    });
  });
});

//Hoàn thành đặt bàn
var btnDoneTable = document.querySelectorAll(".doneTable");
btnDoneTable.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const formDoneTable = document.getElementById("done-table-form");
    Swal.fire({
      title: "Xóa yêu cầu đặt bàn",
      text: "Bạn đặt có xác nhận xóa đặt bàn",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Xác nhận",
      showCancelButton: true,
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Thành công",
          showConfirmButton: false,
          timer: 1000,
        }).then((result) => {
          const makh = btn.getAttribute("data-idkh");
          formDoneTable.action = `/quanli/doneBook?makh=${makh}&_method=PATCH`;
          formDoneTable.submit();
        });
      }
    });
  });
});
