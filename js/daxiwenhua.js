const query = new URLSearchParams(location.search)
const file = query.get('file')

const hasImg = {
    '00997_1_F': '6a63f6246b600c333e2b2437ef6b9d04d8f9a1b7.jpeg'
}

async function request(url) {
    const res =  await fetch(url)
    return res.text()
}

let text = await request('/json/' + file + '.wav.txt')

if (hasImg[file]) {
    text = '<img src="/imgs/' + hasImg[file]+'" />' + text
}

document.querySelector('.content').innerHTML = text