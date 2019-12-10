function getLocStorage(key) {
    var value = localStorage.getItem(key);
    if (value) {
        $(`#text${key}`).text(value);
    }
}
// prepare HTML for JQuery
$(document).ready(function () {
    $('#currentDay').text(moment().format('dddd, MMMM Do'));
    for (var i = 9; i < 18; i++) {

        // create row
        var row = $(`<div data-time=${i} id='${i}' class='row'>`);
        // create first column for time
        var colOne = $('<div class ="col-sm-1"> <p class="hour">' + convertAMPM(i) + '<p>');
        // create the second column for event
        var colTwo = $(`<div class="col-sm-9 past"><textarea id=text${i} class="description" placeholder="New Event"></textarea>`);
        // create the third column for save button                                    font awesome save button regular
        var colThree = $(`<div class= "col-sm-2"><button class="saveButton" id=${i}><i class="far fa-save"></i><button>`);
        //   attach all columns to the row
        row.append(colOne);
        row.append(colTwo);
        row.append(colThree);
        // attach rows with columns to the container
        $(".container").append(row);

        // run function
        getLocStorage(i);
    }

    // change time from military to standard
    function convertAMPM(hours) {
        var standardTime = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return hours + standardTime;
    }
    // run time function
    convertAMPM();

    // function to change colors (past/present/future)
    function changeColor() {
        var presentTime = new Date().getHours();
        for (var i = 9; i < 18; i++) {
            console.log(presentTime, $(`#${i}`).data("time"));
            if ($(`#${i}`).data("time") == presentTime) {
                $(`#text${i}`).addClass("present");
            } else if (presentTime < $(`#${i}`).data("time")) {
                $(`#text${i}`).addClass("future");
            }
        }
    }
setInterval(function(){
    changeColor();
},1000);
// click event for save button
var saveButton = $('.saveButton');
saveButton.on('click', function(){
    var newEventId= $(this).attr('id');
    var newEventText=$(this).parent().siblings().children('.description').val();
    localStorage.setItem(newEventId,newEventText);

});
});