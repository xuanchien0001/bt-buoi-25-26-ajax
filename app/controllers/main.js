function domElement(element) {
  return document.querySelector(element);
}

// validation
function validation() {
  let isValid = true;
  const validateRequired = (element, elementError, messageError) => {
    if (domElement(element).value.trim().length < 1) {
      isValid &= false;
      domElement(elementError).innerHTML = messageError;
    } else {
      domElement(elementError).innerHTML = "";
    }
  };
  const validateRgex = (regex, element, elementError, messageError) => {
    if (regex.test(domElement(element).value)) {
      domElement(elementError).innerHTML = "";
    } else {
      domElement(elementError).innerHTML = messageError;
      isValid &= false;
    }
  };
  // validation tai khoan
  validateRequired(
    "#TaiKhoan",
    ".TaiKhoan",
    "(*) Tài khoản không được để trống!"
  );
  // validation họ tên
  validateRequired("#HoTen", ".HoTen", "(*) Họ tên không được để trống");
  validateRgex(
    /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/,
    "#HoTen",
    ".HoTen",
    "Họ tên không chứa số và ký tự đặc biệt!"
  );
  // validata password
  validateRequired("#MatKhau", ".MatKhau", "Mật khẩu không được để trống!");
  validateRgex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,8}$/,
    "#MatKhau",
    ".MatKhau",
    "Mật khẩu có 6-8 ký tự, có 1 ký tự viết hoa, 1 số, 1 ký tự đặc biệt!"
  );
  // validate email
  validateRequired("#Email", ".Email", "Email không được để trống!");
  validateRgex(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    "#Email",
    ".Email",
    "Email không hợp lệ!"
  );
  // validate hình ảnh
  validateRequired("#HinhAnh", ".HinhAnh", "Hình ảnh không được để trống!");
  //validate người dùng
  validateRequired(
    "#loaiNguoiDung",
    ".loaiNguoiDung",
    "Trường này không được để trống!"
  );
  // validate Ngôn ngữ
  validateRequired(
    "#loaiNgonNgu",
    ".loaiNgonNgu",
    "Ngôn ngữ không được để trống!"
  );
  // validate Mô tả
  validateRequired("#MoTa", ".Mo_ta", "Mô tả không được để trống!");

  if (domElement("#MoTa").value.length > 6) {
    domElement(".Mo_ta").innerHTML = "Mô tả không vượt quá 60 ký tự!";
    isValid &= false;
  }
  return isValid;
}
domElement("#btn_submit").onclick = () => {
  let isValid = validation();
  console.log(isValid);
};
