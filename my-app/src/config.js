

const hostname = () => {
    if(window.location.hostname.includes('localhost'))
        return 'http://localhost:3001'
    else if (window.location.hostname.includes('philance.hopto.org'))
        return 'https://philance.hopto.org:434'
}

export default hostname