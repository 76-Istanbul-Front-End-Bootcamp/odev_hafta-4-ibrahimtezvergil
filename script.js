const data = {
    USD: {EUR: 0.82, GBP: 0.74, TR: 7.57},
    EUR: {USD: 1.23, GBP: 0.91, TR: 9.24},
    GBP: {USD: 1.35, EUR: 1.10, TR: 10.26},
    TR: { USD: 0.13, EUR: 0.11, GBP: 0.096 },

};

const currencyKeys = Object.keys(data);
let error=null;
function createCurrencyElements(elements, root, inputName){
    for(let i =0; i< elements.length; i++){
        const currencyKeyDiv   = document.createElement("div");
        const currencyKeyInput = document.createElement("input");
        currencyKeyInput.setAttribute("type", "radio");
        currencyKeyInput.setAttribute("name", inputName);
        currencyKeyInput.setAttribute("id", inputName + elements[i]);
        currencyKeyInput.setAttribute("value", elements[i]);

        const currencyKeyLabel = document.createElement("label");
        currencyKeyLabel.setAttribute("for", inputName + elements[i]);
        currencyKeyLabel.textContent = elements[i];

        currencyKeyDiv.appendChild(currencyKeyInput);
        currencyKeyDiv.appendChild(currencyKeyLabel);
        root.appendChild(currencyKeyDiv);
    }
}

//from
const parentEl = document.querySelector("#currency-box-from");
const fromInputName = "currency_from";
createCurrencyElements(currencyKeys, parentEl, fromInputName);

// to
const parentToEl = document.querySelector("#currency-box-to");
const toInputName = "currency_to";
createCurrencyElements(currencyKeys, parentToEl, toInputName);


const calculateButton = document.querySelector("#calculate-button");
calculateButton.addEventListener("click", function(){

    // kimden ceviriyourz
    let fromTarget = document.querySelector("input[name='currency_from']:checked");
    // kime ceviriyoruz
    let toTarget   = document.querySelector("input[name='currency_to']:checked");
    // amountu alalim
    const amount     = document.querySelector("input[name='amount']").value;
    if (fromTarget){
        fromTarget=fromTarget.value;
    }
    else{
        error="Çevirmek İstediğiniz Birimi Giriniz";
    }
    if (toTarget){
        toTarget=toTarget.value;
    }
    else{
        error="Hangi Birime Çevirmek İstediginizi Giriniz";
    }
    if (fromTarget==toTarget){
        error =" Birimler Boş Bırakılmamalı ve Farklı Seçimler Yapmalısınız";
    }
     if (!amount){
        error="Kat Sayı Giriniz"
    }

    const currencyResult = document.querySelector("#currency-result");

   if (!error){

       const currentCurrencyObject = data[fromTarget];
       const resultForOne = currentCurrencyObject[toTarget];
       const result = amount * resultForOne;

       currencyResult.innerHTML = amount + " " + fromTarget + " = " + result + " " + toTarget;

   }
   else{
       currencyResult.innerHTML=error;
       error=null;

   }


});