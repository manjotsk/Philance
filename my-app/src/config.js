export const hostname = () => {
    console.log('running');
    if (window.location.hostname.includes('philance.hopto.org')){
        return 'https://philance.hopto.org:434'
    }
    else{
        console.log('hostname');
        return 'http://localhost:3001'
    }
}