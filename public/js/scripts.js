jQuery(document).ready(function () {

    $(".messages").animate({ scrollTop: $(document).height() }, "fast");

    // $.ajax({
    //     url : "/startChat/118809975300669",
    //     type : "GET",
    //     success : function(d){
    //     }
    // });

    function newMessage() {
        message = $(".message-input input").val();
        if ($.trim(message) == '') {
            return false;
        }
        $.ajax({
            url : "/sendMessage",
            type : "POST",
            data : {"message" : message},
            dataType: "json",
            success : function(d){
                $('<li class="sent"><img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
                $('.message-input input').val(null);
                $('.contact.active .preview').html('<span>You: </span>' + message);
                $(".messages").animate({ scrollTop: $(document).height() }, "fast");
            }
        });
    };

    $('.submit').click(function () {
        newMessage();
    });

    $(window).on('keydown', function (e) {
        if (e.which == 13) {
            newMessage();
            return false;
        }
    });

    addUserMessageToUI = function(message){
        $('<li class="sent"><img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
        $('.message-input input').val(null);
        $('.contact.active .preview').html('<span>You: </span>' + message);
        $(".messages").animate({ scrollTop: $(document).height() }, "fast");
    };
    addBotMessageToUI = function(message){
        $('<li class="replies"><img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
        $('.message-input input').val(null);
        $('.contact.active .preview').html('<span>You: </span>' + message);
        $(".messages").animate({ scrollTop: $(document).height() }, "fast");
    };
});