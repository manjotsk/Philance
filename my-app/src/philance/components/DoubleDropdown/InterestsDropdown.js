import React from 'react' 
import { Dropdown } from 'semantic-ui-react'

import {interestschanged, textChanged} from  '../../actions/userProfile'
import store from '../../store/store'

class InterestsDropdown extends React.Component {
    state = {

    }
     onInterestsChange(text) {
        store.dispatch(interestschanged(text))
        store.dispatch(textChanged())
      }

    render () {
        return (
            
                <Dropdown
                    placeholder='Select Interests'
                    fluid
                    selection
                    multiple
                    disabled={this.props.disabled}
                    defaultValue={this.props.defaultValue}
                    options={this.props.interestOptions}
                    value={this.state.value}
                    onChange={async (e, {value})=>{
                        await this.setState({value})
                        this.onInterestsChange(this.state.value.toString())
                    }}
                    />
    )
    }

}

export default InterestsDropdown
