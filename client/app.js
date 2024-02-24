document.addEventListener("DOMContentLoaded", function() {
    load_locations();
});

function load_locations() {
    var url = "http://127.0.0.1:5000/get_locations";
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
               return response.json();
            }
        })
        .then(data => {
            console.log(data);
            var select = document.getElementById("locationSelect")

            var defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.text = "<-- Select Location -->";
            select.add(defaultOption);

                data.locations.forEach(element => {
                   
                    var option = document.createElement("option");
                    option.value = element;
                    option.text = element;
                    select.add(option);
                    
                });
                var otherOption = document.createElement("option");
                otherOption.value = "other";
                otherOption.text = "other";
                select.add(otherOption);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("predict_form");


    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevents the default form submission

        // Get form values
        var total_sqft = document.getElementById("areaInput").value;
        var bhk = document.getElementById("bhkInput").value;
        var bathroom = document.getElementById("bathroomsInput").value;
        var location_name = document.getElementById("locationSelect").value;

        var form_data = new FormData();
        form_data.append("total_sqft",total_sqft)
        form_data.append("bhk",bhk)
        form_data.append("bathroom",bathroom)
        form_data.append("location",location_name)

        fetch("http://127.0.0.1:5000/get_price", {
            method: "POST",
            body: form_data,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Response from server:", data);
                document.getElementById("predict_rs").innerText = data.estimate_price + " Lacs"
                document.getElementById("rs_para").style.display = "none"
                document.getElementById("predict_content").style.display = "block"
            })
            .catch(error => {
                console.error("Fetch error:", error);
            });

        // Do something with the form values
        console.log("Name:", bhk);
    });
});