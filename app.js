// // show year 
// const year = document.getElementById("year");


// let date = 1403
// function getYear (){
//   for (let i = 0; i <= 20; i++) {
//     date -= 1
//     year.insertAdjacentHTML('beforeend' , `<option>${date}</option`)
    
//   }
// }
// getYear();

let currentYear = new Date().toLocaleDateString('fa-IR');

let persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
fixNumbers = function (str) {
  if (typeof str === 'string') {
    for (var i = 0; i < 10; i++) {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
  }
  return parseInt(str);
};



currentYear = currentYear.slice(0.4);

 let maxYear = fixNumbers(currentYear);
 console.log(maxYear);

 let minYear = maxYear - 20;
 console.log(minYear);


console.log(currentYear);

// ravesh ason brro yad bgir

const selectYear = document.querySelector(".year");

for (let i = maxYear; i>= minYear; i--) {
  const optionTag = document.createElement("option")
  optionTag.value = i;
  optionTag.innerText= ` سال ${i}`

  selectYear.appendChild(optionTag);
  
}