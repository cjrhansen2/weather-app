//set up the Luxon DateTime object for the current time and date
var DateTime = luxon.DateTime;
var now = DateTime.local();

//get the components of the current date, apply to the HTML object at top of page
var currentDate = now.month + '/' + now.day + '/' + now.year;
$('#currentDay').html(currentDate);

//list of working hours to block off
var workHours = [
    "9AM",
    "10AM",
    "11AM",
    "12PM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM"
];

//a list to store all of the button and description ids, same number as timeblocks
var descBtn_ids = [
    "Enter event here, click blue button to save.",
    "Enter event here, click blue button to save.",
    "Enter event here, click blue button to save.",
    "Enter event here, click blue button to save.",
    "Enter event here, click blue button to save.",
    "Enter event here, click blue button to save.",
    "Enter event here, click blue button to save.",
    "Enter event here, click blue button to save.",
    "Enter event here, click blue button to save."
];



//declare the function that loads the time blocks to the page
function addTimeBlocks() {
    //loop through the list of hour blocks and add correlating html elements
    var i;
    for (i=0; i<workHours.length; i++) {

        //gives each necessary object a unique ID using number i
        i_string = i.toString();

        i_string_row = i_string + '_row';
        i_string_timeblock = i_string + '_timeblock';
        i_string_desc = i_string + '_desc';
        //i_string_btn = i_string + '_btn';

        i_id_row = '#' + i_string_row;
        i_id_timeblock = '#' + i_string_timeblock;
        i_id_desc = '#' + i_string_desc;
        //i_id_btn = '#' + i_string_btn;

        //create html objects using jquery
        timeBlock = $('<div>', {
            'class': 'time-block',
            'id': i_string_timeblock
        });

        row = $('<div>', {
            'class': 'row',
            'id': i_string_row
        });
        
        hour = $('<div>', {
            html: workHours[i],
            'class': 'hour'
        });

        //make variables for the time-dependent classes of the description
        var descClass = 'description';
        //hour of the day relative to i as well as current hour
        var iTime = i + 9;
        var currentHour = now.hour;
        //var currentHour = 14; //for testing, forces the current hour to be 2 pm

        //use logic based on the current time to determine if color is past, present, or future
        if (iTime < currentHour) {
            descClass += ' past'
        }
        else if (iTime == currentHour) {
            descClass += ' present'
        }
        else {
            descClass += ' future'
        }

        //continue making html objects
        description = $('<textarea>', {
            'class': descClass,
            'id': i.toString() //just make the id equal to i
            ,'html': localStorage.getItem(i.toString())
        });

        saveBtn = $('<button>', {
            'class': 'saveBtn',
            'id': i.toString() //use the same id as the corresponding textarea object, that way you can connect them when they save
        });

        //use jquery to add html objects dynamically
        $('.container').append(row);
        $(i_id_row).append(timeBlock);
        $(i_id_timeblock).append(hour);
        $(i_id_row).append(description);
        $(i_id_row).append(saveBtn);
    }
}

//carry out the add time blocks function
addTimeBlocks();

//event listener for any of the save buttons that are clicked
//saves any value entered in the textarea field in the localstorage, uses the id as the index for access
$(".saveBtn").click(function() {
    var index = this.id;
    var id_index = '#' + index;
    var eventValue = $(id_index).val();
    //alert(eventValue);
    localStorage.setItem(index, eventValue);
});