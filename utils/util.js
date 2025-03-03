const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : `0${n}`
}

function getRandomColor() {
    const getRandomValue = () => Math.floor(Math.random() * 256);
    const toHex = (value) => value.toString(16).padStart(2, '0');

    const red = getRandomValue();
    const green = getRandomValue();
    const blue = getRandomValue();

    return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

module.exports = {
    formatTime,
    getRandomColor,
}