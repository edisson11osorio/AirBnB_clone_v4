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
});
