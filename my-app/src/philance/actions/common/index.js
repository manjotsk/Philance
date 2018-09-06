import axios from "axios";
import hostname from '../../../config'
import {
    INTERESTS_ARRIVED,
    UPLOAD_SUCCESS,
    UPLOAD_FAILED
} from '../types'

/**
 * The method recieves the Common lookups from the API, and stores them in in the redux store
 */

export const getCommonInfo = () => {
    return dispatch => {
        var skills = []
        axios.get(hostname() + '/philance/lookups/Interests')
            .then(async (response) => {
                await response.data.commonLookups.forEach((element) => {
                    skills.push({ value: element.meaning, text: element.meaning })
                    dispatch({ type: INTERESTS_ARRIVED, payload: skills })
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

/**
 * The following method is called to upload files to the server. Reference url is returned
 * @param {*} param0 Tells what type of upload is this.
 */

export const uploadFiles = (type, files) => {
    if(!files){
        return dispatch=>{
            dispatch({
                type:UPLOAD_FAILED
            })
        }
    }else{
        return dispatch => {
            const url = hostname() + '/philance/files';
            const formData = new FormData();
            console.log('----===', files)
            formData.append('file', files)
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            axios.post(url, formData, config)
                .then(() => {
                    dispatch({
                        type: UPLOAD_SUCCESS
                    })
                })
                .catch(() => {
                    dispatch({
                        type: UPLOAD_FAILED
                    })
    
                })
        }
    }

}