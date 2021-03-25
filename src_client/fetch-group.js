export default function fetchGroup() {
    // URL取得
    const url = new URL(window.location.href);
    // URLSearchParamsオブジェクト取得
    const params = url.searchParams;

    console.log(params.get('name'));
}

