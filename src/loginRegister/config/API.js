export const registerAPI = (userName, Email, Password) => {
    var username = userName;
    var email = Email;
    var pass = Password;
    // var img = Image;

    var InsertAPI = "http://192.168.201.1:8080/users/api/register.php"
    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    var data = {
        username: username,
        email: email,
        password: pass,
        // img: img
    };

    fetch(InsertAPI,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        }
    ).then((response) => response.json())
        .then((response) => {
            if(response = "Dang ky thanh cong")
            alert("Đăng ký thành công");

        })
        .catch((error) => {
            if (error = "Email has already existed!") {
                alert("Email đã tồn tại hoặc không hợp lệ! Vui lòng nhập Email khác!")
            } else (
                alert("Error: " + error))
        })
}

export const BASE_URL = "http://192.168.201.1:8080/users/api/";
export const URL = "http://192.168.201.1:8080/users/image.php";