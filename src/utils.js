function generate_fake_data(length) {
    return Array.from({length: length}, () => Math.floor(Math.random() * 500) + 300);


}

const sm_colors = {"facebook": "#0a7fec", "instagram": "#ee4a61", "twitter": "#1DA1F2"}
const sm_unicode = {"facebook": "f082", "instagram": "f16d", "twitter": "f099"}
const performance_unicode_reversed = {"up": "f352", "down": "f351"}
const performance_unicode = {"up": "f353", "down": "f350"}

function nFormatter(num, digits) {
    const lookup = [
        {value: 1, symbol: ""},
        {value: 1e3, symbol: "k"},
        {value: 1e6, symbol: "M"},
        {value: 1e9, symbol: "G"},
        {value: 1e12, symbol: "T"},
        {value: 1e15, symbol: "P"},
        {value: 1e18, symbol: "E"}
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function (item) {
        return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}


export default sm_unicode