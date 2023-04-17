// Converts all of the HTML to javascript so that the HTML isn't cluttered from creating 24 different divs for each hour of the day
function createTimeBlock(hour) {
  var hourText = hour === 0 ? '12AM' : hour <= 11 ? hour + 'AM' : hour === 12 ? '12PM' : (hour - 12) + 'PM';
  var timeBlock = $('<div>').attr('id', 'hour-' + hour).addClass('row time-block');
  var hourDiv = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(hourText);
  var textarea = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', '3');
  var saveBtn = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save');
  var saveIcon = $('<i>').addClass('fas fa-save').attr('aria-hidden', 'true');
  saveBtn.append(saveIcon);
  timeBlock.append(hourDiv, textarea, saveBtn);
  return timeBlock;
}

// Creates a time block for each hour of the day
$(function () {
  for (var i = 0; i < 24; i++) {
    var timeBlock = createTimeBlock(i);
    $('.container-fluid').append(timeBlock);
  }
});

$(function () {
  // Event listener for save button
  $(".saveBtn").on("click", function () {
    var hour = $(this).parent().attr("id");
    var description = $(this).siblings(".description").val();
    localStorage.setItem(hour, description);
  });

  // Gives each time block a past, present, or future class
  $(".time-block").each(function () {
    var blockHour = parseInt($(this).attr("id").split("-")[1]);
    var currentHour = dayjs().hour();

    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour === currentHour) {
      $(this).removeClass("past");
      $(this).addClass("present");
    } else {
      $(this).removeClass("past");
      $(this).addClass("future");
    }
  });

  // Gets user input from local storage
  $(".time-block").each(function () {
    var hour = $(this).attr("id");
    var description = localStorage.getItem(hour);
    if (description) {
      $(this).children(".description").val(description);
    }
  });

  // Display the current date in the header of the page.
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
});
