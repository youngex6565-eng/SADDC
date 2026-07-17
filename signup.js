const signupForm =
document.getElementById("signupForm");

signupForm.addEventListener("submit",(e)=>{

  e.preventDefault();

  const name =
  document.getElementById("name").value;

  const email =
  document.getElementById("email").value;

  const password =
  document.getElementById("password").value;

  const users =
  JSON.parse(localStorage.getItem("users"))
  || [];

  const user = {
    name,
    email,
    password
  };

  users.push(user);

  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );

  alert("Signup Successful");

  window.location.href = "login.html";

});