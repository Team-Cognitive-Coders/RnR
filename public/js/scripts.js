(function () {
    var payload = {

    };
    var client;
    function setAccessToken(token){
        client = new ApiAi.ApiAiClient({accessToken: token});
    }
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

    $(window).on('keydown', function (e) {
        if (e.which == 13) {
            newMessage();
            return false;
        }
    });

    function addUserMessageToUI(message){
        $('<li class="sent"><img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
        $('.message-input input').val(null);
        $('.contact.active .preview').html('<span>You: </span>' + message);
        $(".messages").animate({ scrollTop: $(document).height() }, "fast");
    };
    function addBotMessageToUI(message){
        $('<li class="replies"><img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
        $('.message-input input').val(null);
        $('.contact.active .preview').html('<span>You: </span>' + message);
        $(".messages").animate({ scrollTop: $(document).height() }, "fast");
    };
})();