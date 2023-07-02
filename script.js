$(function () {
  // Variables
  var start = 6; // Start time (6 AM) Pick between 0 - 11
  var end = 23; // End time (11 PM) Pick between 12 - 23

  // Display the current day in the header
  var currentDay = dayjs().format("dddd, MMMM D");
  $("#currentDay").text(currentDay);

  // Get the current hour in 24-hour format
  var currentHour = dayjs().hour();

  // Loop through each time block
  for (var hour = start; hour <= end; hour++) {
    var timeBlock = $('<div class="row time-block">');
    var hourCol = $('<div class="col-2 col-md-1 hour text-center py-3">').text(
      dayjs().hour(hour).format("ha"),
    );
    var descriptionCol = $(
      '<textarea class="col-8 col-md-10 description" rows="3">',
    );
    var saveBtn = $(
      '<button class="btn saveBtn col-2 col-md-1" aria-label="save">',
    ).append('<i class="fas fa-save" aria-hidden="true"></i>');

    timeBlock.attr("id", "hour-" + hour);
    timeBlock.append(hourCol, descriptionCol, saveBtn);
    $(".container-lg").append(timeBlock);

    updateBlockStatus(timeBlock, hour, currentHour);

    // Load any saved events from local storage
    var savedEvent = localStorage.getItem("event-" + hour);
    if (savedEvent !== null) {
      descriptionCol.val(savedEvent);
    }
  }

  // Save button click event
  $(".saveBtn").on("click", function () {
    var blockHour = parseInt($(this).parent().attr("id").split("-")[1]);
    var eventText = $(this).siblings(".description").val();

    // Save the event in local storage
    localStorage.setItem("event-" + blockHour, eventText);
  });

  // Function to update the status of a time block (past, present, or future)
  function updateBlockStatus(timeBlock, hour, currentHour) {
    if (hour < currentHour) {
      timeBlock.addClass("past").removeClass("present future");
    } else if (hour === currentHour) {
      timeBlock.addClass("present").removeClass("past future");
    } else {
      timeBlock.addClass("future").removeClass("past present");
    }
  }
});
