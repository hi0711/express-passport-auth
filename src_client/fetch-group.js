export default function fetchGroup() {
    // URL取得
    const url = new URL(window.location.href);
    // URLSearchParamsオブジェクト取得
    const params = url.searchParams;
    // ターゲットになる要素
    const targetElement = document.querySelector('group');
    // API問い合わせ先URL
    const apiURL = 'https://script.google.com/macros/s/AKfycbx8F3rUeX9PEEAQSy-U_m8ICNeeEzdESweGP4lRTGWILOLx0j3GD6r3TbmjTVqEX7CB/exec?q=' + params.get('name');

    function returnData() {
        return fetch(apiURL, {
            mode: 'no-cors'
        })
            .then((response) => response.json())
            .then((data) => {
                const userData = [];
                for (let i in data) {
                    userData.push(data[i].group)
                }
                return userData
            });
    }

    const outputData = returnData();
    targetElement.innerHTML = outputData;
}

