// Write Javascript code!
$(document).ready(function () {
    //alert('JS working')
    // process the form
    getloc()

    $('#getContact').submit(function (event) {
        // get the form data
        // there are many ways to get this data using jQuery (you can use the class or id also)
        var temp = '+91' + $('input[id=phone]').val()
        var formData = {
            'pincode': $('input[id=pinCode]').val(),
            'phone': temp,
        };
        console.log(formData)
        //process the form
        $.ajax({
            type: "POST",
            url: "https://coronadailyupdates.org/api/users",
            data: formData,
            contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
            encode: false,
            success: function (msg) {
                $('#error').hide()
                $('#duplicate').hide()
                $('#success').show()
                setTimeout(function () {
                    location.reload()
                }, 5000);
                console.log("Data Saved: " + JSON.stringify(msg));
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.responseText)
                let error = XMLHttpRequest.responseText
                if (error.includes('duplicate')) {
                    $('#error').hide()
                    $('#success').hide()
                    $('#duplicate').show()
                }
                else {
                    $('#success').hide()
                    $('#duplicate').hide()
                    $('#error').show()
                }
            }
        });
        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });

    function getloc() {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function success(pos) {
            var crd = pos.coords;
            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }
        navigator.geolocation.getCurrentPosition(success, error, options);
    }
})