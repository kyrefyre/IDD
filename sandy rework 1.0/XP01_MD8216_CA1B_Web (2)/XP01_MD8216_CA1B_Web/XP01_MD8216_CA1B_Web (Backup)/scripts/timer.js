    var countDownDate = new Date("Jan 16, 2025 13:00:00").getTime();
    var x = setInterval(function() {
        var now = new Date().getTime(); 
        var distance = countDownDate - now;



     var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
     var seconds = Math.floor((distance % (1000 * 60)) / 1000);
     // Split hours and minutes into two digits
     var hour1 = Math.floor(hours / 10);
     var hour2 = hours % 10;
     var min1 = Math.floor(minutes / 10);
     var min2 = minutes % 10;

     // Update the HTML elements
     document.getElementById("hour1").innerHTML = hour1;
     document.getElementById("hour2").innerHTML = hour2;
     document.getElementById("min1").innerHTML = min1;
     document.getElementById("min2").innerHTML = min2;

     // If the countdown is over, display "EXPIRED"
     if (distance < 0) {
         clearInterval(x);
         document.getElementById("hour1").innerHTML = "E";
         document.getElementById("hour2").innerHTML = "X";
         document.getElementById("min1").innerHTML = "P";
         document.getElementById("min2").innerHTML = "D";
        }
    }
 , 1000);