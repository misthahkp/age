var intervalId;

function calculateAge() {

  
  
    var dobInput = document.getElementById('dob');
    var dob = new Date(dobInput.value);
    var now = new Date();
    
  if (dob > now) {
    document.getElementById("err").textContent = "Please select a valid date of birth.";
    return;
  }
    
    var ageInMilliseconds = now - dob;
    var ageDate = new Date(ageInMilliseconds);
    
    var years = ageDate.getUTCFullYear() - 1970;
    var months = ageDate.getUTCMonth();
    var days = ageDate.getUTCDate() - 1;
    var hours = ageDate.getUTCHours();
    var minutes = ageDate.getUTCMinutes();
    var seconds = ageDate.getUTCSeconds();
    
    // Calculate the additional years based on the number of months
    var totalMonths = years * 12 + months;
    var remainingDays = days;
    
    for (var i = 0; i < totalMonths; i++) {
      var currentMonth = (months + i) % 12; // 0-based month index
      var daysInMonth = getDaysInMonth(currentMonth, totalMonths);
      
      if (remainingDays >= daysInMonth) {
        remainingDays -= daysInMonth;
      } else {
        months = (months + i) % 12;
        break;
      }
    }
    
    years = Math.floor(totalMonths / 12);
    days = remainingDays;
    
    document.getElementById('years').textContent = years + " years";
    document.getElementById('months').textContent = months + " months";
    document.getElementById('days').textContent = days + " days";
    document.getElementById('hours').textContent = hours + " hours";
    document.getElementById('mins').textContent = minutes + " minutes";
    
    var secElement = document.getElementById('sec');
    secElement.textContent = seconds + " seconds";
    
    // Update the seconds and minutes every second
      intervalId=     setInterval(function() {

      seconds++;
      if (seconds > 59) {
        seconds = 1;
        minutes++;
        document.getElementById('mins').textContent = minutes + " minutes";
      }
      if (minutes > 60) {
        minutes = 1;
        hours++;
        document.getElementById('hours').textContent = hours + " hours";
      }
      if (hours >= 24) {
        hours = 1;
        days++;
        
        var currentMonth = months;
        var daysInMonth = getDaysInMonth(currentMonth, totalMonths);
        
        if (days > daysInMonth) {
          days = 1;
          months++;
        }
        
        document.getElementById('days').textContent = days + " days";
      }
      
      if (months >= 12) {
        months = 1;
        years++;
        document.getElementById('years').textContent = years + " years";
      }
      
      secElement.textContent = seconds + " seconds";
    }, 1000);

  }
  
  // Function to get the number of days in a month
  function getDaysInMonth(month, year) {
    switch (month) {
      case 1: // February
        return isLeapYear(year) ? 29 : 28;
      case 3: // April
      case 5: // June
      case 8: // September
      case 10: // November
        return 30;
      default:
        return 31;
    }
  }
  
  // Function to check if a year is a leap year
  function isLeapYear(year) {
    return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));

  }
  
  var inputField=document.querySelector("#dob");
  inputField.addEventListener("click", function() {
    document.getElementById('years').textContent = "";
    document.getElementById('months').textContent =  " ";
    document.getElementById('days').textContent =" ";
    document.getElementById('hours').textContent =  " ";
    document.getElementById('mins').textContent =  " ";
    
    var secElement = document.getElementById('sec');
    secElement.textContent =  " ";
    clearInterval(intervalId); // Stop the interval
    document.getElementById("err").textContent = "";
    
    inputField.value = ""; // Clear the input field

  });


  inputField.addEventListener("keypress",function(event){
    if(event.keyCode===13){
      calculateAge();
      this.blur(); // Manually blur the input field
   
    }
  })

  var calc=document.getElementById("buttonclick")
  calc.addEventListener("click",calculateAge);