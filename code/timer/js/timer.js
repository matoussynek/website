// Set the date we're counting down to
var countDownDate = new Date("Nov 25, 2024 20:25:00").getTime();

const earth_speed = 29.7246; // km/s
const hair_speed = 18.0; //nm/s

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  console.log(Math.round(distance/1000));

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("timer").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  document.getElementById("speed").innerHTML = "In that time the Earth travels cca " + Math.round(distance/1000 * earth_speed) + " km <br> and an average hair grows by cca " + Math.round(distance / 1000 * hair_speed) + " nm";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "Done";
    document.getElementById("speed").hidden = true;
  }
}, 1000);