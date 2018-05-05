(function () {

    var testCasePayload, client;
    function initializeTestCasePayload(){
        testCasePayload = {
            testCaseName : "",
            chats : {}
        }
    }
    function setTestCaseName(testCaseName){
        testCasePayload.testCaseName = testCaseName;
    }
    function setAccessToken(token){
        client = new ApiAi.ApiAiClient({accessToken: token});
    }
    function saveTestCase(){
        $.ajax({
            url : "/saveTestCase",
            data : testCasePayload,
            type : "POST",
            dataType : "json",
            success : function(response){
                debugger;
            },
            error : function(response){

            }
        });
    }
    function readTestCase(testCaseName){
        testCasePayload.testCaseName = testCaseName;
        $.ajax({
            url : "/readTestCase",
            data : testCasePayload,
            type : "GET",
            dataType : "json",
            success : function(response){
                if(repsonse){
                    testCasePayload.chats = response;
                    reRunTestCase();
                }
            },
            error : function(response){

            }
        });
    }
    initializeTestCasePayload();
    setAccessToken("aaa1e59cf7ec4f5dbf5182e0cc754a59");
    $(".messages").animate({ scrollTop: $(document).height() }, "fast");

    function newMessage() {
        message = $(".message-input input").val();
        if ($.trim(message) == '') {
            return false;
        }
        addUserMessageToUI(message);
        sendUserMessage(message);
    };
    function sendUserMessage(message){
        client.textRequest(message).then(function(response){
            var result;
            try {
                result = response.result.fulfillment.speech
            } catch(error) {
                result = "";
            }
            addBotMessageToUI(result);
        }).catch(function(){

        });
    }
    $('.submit').click(function () {
        newMessage();
    });
    $('.save').click(function () {
        saveTestCase();
    });
    $('.run').click(function () {
        readTestCase("Test");
    });

    $(window).on('keydown', function (e) {
        if (e.which == 13) {
            newMessage();
            return false;
        }
    });

    function addUserMessageToUI(message){
        testCasePayload.chats[new Date().getTime()+"_USER"] = message;
        $('<li class="sent"><img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
        $('.message-input input').val(null);
        $('.contact.active .preview').html('<span>You: </span>' + message);
        $(".messages").animate({ scrollTop: $(document).height() }, "fast");
    };
    function addBotMessageToUI(message){
        testCasePayload.chats[new Date().getTime()+"_BOT"] = message;
        $('<li class="replies"><img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
        $('.message-input input').val(null);
        $('.contact.active .preview').html('<span>You: </span>' + message);
        $(".messages").animate({ scrollTop: $(document).height() }, "fast");
    };
})();