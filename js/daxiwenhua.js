const query = new URLSearchParams(location.search)
const file = query.get('file')

const hasImg = {
    '00997_1_F': '6a63f6246b600c333e2b2437ef6b9d04d8f9a1b7.jpeg'
}

function request(url) {
    const res = fetch(url).then(res => res.text())
    return res
}

request('/json/' + file + '.wav.txt').then(text => {
    if (hasImg[file]) {
        text = '<img src="/imgs/' + hasImg[file]+'" />' + text
    }
    
    document.querySelector('.content').innerHTML = text
})
