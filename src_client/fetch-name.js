export default function fetchName() {
    let nameField = document.querySelector('#username');

    nameField.addEventListener('blur', (event) => {
        const regex = /\s+/;
        console.log(nameField.value.replace(regex, ''))
    });
}
