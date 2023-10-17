// in the name of god
// team : marjan
// project :  car insurance

// varriebls
const form = document.querySelector("#request-quote");

// Events:
document.addEventListener("DOMContentLoaded", afterLoad);
document.addEventListener("submit", submitForm);


// Function aterload and add displayYears function
function afterLoad() {
  displayYears();
}



// ----------------------------------------------
/* the desired detailes about
 the base price of car insurance and
 the ceoffinient of the three
 desired cars. 
*/
const groups = {
  // default
  price: 0,
  base: 2000000,
//   makes
    make1: 1.15,
    make2: 1.3,
    make3: 1.8,
    // 30% basic
    basic: 1.3,
    // 50% complete 
    complete: 1.5,

};
// ----------------------------------------------



// -------------------------------------------
// this function for readvalue
// get make, year , level 
// and return them
function readValue() {
    const make = document.querySelector("#make").value;
    const year = document.querySelector("#year").value;
    const level = document.querySelector('input[name="level"]:checked').value;
    return {make, year, level };
}
// -------------------------------------------


// -------------------------------------------
// submit form
// this function checks if any of inputs is empty , and displayes the following text with the displayMsg function
// prevent page loading
function submitForm(e) {
   e.preventDefault();

   const { make, year, level } = readValue();


   if (make === "" || year === "" || level === "") {
    displayMsg('لطفاً مقادیر فرم را با دقت پر نمایید. با تشکر')
} else {
    // STEP1: get info
    let insuranceCase = {
        make: make,
        year: year,
        level: level
    }

    // STEP2: calculate
    calculatePrice(insuranceCase)
}
}

// -------------------------------------------

// -------------------------------------------
// this function intended for calculating base price and three ceofficients
// it takes the base and ceofficients
// and multiply them together
function calculateMake(make,base) {
    switch (make) {
        case "1":
            return groups.base * groups.make1;
        case "2" :
            return groups.base * groups.make2;
        case "3" : 
            return groups.base * groups.make3;
        default:
            return base;
    }
}
// -------------------------------------------

// -------------------------------------------
// -------------------------------------------

// -------------------------------------------
// this function is for two stages, basic and compelete
// it takes the basic % and complete %
// and calculate the base price with their percentage
function calculateLevel(level , price) {
    if (level == "basic") {
        price = price * groups.basic
    }else {
        price = price * groups.complete
    }
    return price;
}
// -------------------------------------------


// -------------------------------------------
// User Interface (UI) Functions
// Display message box
function displayMsg(msg) {
    // create message box
    const messageBox = document.createElement("div");
    messageBox.classList = "error";
    messageBox.innerText = msg;
  
    // show message
    form.insertBefore(messageBox, document.querySelector(".form-group"));
  
    // remove message box
    setTimeout(() => {
      document.querySelector(".error").remove();
    }, 5000);
  }
// -------------------------------------------



// ------------------------------------------- 
// this function converts arabic and persian string numbers into numbers
// it takes persian and arabic numbers as regex , and defines a condition for them
// it checkes too see if there is a string or not
// and returns in a string
    fixNumbers = function (str = "") {
        // Convert to number
        let persianNumbers = [
            /۰/g,
            /۱/g,
            /۲/g,
            /۳/g,
            /۴/g,
            /۵/g,
            /۶/g,
            /۷/g,
            /۸/g,
            /۹/g,
          ],
          arabicNumbers = [
            /٠/g,
            /١/g,
            /٢/g,
            /٣/g,
            /٤/g,
            /٥/g,
            /٦/g,
            /٧/g,
            /٨/g,
            /٩/g,
          ];
        if (typeof str === "string") {
          for (var i = 0; i < 10; i++) {
            str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
          }
        }
        return parseInt(str); 
}

// -------------------------------------------


// -------------------------------------------
// this function shows the year 1382 to 1402 in shamsi
// it wants to count the minYear , so subtracts 20 from maxYear
// show 'انتخاب' , 'سال'
// this function creates new tag
// and gives it value and text
// and append option to selectyear
function displayYears() {
    // access to the select tag
    const selectYear = document.querySelector("#year");
    // create option tag
    const optionTag = document.createElement("option");
    optionTag.innerText = `- انتخاب -`;
    // append option to the selectYear
    selectYear.appendChild(optionTag);
    // create for loop for making option tag
    const diffrenceYear = 20;
    for (let i = maxYear(); i >= diffrence(diffrenceYear); i--) {
      // create option tag
      const optionTag = document.createElement("option");
      optionTag.value = i;
      optionTag.innerText = `سال ${i}`;
      // append option to the selectYear
      selectYear.appendChild(optionTag);
    }
  }
// -------------------------------------------


// -------------------------------------------
// this function subtracts the maximum year from the current year to get the new year
// and return year 
function diffrence(year) {
    year = maxYear() - year;
    return year; 
}
// -------------------------------------------


// -------------------------------------------
// this function is to obtian the current year in persian
// it takes new date and turns into too persian with method
// and returns the maxYear
function maxYear() {
    // get max year
    const now = new Date().toLocaleDateString("fa-IR");
    let nowYear = now.slice(0, 4);
    let max = fixNumbers(nowYear);
    return max;
}
// -------------------------------------------


// -------------------------------------------
// the determines the price of car insurance according to the specified year
function priceReductionbyYear(year, price) {
    // 3% cheaper for each year
     price - ((diffrence(year) * 3) / 100) * price;
     return price;
}
 // -------------------------------------------


  // -------------------------------------------
//   this function is about calculating the price of cars.
  // this function takes the intial price , car model , car year, and the diffrence
//   and consoleLog price
  function calculatePrice(info) {
    let price = calculateMake(info.make, groups.base);
    
    const year = info.year;
    price = priceReductionbyYear(year, price)

    const level = info.level;
    price = calculateLevel(level, price)

    console.log(price);
  }
  // -------------------------------------------









