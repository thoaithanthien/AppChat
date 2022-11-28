import axios from "axios";

export const updateImg = (Image) => {
    var img = Image;

    var InsertAPI = "http://192.168.201.1:8080/users/image.php";
    var headers = {
        'Content-Type': 'multipart/form-data;',
    };

    var data = {
        img: img,
    };

    axios(InsertAPI,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        }
    ).then((response) => response.json())
        .then((response) => {
            if(response = "Updated")
            alert("Change password success");
        })
        .catch((error) => {
            if (error = "Not Updated") {
                alert("Email Wrong")
            } else (
                alert("Error: " + error))
        })
}

export const BASE_URL = "http://192.168.201.1:8080/users/api/";
