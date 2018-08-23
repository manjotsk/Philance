import {
    USER_PROFILE_TEXT_CHANGED,
    USER_PROFILE_FIELDS_EMPTY,
    USER_PROFILE_CITY_CHANGED,
    USER_PROFILE_COUNTRY_CHANGED,
    USER_PROFILE_DESCRIPTION_CHANGED,
    USER_PROFILE_EMAIL_CHANGED,
    USER_PROFILE_FIRSTNAME_CHANGED,
    USER_PROFILE_LASTNAME_CHANGED,
    USER_PROFILE_POSTAL_CODE_CHANGED,
    USER_PROFILE_USERNAME_CHANGED
} from '../types'

import axios from 'axios'

import hostname from '../../../config'

export const textChanged = () => {
    return {
        type: USER_PROFILE_TEXT_CHANGED
    }
}

export const firstNameChanged = text => {
    return {
        type: USER_PROFILE_FIRSTNAME_CHANGED,
        payload: text
    }
}

export const emailChanged = text => {
    return {
        type: USER_PROFILE_EMAIL_CHANGED,
        payload: text
    }
}

export const userNameChanged = text => {
    return {
        type: USER_PROFILE_USERNAME_CHANGED,
        payload: text
    }
}

export const descriptionChanged = text => {
    return {
        type: USER_PROFILE_DESCRIPTION_CHANGED,
        payload: text
    }
}

export const lastNameChanged = text => {
    return {
        type: USER_PROFILE_LASTNAME_CHANGED,
        payload: text
    }
}

export const cityChanged = text => {
    return {
        type: USER_PROFILE_CITY_CHANGED,
        payload: text
    }
}

export const postalCodeChanged = text => {
    return {
        type: USER_PROFILE_POSTAL_CODE_CHANGED,
        payload: text
    }
}

export const countryChanged = text => {
    return {
        type: USER_PROFILE_COUNTRY_CHANGED,
        payload: text
    }
}

export const updateProfile = ({ userName, email, firstName, lastName, city, country, postalCode, description }) => {
    if(userName === '' || email === '' || firstName === '' || lastName === '' || city === '' || country === '' || postalCode === '' || description === '') {
        return {
            type: USER_PROFILE_FIELDS_EMPTY
        }
    }
    else return dispatch => {
        dispatch({type: USER_PROFILE_TEXT_CHANGED})
        axios.put(hostname()+'/philance/users/1', {
            firstName : "Vijay Kumar",
            lastName : "Gandra1",
            email : "vijy.gandra@gmail.com",
            location : "Nashua, NH",
            interests : "CREATE|DEVELOP",
            organization : "Philance",
            rate : "60",
            userSkills : [  
               {  
                 skillCode: "DATABASE",
                 skillName: "Database Development",
                 certified: "Yes",
                 certificationLink: null,
                 startDate: "2018-08-02T00:00:00.000Z",
                 endDate: null
               },
               {  
                 skillCode: "BUSINESS",
                 skillName: "Project Management",
                 certified: "Yes",
                 certificationLink: null,
                 startDate: "2018-08-02T00:00:00.000Z",
                 endDate: null
               }
            ]
         })
            .then(response=>
                console.log(response)
            )
            .catch(error=>{
                console.log(error)
            });
    }
}