function domElement(element) {
  return document.querySelector(element);
}
// validation
function validation(case_use) {
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
  let allUser = JSON.parse(localStorage.getItem("allUser"));
  let valueTaiKhoan = domElement("#TaiKhoan").value.trim();

  validateRequired(
    "#TaiKhoan",
    ".TaiKhoan",
    "(*) Tài khoản không được để trống!"
  );
  if (case_use == "add") {
    for (let item of allUser) {
      if (item.taiKhoan === valueTaiKhoan) {
        domElement(".TaiKhoan").innerHTML = "Tài khoản đã tồn tại!";
        isValid &= false;
        break;
      }
    }
  }
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

  if (domElement("#MoTa").value.length > 60) {
    domElement(".Mo_ta").innerHTML = "Mô tả không vượt quá 60 ký tự!";
    isValid &= false;
  }
  return isValid;
}
let getAllUser = () => {
  axios({
    method: "GET",
    url: "https://625bc0d050128c57020706e0.mockapi.io/api/ajax-buoi-25-26",
  })
    .then((result) => {
      localStorage.setItem("allUser", JSON.stringify(result.data));
      let html = result.data
        .map((item, index) => {
          return `<tr>
        <td>${index + 1}</td>
        <td>${item.taiKhoan}</td>
        <td>${item.matKhau}</td>
        <td>${item.hoTen}</td>
        <td>${item.email}</td>
        <td>${item.ngonNgu}</td>
        <td>${item.tenLoai}</td>
        <td>
          <button class="btn btn-danger" onclick ="deleteUser(${
            item.id
          })">Delete</button>
          <button class="btn btn-success" onclick="updateUser(${
            item.id
          })" data-toggle="modal" data-target="#myModal">Edit</button>
        </td>
      </tr>`;
        })
        .join("");
      domElement("#tblDanhSachNguoiDung").innerHTML = html;
    })
    .catch((err) => console.log(err));
};
getAllUser();

const deleteUser = (id) => {
  axios({
    method: "DELETE",
    url: `https://625bc0d050128c57020706e0.mockapi.io/api/ajax-buoi-25-26/${id}`,
  })
    .then(() => getAllUser())
    .catch((err) => console.log(err));
};
const addUser = () => {
  const taiKhoan = domElement("#TaiKhoan").value;
  const matKhau = domElement("#MatKhau").value;
  const hoTen = domElement("#HoTen").value;
  const email = domElement("#Email").value;
  const ngonNgu = domElement("#loaiNgonNgu").value;
  const tenLoai = domElement("#loaiNguoiDung").value;
  const hinhAnh = domElement("#HinhAnh").value;
  const moTa = domElement("#MoTa").value;
  const user = {
    taiKhoan: taiKhoan,
    matKhau: matKhau,
    hoTen: hoTen,
    email: email,
    ngonNgu: ngonNgu,
    tenLoai: tenLoai,
    hinhAnh: hinhAnh,
    moTa: moTa,
  };
  domElement("#add_info").reset();
  return user;
};
let id_user_update = "";
const updateUser = (id) => {
  let users = JSON.parse(localStorage.getItem("allUser"));
  domElement("#btn_submit").style.display = "none";
  domElement("#btn_edit").style.display = "block";
  for (let i of users) {
    if (i.id == id) {
      domElement("#TaiKhoan").value = i.taiKhoan;
      domElement("#MatKhau").value = i.matKhau;
      domElement("#HoTen").value = i.hoTen;
      domElement("#Email").value = i.email;
      domElement("#loaiNgonNgu").value = i.ngonNgu;
      domElement("#loaiNguoiDung").value = i.tenLoai;
      domElement("#HinhAnh").value = i.hinhAnh;
      domElement("#MoTa").value = i.moTa;
      break;
    }
  }
  domElement("#TaiKhoan").disabled = true;
  id_user_update = id;
};

// handle btn edit
domElement("#btn_edit").onclick = (e) => {
  e.preventDefault();
  let isValid = validation("edit");
  if (isValid) {
    const user = addUser();
    axios({
      method: "PUT",
      url: `https://625bc0d050128c57020706e0.mockapi.io/api/ajax-buoi-25-26/${id_user_update}`,
      data: user,
    })
      .then(() => getAllUser())
      .catch((err) => console.log(err));
    domElement(".close").click();
  }
  domElement("#add_info").reset();
};
// handle btn theem
domElement("#btn_submit").onclick = (e) => {
  e.preventDefault();
  let isValid = validation("add");
  if (isValid) {
    const user = addUser();
    axios({
      method: "POST",
      url: "https://625bc0d050128c57020706e0.mockapi.io/api/ajax-buoi-25-26",
      data: user,
    })
      .then(() => getAllUser())
      .catch((err) => console.log(err));
    domElement(".close").click();
  }
};

domElement("#btnThemNguoiDung").onclick = () => {
  domElement("#btn_submit").style.display = "block";
  domElement("#btn_edit").style.display = "none";
  domElement("#TaiKhoan").disabled = false;
};
