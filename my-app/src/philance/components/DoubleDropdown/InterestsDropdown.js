import React from 'react' 
import { Dropdown } from 'semantic-ui-react'

import {interestschanged, textChanged} from  '../../actions/userProfile'
import store from '../../store/store'

class InterestsDropdown extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            valid: props.action
        }
    }
   
     onInterestsChange = async(text)=> {
        if (text === "") {
            await this.setState({
                valid:true
            })
          }
          else {
            await this.setState({ valid: false })
        store.dispatch(interestschanged(text))
        store.dispatch(textChanged())
      }
    }
    render () {
        // var value = this.props.defaultValue
        // value.toString()
        return (
                <Dropdown
                    placeholder='Select Interests'
                    fluid
                    selection
                    multiple
                    error={this.state.valid}
                    disabled={this.props.disabled}
                    defaultValue={this.props.defaultValue}
                    options={this.props.interestOptions}
                    value={this.props.defaultValue}
                    onChange={async (e, {value})=>{
                        await this.setState({value:value})
                        this.onInterestsChange(this.state.value.toString())
                    }}
                    />
    )
    }

}

export default InterestsDropdown
