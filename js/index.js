var StaffList = [];

function createStaff (){
    // 1. DOM lấy thông tin
    var staffAccount = document.getElementById("tknv").value;
    var fullName = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var startDate = document.getElementById("datepicker").value;
    var salary = + document.getElementById("luongCB").value;
    var position = document.getElementById("chucvu").value;
    var workingTime = + document.getElementById("gioLam").value;

    // 2. Check Email
    for (var i = 0; i < StaffList.length; i ++){
        if(
            StaffList[i].staffAccount === staffAccount
             || 
            StaffList[i].email === email){
           return alert("Account/Email đã tồn tại");} 
    }

    // 3. Tạo đối tượng nhân viên mới

    var staff = new Staff(
        staffAccount,
        fullName,
        email,
        password,
        startDate,
        salary,
        position,
        workingTime,
        );

    // 4. Thêm NV vào danh sách

    StaffList.push(staff);

    renderStaff();
    saveStaffList();

}

function renderStaff(){
    var html = "";
    for ( var i = 0; i < StaffList.length; i++){
        
        html += ` <tr>
                    <td>${StaffList[i].staffAccount}</td>
                    <td>${StaffList[i].fullName}</td>
                    <td>${StaffList[i].email}</td>
                    <td>${StaffList[i].startDate}</td>
                    <td>${StaffList[i].position}</td>
                    <td>${StaffList[i].calcSalary()}</td>
                    <td>123</td>
                    <td>
                    <button onclick="deleteStaff('${StaffList[i].staffAccount}')" class ="btn btn-danger" >Xóa</button>

                    <button onclick="getUpdateStaff('${StaffList[i].staffAccount}')" class ="btn btn-info">Sửa</button>
                    </td>
               `
    }
    document.getElementById("tableDanhSach").innerHTML = html;
}

function saveStaffList(){
    // chuyển StaffList thành chuỗi Json
    var StaffListJson =  JSON.stringify(StaffList);
    localStorage.setItem("SL",StaffListJson);
}

function getStaffList (){
    var StaffListJson = localStorage.getItem("SL");
    if (!StaffListJson) return [];
    return JSON.parse(StaffListJson);
}

function mapStaffList (local){
    var mapped = [];
    for (var i = 0; i<local.length; i++){
        var oldStaff = local[i];
        var newStaff = new Staff(
            oldStaff.staffAccount,
            oldStaff.fullName,
            oldStaff.email,
            oldStaff.password,
            oldStaff.startDate,
            oldStaff.salary,
            oldStaff.position,
            oldStaff.workingTime,
        );
        mapped.push(newStaff);
    }
    return mapped;
}

function deleteStaff(staffAccount){
    var index =  findByAccount(staffAccount);
    if (index === -1) return alert("Account không tồn tại");
    StaffList.splice(index,1);
    renderStaff();
    saveStaffList();
}

function findByAccount(staffAccount){
    for (var i = 0; i<StaffList.length;i++){
        if (StaffList[i].staffAccount === staffAccount) return i;
    }
    return -1;
}

function getUpdateStaff(staffAccount){
   var index = findByAccount(staffAccount);
   if (index === -1) return alert("Account không tồn tại");

    var staff = StaffList[index];

    document.getElementById("tknv").value = staff.staffAccount ;
    document.getElementById("name").value = staff.fullName;
    document.getElementById("email").value = staff.email;
    document.getElementById("password").value = staff.password;
    document.getElementById("datepicker").value = staff.startDate;
    document.getElementById("luongCB").value = staff.salary;
    document.getElementById("chucvu").value = staff.position;
    document.getElementById("gioLam").value = staff.workingTime;

    document.getElementById("tknv").disabled = true;
}

function updateStaff(){}


window.onload = function(){
    var StaffListFormLocal =  getStaffList ();
    StaffList = mapStaffList(StaffListFormLocal);
    renderStaff();
}
