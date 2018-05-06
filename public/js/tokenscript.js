(function () {


$('#tokenSubmit').click(function () {
  var token = $('#bottoken').val();
  setAccessToken(token);
});


$(".reset").click(function() {
  $(".chats").empty();
  initializeTestCasePayload();
});

$('.save').click(function () {
  setTestCaseName();
    saveTestCase();
});
$('.run').click(function () {
    readTestCase("Test");
});

})();
