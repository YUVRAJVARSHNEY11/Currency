// const BASE_URL ="https://v6.exchangerate-api.com/v6/af96fff7bb7ad7bc1332e128/latest/USD.json";


const dropdowns =document.querySelectorAll(" .dropdown select") ;
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");  

for (let select of dropdowns){
    for(CurrCode in countryList) {  // list access here 
       let newoption = document.createElement("option")  ; // option element create
       newoption.innerText =CurrCode;
       newoption.value=CurrCode;

     if (select.name === "from" &&  CurrCode === "USD") {
        newoption.selected="selected";
     } else if (select.name === "to" &&  CurrCode === "INR") {
        newoption.selected="selected"; }  // bydefault usd to inr set

       select.append(newoption); // select ke under add kr rhe hai options ko
}
       select.addEventListener("change",  (evt)  => {                                  //select change ho then 
         updateflag(evt.target);            //evt.target {means kaha pe change aaya} 
       }
      );
}
// const updateExchangeRate = async ( ) =>{
//    let amount = document.querySelector(".amount input");
//       let amtVal = amount.value;
//       if (amtVal === "" || amtVal < 1) {
//         amtVal = 1;
//         amount.value = "1";
//       }

//       const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
//       let response = await fetch(URL);

//     let data = await response.json(); // data jisme echange rate 
//     let rate = data[toCurr.value.toLowerCase()]; // exchange rate 
//     let finalAmount = amtVal * rate;
//     msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`; // 1usd=89 inr
//   }
const updateExchangeRate = async () => {
  try {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value || 1;
    amount.value = amtVal;

    const URL = `https://v6.exchangerate-api.com/v6/af96fff7bb7ad7bc1332e128/pair/${fromCurr.value}/${toCurr.value}`;
    let response = await fetch(URL);

    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

    let data = await response.json();
    let rate = data.conversion_rate; // Correct property name for rate
    let finalAmount = amtVal * rate;
    
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
  } catch (error) {
    msg.innerText = "Error fetching exchange rate. Please try again later.";
    console.error("Fetch error:", error);
  }
};

const updateflag = (element) => {  // from,to select kraa
 let CurrCode =element.value;  // currcode backend mai inr to usd eg.
 let countryCode = countryList[CurrCode];  //IN EU
 let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
 let img = element.parentElement.querySelector("img"); // TO CHANGE FLAG IMAGE 
 img.src = newSrc;

};



btn.addEventListener("click", async(evt) => {
   evt.preventDefault(); //click krne pe jo ho rha tha btn use by default prevent kia 
   updateExchangeRate();
      
 });


 window.addEventListener("load", () => {
   updateExchangeRate();
 });
  
