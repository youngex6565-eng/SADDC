const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {

  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const savedUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (savedUser) {
    alert("Login Successful");
    window.location.href = "index.html";
  } else {
    alert("Invalid Email or Password");
  }

});