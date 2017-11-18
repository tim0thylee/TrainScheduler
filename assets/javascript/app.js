var config = {
  apiKey: "AIzaSyCDBVDbkcLWVVfMFbW3QLEEDJCC3V8rcg0",
  authDomain: "trainscheduler-d859e.firebaseapp.com",
  databaseURL: "https://trainscheduler-d859e.firebaseio.com",
  projectId: "trainscheduler-d859e",
  storageBucket: "",
  messagingSenderId: "302746264218"
};

firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = 0;

$("#addTrain").on("click", function(event) {
  // Grabs user input
  trainName = $('#nameInput').val().trim();
  destination = $('#destinationInput').val().trim();
  firstTrainTime = $('#firstTrainInput').val().trim();
  frequency = $('#frequencyInput').val().trim();
  // Creates local "temporary" object for holding employee data
  var newTrain = {
   name: trainName,
   place: destination,
   time: firstTrainTime,
   freq: frequency
 };
  // Uploads train data to the database
  database.ref().push(newTrain);
  // Logs everything to console
  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);
  // Clears all of the text-boxes
  $("#nameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainInput").val("");
  $("#frequencyInput").val("");

  event.preventDefault();
});

// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());
  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().place;
  var firstTrainTime = childSnapshot.val().time;
  var frequency = childSnapshot.val().freq;
  // traininfo Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);
  
  var firstTrainMoment = moment(firstTrainTime, 'HH:mm').subtract(1, "years");
  var currentTime = moment(); 


  var minutesSinceFirstArrival = moment().diff(firstTrainMoment, 'minutes');
  var remainder = minutesSinceFirstArrival % frequency;
  var minutesAway = frequency - remainder;

  var nextArrival = moment().add(minutesAway, 'minutes');  
  var formatNextArrival = nextArrival.format("HH:mm");
  // Add each train's data into the table
  $("#trains > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" + formatNextArrival + "</td><td>" + minutesAway + "</td></tr>");
});



