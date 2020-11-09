$(document).ready(function () {
    $('.header').height($(window).height());

    function encrypt(passw, openKey, n) {
        let message = passw.split("");
        let encryptedMessage = [];

        for (let char of message) {
            encryptedMessage.push((BigInt(char.charCodeAt(0)) ** BigInt(openKey)) % BigInt(n));
        }
        console.log(message, encryptedMessage);
        return encryptedMessage.join("O")
    }

    function getCookie(name) {
        var cookieValue = null;

        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === name + '=') {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }

        return cookieValue;
    }

    function setCookie(cookieName, value) {
        document.cookie = `${cookieName} = ${value}; max-age=99999`;
    }

    const $loginForm = $('#loginForm'),
        $userCreateForm = $('#userCreateForm');

    $userCreateForm.submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: $(this).attr('data-url'),
            type: 'post',
            data: $(this).serialize(),
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            },
            success: function () {
                alert('Done!');
            }
        });
    });

    $loginForm.submit(function (e) {
        e.preventDefault();
        let data = {};
        if (getCookie('sid') === "undefined" || !getCookie('sid')) {
            let encryptedPass = encrypt($(this).find('input[name="password"]').val(), getCookie('open_key'), getCookie('n'));
            $(this).find('input[name="password"]').val(encryptedPass);
            data = $(this).serialize();
        } else {
            const sid = getCookie('sid');
            data = {'sid': sid};
        }
        $.ajax({
            type: 'post',
            url: $(this).attr('data-url'),
            data: data,
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            },
            success: function (data) {
                setCookie('sid', data['sid']);
                window.location.href = data['redirect_url'];
            },
            error: function (data) {
                alert(data.responseJSON['message']);
            }
        });
    });

});
