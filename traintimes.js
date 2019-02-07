var config = {
  apiKey: "AIzaSyDkFPXt4XkPr_4Vyu5PmGLepXgOXZHjUCw",
  authDomain: "train-times-homework-605c6.firebaseapp.com",
  databaseURL: "https://train-times-homework-605c6.firebaseio.com",
  projectId: "train-times-homework-605c6",
  storageBucket: "train-times-homework-605c6.appspot.com",
  messagingSenderId: "501343635743"
};
firebase.initializeApp(config);

var database = firebase.database();
  $('#userSubmitButton').on("click", function() {
    var trainName = $("#trainNameInput").val().trim()
    var destination = $("#destinationInput").val().trim();
    var firstTrainTime = moment($("#firstTrainNameInput").val().trim(), "HH:mm").format("HH:mm")
    var frequency = $("#frequencyInput").val().trim()
    var userTrain = {
        name: trainName,
        userDestination: destination,
        firstTrain: firstTrainTime,
        trainFrequency: frequency
      }
    database.ref().push(userTrain);
    console.log(userTrain.name)
    $("#trainNameInput").val("")
    $("#destinationInput").val("")
    $("#firstTrainNameInput").val("")
    $("#frequencyInput").val("")
    return false
  });
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val())
   
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().userDestination;
    var firstTrainTime = childSnapshot.val().firstTrainTime;
    var frequency = childSnapshot.val().trainFrequency;

    var timeConversion = moment(firstTrainTime, "HH:mm");
    console.log(timeConversion)

    var currentTime = moment().format("HH:mm");
    console.log(currentTime)

    var timeDifference = moment().diff(moment(timeConversion), "minutes");
    console.log(firstTrainTime)
    console.log(timeDifference)

    var timeRemaining = timeDifference % frequency;
    console.log(timeRemaining)

    var minutesUnitilTrain = frequency - timeRemaining;
    var nextTrain = moment().add(minutesUnitilTrain, "minutes").format("HH:mm");
    $("#trainTable>tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + nextTrain + "</td><td>" + frequency + "</td><td>" + minutesUnitilTrain + "</td></tr>");
  });
