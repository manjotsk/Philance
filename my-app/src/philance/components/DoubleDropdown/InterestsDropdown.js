import React from 'react' 
import { Dropdown } from 'semantic-ui-react'

import {interestschanged, textChanged} from  '../../actions/userProfile'
import store from '../../store/store'

class InterestsDropdown extends React.Component {
    constructor(props){
        super(props);
        // this.state = {
        //     valid: props.action
        // }
    }
   
     onInterestsChange = async(text)=> {
        
    }
    render () {
        let check = this.props.action
        console.log(check)
        return (
                <Dropdown
                    placeholder='Select Interests'
                    fluid
                    selection
                    multiple
                    error={check}
                    disabled={this.props.disabled}
                    defaultValue={this.props.defaultValue}
                    options={this.props.interestOptions}
                    value={this.props.defaultValue}
                    // onChange={
                    //     async (e, {value})=>{
                    //     await this.setState({value:value})
                    //     this.onInterestsChange(this.state.value.toString())
                    // }}
                    onChange={this.props.onInterestsChange}
                />
    )
    }

}

export default InterestsDropdown
