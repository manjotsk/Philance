

const hostname = () => {
    if(window.location.hostname.includes('localhost'))
        return 'http://localhost:3001'
    else if (window.location.hostname.includes('test'))
        return ''
    else if (window.location.hostname.includes('prod'))
        return ''
}

export default hostname