(function () {


$('#tokenSubmit').click(function () {
  var token = $('#bottoken').val();
  setAccessToken(token);
});


$(".reset").click(function() {
  $(".chats").empty();
  initializeTestCasePayload();
});

$('#testCaseSubmit').click(function () {
  var testCase = $('#nameOfTestCase').val();
  setTestCaseName(testCase);
  saveTestCase();
});

$('.run').click(function () {
    readTestCase("Test");
});

})();
