export default function fetchGroup() {
    // URL取得
    const url = new URL(window.location.href);
    // URLSearchParamsオブジェクト取得
    const params = url.searchParams;
    // ターゲットになる要素
    const targetElement = document.querySelector('.group');
    // API問い合わせ先URL
    const apiURL = 'https://script.google.com/a/hi0711.xyz/macros/s/AKfycbze5J3J7RCrD-T8meouPAKmjQn0DbOKgOG_rOyQ/exec?q=' + params.get('name');

    if (targetElement) {
        function returnData() {
            let userData = '';
            return fetch(apiURL)
                .then((response) => response.json())
                .then((data) => {
                    for (let i in data) {
                        userData = data[i].group
                    }
                })
                .then(() => {
                    targetElement.innerHTML = userData
                })
        }

        returnData();
    }
}

