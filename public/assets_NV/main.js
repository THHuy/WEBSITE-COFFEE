const btnSignout = document.querySelector('.signout-btn')
  btnSignout.addEventListener("click", () => {
    Swal.fire({
      title: "Đăng Xuất",
      text: "Bạn đặt có xác nhận Đăng Xuất",
      icon: "question",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Xác nhận",
      showCancelButton: true,
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
            window.location.href = "/logout"
      }
    });
  });