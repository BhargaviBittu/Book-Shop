var base64 = require("base-64");

const AuthenticationService = {
  httpGetRequest: (username, password, url) => {
    var credentials = base64.encode(username + ":" + password);
    var basicAuth = "Basic " + credentials;
    let headers = new Headers();
    headers.append("Authorization", basicAuth);
    headers.append("Content-Type", "application/json");

    return fetch("http://localhost:8080/" + url, {
      method: "GET",
      mode: "cors",
      crossDomain: true,
      headers: headers,
    });
  },

  httpPostRequest: (username, password, url, data) => {
    var credentials = base64.encode(username + ":" + password);
    var basicAuth = "Basic " + credentials;
    let headers = new Headers();
    headers.append("Authorization", basicAuth);
    headers.append("Content-Type", "application/json");

    return fetch("http://localhost:8080/" + url, {
      mode: "cors",
      method: "POST",
      crossDomain: true,
      headers: headers,
      body: JSON.stringify(data),
    });
  },


  getLocalStorageValues: () => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    const loggedIn = localStorage.getItem("loggedIn");
    return username, password, loggedIn;
  },

  isAuthenticated: (navigate) => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    const role = localStorage.getItem("role");
    console.log(isLoggedIn);
    if (isLoggedIn) {
      navigate("/BookList");
    } else {
        navigate("/Login");
    }
  },

  getUserRole: () => localStorage.getItem("role")
};

export default AuthenticationService;
