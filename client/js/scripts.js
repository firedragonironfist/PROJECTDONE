const nextButton = document.getElementById("nextButton");
      const next1Button = document.getElementById("next1Button");
      const next2Button = document.getElementById("next2Button");
      const next3Button = document.getElementById("next3Button");
      const optionSelect = document.getElementById("Jetzt");
      const step1 = document.getElementById("step1");
      const step2_Entrumpelung = document.getElementById("step2_Entrumpelung");
      const step3_Entrumpelung = document.getElementById("step3_Entrumpelung");
      const step2_Umzug = document.getElementById("step2_Umzug");
      const step3 = document.getElementById("step3");

      nextButton.addEventListener("click", function () {
        const selectedValue = optionSelect.value;

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
        step2_Entrumpelung.style.display = "none";
        step3_Entrumpelung.style.display = "block";
      });

      next2Button.addEventListener("click", function () {
        step3_Entrumpelung.style.display = "none";
        step3.style.display = "block";
      });

      next3Button.addEventListener("click", function () {
        step2_Umzug.style.display = "none";
        step3.style.display = "block";
      });

      document
        .getElementById("multiStepForm")
        .addEventListener("submit", function (event) {
          event.preventDefault();
          const formData = new FormData(this);
          let isEmpty = false;
          for(let value of formData.values()) {
            if(value === "") {
              isEmpty = true;
              break;
            }
          }
          if(isEmpty) {
            alert("Please fill out all fields By reloading the page");
            return;
          }
          fetch("/form/submit", {
            method: "POST",
            body: JSON.stringify(Object.fromEntries(formData)),
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
        });