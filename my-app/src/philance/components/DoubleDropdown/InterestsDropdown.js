import React from 'react' 
import { Dropdown } from 'semantic-ui-react'
import {getInterests, skillsOptions} from './common'

export default class InterestsDropdown extends React.Component {
    state = {

    }

    componentDidMount() {
        getInterests()
     }

    render () {
        return (
                <Dropdown
                    placeholder='Select Interests'
                    fluid
                    search
                    selection
                    multiple
                    options={skillsOptions}
                    value={this.state.value}
                    onChange={async (e, {value})=>{
                        await this.setState({value})
                        console.log(this.state.value)
                    }}
                    />
    )
    }

}