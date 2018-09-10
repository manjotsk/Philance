

export const hostname = () => {
    if(window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1'))
        return 'http://localhost:3001'
    else if (window.location.hostname.includes('philance.hopto.org'))
        return 'https://philance.hopto.org:434'
}
