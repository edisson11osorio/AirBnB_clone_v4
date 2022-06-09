document.addEventListener('DOMContentLoaded', () => {
    const checked_list = {};
    const checkbox = document.querySelectorAll('input[type=checkbox]').forEach(function (checks) {
        checks.addEventListener("change", function () {
            if (this.checked) {
                checked_list[checks.getAttribute('data-id')] = checks.getAttribute('data-name');
            }
            else {
                delete checked_list[checks.getAttribute('data-id')];
            }
            document.querySelector(".amenities h4").textContent = Object.values(checked_list).join(', ');
        });
    });

    const api_status = document.querySelector('div#api_status');
    fetch("http://localhost:5001/api/v1/status/").then((response) => {
        if (response.ok) {
            api_status.className += " available";
        }
        else {
            api_status.className.replace(" available", '');
        }
    });

    fetch("http://localhost:5001/api/v1/places_search", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {
            const section_place = document.querySelector(".places")
            for (let i = 0; i < data.length; i++) {
                let article = document.createElement("article"),
                    title_box = document.createElement("div"),
                    title_name = document.createElement("h2"),
                    title_price = document.createElement("div"),
                    info = document.createElement("div"),
                    info_guest = document.createElement("div"),
                    info_rooms = document.createElement("div"),
                    info_bathrooms = document.createElement("div"),
                    description = document.createElement("div");

                title_box.setAttribute('class', 'title_box');
                title_name.innerHTML = data[i].name;
                title_price.setAttribute('class', 'price_by_night');
                title_price.innerHTML = '$' + data[i].price_by_night;
                title_box.appendChild(title_name);
                title_box.appendChild(title_price);
                
                info.setAttribute('class', 'information');
                info_guest.setAttribute('class', 'max_guest');
                info_guest.innerHTML = data[i].max_guest + ' Guest' + (data[i].max_guest > 1 ? 's' : '');
                info_rooms.setAttribute('class', 'number_rooms');
                info_rooms.innerHTML = data[i].number_rooms + ' Bedroom' + (data[i].number_rooms > 1 ? 's' : '');
                info_bathrooms.setAttribute('class', 'number_bathrooms');
                info_bathrooms.innerHTML = data[i].number_bathrooms + ' Bathroom' + (data[i].number_bathrooms > 1 ? 's' : '');
                info.appendChild(info_guest);
                info.appendChild(info_rooms);
                info.appendChild(info_bathrooms);

                description.setAttribute('class', 'description');
                description.innerHTML = data[i].description;

                article.appendChild(title_box);
                article.appendChild(info);
                article.appendChild(description);

                section_place.appendChild(article);
            }
        })
});
