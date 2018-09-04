import axios from 'axios'

import hostname from '../../../config'

export const myProject =()=> {
    axios.get(hostname()+'/philance/users/1/projects/')
        .then(
            response=>{
                console.log(response)
            }
        )
}