const input1 = document.getElementById("fname");
const input2 = document.getElementById("lname");
const input3 = document.getElementById("email");
const input4 = document.getElementById("tel");
const input5 = document.getElementById("message");

const userInputs = [];
const data = {};

document
  .getElementById("contactus")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const firstNamevalue = input1.value;
    const lastNamevalue = input2.value;
    const emailvalue = input3.value;
    const telvalue = input4.value;
    const messagevalue = input5.value;

    if (!firstNamevalue || !lastNamevalue || !emailvalue) {
      alert("Please fill out all fields");
    } else {
      data["firstName"] = firstNamevalue;
      data["lastName"] = lastNamevalue;
      data["email"] = emailvalue;
      data["tel"] = telvalue;
      data["message"] = messagevalue;
      userInputs.push(data);
      fetch("/submit", {
        method: "POST",
        body: JSON.stringify(userInputs),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((data) => {
          alert("Form submitted successfully");
        });
    }
  });