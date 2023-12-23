const inputs = document.querySelectorAll("input");
const billInput = document.querySelector(".input-bill");
const tipInput = document.querySelector(".tip-input");
const peopleInput = document.querySelector(".input-people");
const cards = document.querySelectorAll(".card");
const amount = document.querySelector(".amount");
const total = document.querySelector(".total");
const reset = document.querySelector(".reset");
const error = document.querySelector("form span");

let billAmount, customTip, numPeople, tipPerson, tipTotal, totalPerson;
let percent = 0;


function resetBtn(params) {
  billInput.value = "";
  tipInput.value = "";
  peopleInput.value = "";
  peopleInput.classList.remove("error");
  cards.forEach((btn) => {
    btn.classList.remove("active");
  });
  amount.textContent = "$0.00";
  total.textContent = "$0.00";
  error.classList.add("hide");
  reset.classList.remove("active");
}

billInput.addEventListener("change", () => {
  billAmount = +billInput.value;
  numPeople = +peopleInput.value;

  if (billAmount !== 0) {
    reset.classList.add("active");
  }

  if (numPeople === 0) {
    error.classList.remove("hide");
    peopleInput.classList.add("error");
  }
});

peopleInput.addEventListener("change", () => {
  numPeople = +peopleInput.value;

  if (numPeople !== 0) {
    error.classList.add("hide");
    peopleInput.classList.remove("error");
  } else if (numPeople === 0) {
    error.classList.remove("hide");
    peopleInput.classList.add("error");
  }
});

cards.forEach((tip) => {
  tip.addEventListener("pointerdown", () => {
    tip.classList.add("active");
    cards.forEach((othertip) => {
      if (othertip !== tip) {
        othertip.classList.remove("active");
      }
    });
    if (tip.id !== "custom") {
      percent = +tip.innerHTML;
    }
  });
});

inputs.forEach((input) => {
  input.addEventListener("change", () => {
    billAmount = +billInput.value;
    numPeople = +peopleInput.value;
    customTip = +tipInput.value;

    if (customTip > 100) {
      alert("percentage cannot be greater than 100!");
      resetBtn();
    }

    if (tipInput.classList.contains("active")) {
      percent = customTip;
    } 

    if (billAmount !== 0 && numPeople !== 0 && percent !== 0) {
      tipTotal = billAmount * (percent / 100);
      tipPerson = tipTotal / numPeople;
      totalPerson = (billAmount + tipTotal) / numPeople;

      console.log(totalPerson, tipPerson, percent, customTip);
      amount.textContent = `$${tipPerson.toFixed(2)} `;
      total.textContent = `$${totalPerson.toFixed(2)} `;
    }
  });
});

reset.addEventListener("click", resetBtn);
