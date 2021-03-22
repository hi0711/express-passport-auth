export default function fetchName() {
    const nameField = document.querySelector('#username');

    function returnName(target) {
        const regex = /\s+/;
        let regexName = target.value.replace(regex, '');
        return regexName;
    }
    function cropName() {
        const userName = returnName(nameField);
        console.log(userName);
    }

    nameField.addEventListener('blur', cropName, false);
}
