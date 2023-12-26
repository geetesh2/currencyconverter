const base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const dropdowns = document.querySelectorAll(".dropdown select");
const submit = document.querySelector("#submit");
const msg = document.querySelector(".msg");
for(let select of dropdowns){
    for(currCode in countryList )
    {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption); 
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        if(select.name === "to" && currCode === "INR")
        {
            newOption.selected = "selected";
        }

    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

submit.addEventListener("click",async (evt) =>{
    evt.preventDefault();
    let amount = document.querySelector("#amount").value;
    // console.log(amount);
    if(amount === "" || amount < 1) {
        amount = 1;
        document.querySelector("#amount").value = "1";
    }
    const fromCurr = document.querySelector(".from select");
    const toCurr = document.querySelector(".to select");

    console.log(fromCurr.value,toCurr.value);
    const URL = `${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`; 
    let response = await fetch(URL);
    console.log(response);
    let result = await response.json();
    console.log(result);
    let rate = result[toCurr.value.toLowerCase()];
    console.log(rate);
    let finalamt = rate * amount;
    console.log(finalamt);
    msg.innerText = `${amount} ${fromCurr.value} = ${finalamt} ${toCurr.value}`;
});
