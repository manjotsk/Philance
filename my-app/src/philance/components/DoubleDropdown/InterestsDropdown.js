import React from 'react' 
import { Dropdown } from 'semantic-ui-react'
import {getInterests, skillsOptions} from './common'

import {interestschanged, textChanged} from  '../../actions/userProfile'
import store from '../../store/store'

class InterestsDropdown extends React.Component {
    state = {

    }

    componentDidMount() {
        getInterests()
     }

     onInterestsChange(text) {
        store.dispatch(interestschanged(text))
        store.dispatch(textChanged())
      }

    render () {
        return (
                <Dropdown
                    placeholder='Impact Category Interests'
                    fluid
                    search
                    selection
                    multiple
                    options={skillsOptions}
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