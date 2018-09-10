import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import {connect} from 'react-redux'

import {interestschanged, textChanged} from  '../../actions/userProfile'
import store from '../../store/store'

  const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: 0,
      minWidth: 120,
      maxWidth: 350,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: theme.spacing.unit / 4,
    },
  });
  
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 0;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };  

class InterestsDropdown extends React.Component {

    state = {
        name: [],
      }
    
       handleChange = async event => {
        await this.setState({ name: event.target.value })
        store.dispatch(interestschanged(this.state.name))
        store.dispatch(textChanged())
      }

    render () {
        const names = this.props.interestOptions
        const { classes, theme } = this.props;
        return (
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="select-multiple-chip">Impact Category</InputLabel>
                        <Select
                        multiple
                        value={this.state.name}
                        onChange={this.handleChange}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={selected => (
                            <div className={classes.chips}>
                            {selected.map(value => (
                                <Chip key={value} label={value} className={classes.chip} />
                            ))}
                            </div>
                        )}
                        MenuProps={MenuProps}
                        >
                        {names.map(name => (
                            <MenuItem
                            key={name}
                            value={name}
                            style={{
                                fontWeight:
                                this.state.name.indexOf(name) === -1
                                    ? theme.typography.fontWeightRegular
                                    : theme.typography.fontWeightMedium,
                            }}
                            >
                            {name}
                            </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
    )
    }

}

const mapStateToProps=state=> {
    return {
        interests: state.user.interests
    }
}

InterestsDropdown.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };
  

export default  connect(mapStateToProps)(withStyles(styles, { withTheme: true })(InterestsDropdown))