document.addEventListener('DOMContentLoaded', () => {
    let checkboxes = document.querySelectorAll(".each_amenity");
    let amenitiesChecked_list = [];

    document.addEventListener("change", function() {
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                amenitiesChecked_list += checkbox.getAttribute("data-name") + ", ";
            }
        });
        document.getElementById("amenities_selected").innerText = amenitiesChecked_list;
    });
});
