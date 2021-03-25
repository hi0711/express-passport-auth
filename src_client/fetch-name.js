export default function fetchName() {
    const nameField = document.querySelector('#username');

    if (nameField) {
        function returnName(target) {
            const regex = /\s+/;
            let regexName = target.value.replace(regex, '');
            return regexName;
        }
        function cropName() {
            const userName = returnName(nameField);
            const hiddenInput = document.querySelector('#cropped');
            hiddenInput.value = userName;
        }

        nameField.addEventListener('blur', cropName, false);
    }
}
