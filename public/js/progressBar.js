$(document).ready(function () {
    var challengeGoals = [];
    var totalCalories = [];

    // Use the Ajax call to get all the challenges 
    $.get("/api/challenges").then(function (results) {
        var challenge = 0
        for (var index in results) {
            challenge += parseInt(results[index].goal);
        }
        challengeGoals.push(challenge)
    });

    // Use the Ajax call to get all the Workouts 
    $.ajax({
        method: "GET",
        url: "/api/workOutLogs"

    }).then(function (data) {
        console.log(data)
        console.log("mike")

        createWorkOutLogs(data)
    });


    // USe both of them to create Progress bar in the UI
    function createWorkOutLogs(dbworkoutlogs) {
        console.log("in the createWorkoutOutLogs function ", dbworkoutlogs)
        var calories = 0

        // var totalCalories = 0 
        for (i = 0; i < dbworkoutlogs.length; i++) {

            calories += parseInt(dbworkoutlogs[i].caloriesPerHour);
        };
        totalCalories.push(calories)


        console.log("challengeGoals", challengeGoals[0]);
        console.log("totalCalories", totalCalories[0]);
        // Variables 
        var goalAmount = challengeGoals[0]; // Goal amount from user data db.workOutChallenge.goal
        var calsBurned = totalCalories[0]; // Total from users workouts logged 
        var percentage = (calsBurned / goalAmount) * 100;

        // Function to create the progress bar
        function goalProgress() {


            // Generate the HTML
            var progressBar = '<h5> Total Calories Burned: ' + calsBurned + '</h5><h5>Calorie Burn Goal: ' + goalAmount + '</h5>' +
                '<div class ="progressBar" style= width:' + percentage + '%;></div>' +
                '<span id="goal_start" style="float: left; font-size: 18px; padding: 5px;">' + 0 + '</span>' +
                '<span id="goal-target" style="float: right; font-size: 18px; padding 5px;">' + goalAmount + '</span>';


            // $('.progressBar').animate({width: percentage + '%'}, 1000);
            $("#prog-bar").append(progressBar);
        };
        goalProgress();
    }
});

