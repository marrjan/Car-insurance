
const form = document.querySelector('#request-quote')



document.addEventListener('DOMContentLoaded', afterLoad)
document.addEventListener('submit', submitForm)


// Functions
function afterLoad() {
    displayYears()
}
// submit form
function submitForm(e) {
    e.preventDefault();

    // read value from the form
    const make = document.querySelector('#make').value
    const year = document.querySelector('#year').value
    const level = document.querySelector('input[name="level"]:checked').value

    // check the value of fileds are correct
    if (make === "" || year === "" || level === "") {
        displayMsg('لطفاً مقادیر فرم را با دقت پر نمایید. با تشکر')
    } else {
        // STEP1: get info
        let insuranceCase = {
            CarMake: make,
            Caryear: year,
            Carlevel: level
        }

        // STEP2: calculate
        calculatePrice(insuranceCase)

        // STEP3: show result message box
    }
}

function calculatePrice(info) {
    let price = 0, base = 2000000

    // + Calculate Make 
    /* 
    make:1      =>      1.15
    make:2      =>      1.30
    make:3      =>      1.80
    */
    const make = info.make
    switch (make) {
        case "1":
            price = base * 1.15
            break;
        case "2":
            price = base * 1.30
            break;
        case "3":
            price = base * 1.80
            break;

            
    }

    
    const
        year = info.year,
        // diffrence = getYearDiffrence(year)
        diffrence = function (year) {
            // Convert to number
            let
                persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
                arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
                fixNumbers = function (str) {
                    if (typeof str === 'string') {
                        for (var i = 0; i < 10; i++) {
                            str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
                        }
                    }
                    return parseInt(str);
                };

            // get max year
            const now = new Date().toLocaleDateString('fa-IR')
            let nowYear = now.slice(0, 4)
            let max = fixNumbers(nowYear)
            year = max - year

            return year
        }
    
   
    price = price - ((diffrence * 3 ) /100) * price;

    console.log(price);
  }

  function fixNumbers(params) {
    
  }

// function displayYear(params) {
//   let
//                 persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
//                 arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
//                 fixNumbers = function (str) {
//                     if (typeof str === 'string') {
//                         for (var i = 0; i < 10; i++) {
//                             str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
//                         }
//                     }
//                     return parseInt(str);
//                 };
// }



function displayMsg(msg) {
    // create message box
    const messageBox = document.createElement('div');
    messageBox.classList = 'error'
    messageBox.innerText = msg

    
    form.insertBefore(messageBox, document.querySelector('.form-group'))

   
    setTimeout(() => {
        document.querySelector('.error').remove()
    }, 5000)
}


function displayYears() {
    
    let
        persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
        arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
        fixNumbers = function (str) {
            if (typeof str === 'string') {
                for (var i = 0; i < 10; i++) {
                    str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
                }
            }
            return parseInt(str);
        };

    
    let curentYear = new Date().toLocaleDateString('fa-IR')

    
    curentYear = curentYear.slice(0, 4)

    
    let maxYear = fixNumbers(curentYear)

    // get min year
    let minYear = maxYear - 20

    // access to the select tag
    const selectYear = document.querySelector('#year')

    const optionTag = document.createElement('option')
    optionTag.innerText = `- انتخاب -`;
    
    selectYear.appendChild(optionTag)

   
    for (let i = maxYear; i >= minYear; i--) {
      
        const optionTag = document.createElement('option')
        optionTag.value = i;
        optionTag.innerText = `سال ${i}`;

        
        selectYear.appendChild(optionTag)
    }
}