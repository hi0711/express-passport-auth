export default function fetchName() {
    const nameField = document.querySelector('#username');

    function returnName(target) {
        const regex = /\s+/;
        let regexName = target.value.replace(regex, '');
        return regexName;
    }
    function cropName() {
        const userName = returnName(nameField);
        const hiddenInput = document.querySelector('.user-name');
        hiddenInput.value = userName;
    }

    nameField.addEventListener('blur', cropName, false);
}
