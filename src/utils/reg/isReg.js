
const isPhoneNumber = (number)=>{
    let reg = /^1[34578]\d{9}$/
    return reg.test(number)
}

const isEmail = (text)=>{
    let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+$/
    return reg.test(text)
}

export default {isPhoneNumber}
