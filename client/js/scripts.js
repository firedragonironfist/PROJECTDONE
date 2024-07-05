const nextButton = document.getElementById("nextButton");
const next1Button = document.getElementById("next1Button");
const next2Button = document.getElementById("next2Button");
const next3Button = document.getElementById("next3Button");
const optionSelect = document.getElementById("Jetzt");
const optionSelect2 = document.getElementById("Freigabetyp");
const input1 = document.getElementById("Beschreibung");
const input2 = document.getElementById("Stratort");
const input3 = document.getElementById("zielort");
const input4 = document.getElementById("datum");
const input5 = document.getElementById("anzahl");
const input6 = document.getElementById("quadratmeter");
const input7 = document.getElementById("umzugArt");
const input8 = document.getElementById("kostentraeger");
const input9 = document.getElementById("firstName");
const input99 = document.getElementById("lastName");
const input10 = document.getElementById("email");
const input11 = document.getElementById("message");
const step1 = document.getElementById("step1");
const step2_Entrumpelung = document.getElementById("step2_Entrumpelung");
const step3_Entrumpelung = document.getElementById("step3_Entrumpelung");
const step2_Umzug = document.getElementById("step2_Umzug");
const step3 = document.getElementById("step3");
const userInputs = [];
const data = {};

nextButton.addEventListener("click", function () {
  const selectedValue = optionSelect.value;

  data["Jetzt"] = selectedValue;

  if (step1.style.display === "block") {
    if (selectedValue === "Umzug") {
      step1.style.display = "none";
      step2_Umzug.style.display = "block";
    } else if (selectedValue === "Entrumpelung") {
      step1.style.display = "none";
      step2_Entrumpelung.style.display = "block";
    }
  }
});

next1Button.addEventListener("click", function () {
  const selectedValue2 = optionSelect2.value;

  data["Freigabetyp"] = selectedValue2;

  step2_Entrumpelung.style.display = "none";
  step3_Entrumpelung.style.display = "block";
});

next2Button.addEventListener("click", function () {
  const inputtext1 = input1.value;

  if (!inputtext1) {
    alert("Please fill the description");
  } else {
    data["Beschreibung"] = inputtext1;
    step3_Entrumpelung.style.display = "none";
    step3.style.display = "block";
  }
});

next3Button.addEventListener("click", function () {
  const Stratortvalue = input2.value;
  const zielortvalue = input3.value;
  const datumvalue = input4.value;
  const anzahlvalue = input5.value;
  const quadratmetervalue = input6.value;
  const umzugArtvalue = input7.value;
  const kostentraegervalue = input8.value;

  if (
    !Stratortvalue ||
    !zielortvalue ||
    !datumvalue ||
    !anzahlvalue ||
    !quadratmetervalue ||
    !umzugArtvalue
  ) {
    alert("Please fill out all fields");
  } else {
    data["Stratort"] = Stratortvalue;
    data["zielort"] = zielortvalue;
    data["datum"] = datumvalue;
    data["anzahl"] = anzahlvalue;
    data["quadratmeter"] = quadratmetervalue;
    data["umzugArt"] = umzugArtvalue;
    data["kostentraeger"] = kostentraegervalue;
    step2_Umzug.style.display = "none";
    step3.style.display = "block";
  }
});

document
  .getElementById("multiStepForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const firstNamevalue = input9.value;
    const lastNamevalue = input99.value;
    const emailvalue = input10.value;
    const messagevalue = input11.value;

    if (!firstNamevalue || !lastNamevalue || !emailvalue) {
      alert("Please fill out all fields");
    } else {
      data["firstName"] = firstNamevalue;
      data["lastName"] = lastNamevalue;
      data["email"] = emailvalue;
      data["message"] = messagevalue;
      userInputs.push(data);
      fetch("/form/submit", {
        method: "POST",
        body: JSON.stringify(userInputs),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Form submitted successfully");
          } else {
            alert("Error submitting form");
          }
        });
    }
  });
