export const registerAPI = (Email, Password) => {
    var email = Email;
    var pass = Password;

    var InsertAPI = "http://192.168.201.1:8080/users/api/update.php"
    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    var data = {
        email: email,
        password: pass
    };

    fetch(InsertAPI,
        {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data)
        }
    ).then((response) => response.json())
        .then((response) => {
            if(response == "Updated")
            alert("Change password success");
            if (response == "Not Updated") {
                alert("Email Wrong")
            }
        })
        .catch((error) => {
                alert("Error: " + error)
        })
}

export const BASE_URL = "http://192.168.201.1:8080/users/api/";
