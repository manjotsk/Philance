import React from 'react' 
import { Dropdown } from 'semantic-ui-react'

class InterestsDropdown extends React.Component {
    constructor(props){
        super(props);
        // this.state = {
        //     valid: props.action
        // }
    }
   
    render () {
        // console.log('sv',this.props.defaultValue);
        let check = this.props.action
        // console.log(check)
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
                    onChange={this.props.onInterestsChange}
                />
    )
    }

}

export default InterestsDropdown
