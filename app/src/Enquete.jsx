import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import ShortTextIcon from '@material-ui/icons/ShortText';
import MultiTextIcon from '@material-ui/icons/FormatAlignLeft';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import RadioButtonIcon from '@material-ui/icons/RadioButtonChecked';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

import { edit_enquete, del_enquete } from './actions'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,
  },
  rightElement: {
    marginLeft: 'auto',
  },
  inputControl: {
    margin: theme.spacing.unit,
  }
});

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  handleEdit: (value) => { dispatch(edit_enquete(value)); },
  handleDelete: (id) => { dispatch(del_enquete(id)); },
});

const items = {
  'text': 'Text',
  'multitext': 'MultiText',
  'password': 'Password',
  'email': 'Email',
  'select': 'Select',
  'multiselect': 'MultiSelect',
}

class Enquete extends React.Component {
  constructor(props) {
    super(props);
    const { question } = this.props;
    this.state = {
      title: question.title,
      description: question.description,
      type: question.type,
      required: question.required,
      items: question.items,
      id: question.id
    };
  }

  handleChangeText = name => e => {
    this.setState({
      [name]: e.target.value
    });
    this.props.handleEdit(Object.assign({}, this.state, {
      [name]: e.target.value
    }));
  }

  handleChangeSelect = e => {
    let items = this.state.items;
    if (!this.state.type.includes('select'))
      items = ['', ''];

    this.setState({
      type: e.target.value,
      items: items
    });
    this.props.handleEdit(Object.assign({}, this.state, {
      type: e.target.value,
      items: items
    }));
  }

  handleChangeSwitch = e => {
    this.setState({
      required: e.target.checked
    });
    this.props.handleEdit(Object.assign({}, this.state, {
      required: e.target.checked
    }));
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
        <CardContent>
          <Select
            value={this.state.type}
            renderValue={value => items[value]}
            onChange={this.handleChangeSelect}
            className={classes.formControl}
          >
            <MenuItem value='text'>
              <ListItemIcon>
                <ShortTextIcon />
              </ListItemIcon>
              <ListItemText primary="Text" />
            </MenuItem>
            <MenuItem value='multitext'>
              <ListItemIcon>
                <MultiTextIcon />
              </ListItemIcon>
              <ListItemText primary="MultiText" />
            </MenuItem>
            <MenuItem value='password'>
              <ListItemIcon>
                <VisibilityOffIcon />
              </ListItemIcon>
              <ListItemText primary="Password" />
            </MenuItem>
            <MenuItem value='email'>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary="Email" />
            </MenuItem>
            <MenuItem value='select'>
              <ListItemIcon>
                <RadioButtonIcon />
              </ListItemIcon>
              <ListItemText primary="Select" />
            </MenuItem>
            <MenuItem value='multiselect'>
              <ListItemIcon>
                <CheckBoxIcon />
              </ListItemIcon>
              <ListItemText primary="MultiSelect" />
            </MenuItem>
          </Select>
          <TextField
            label='Title'
            required={true}
            value={this.state.title}
            onChange={this.handleChangeText('title')}
            className={classes.formControl}
          />
          <TextField
            label='Description'
            required={true}
            value={this.state.description}
            onChange={this.handleChangeText('description')}
            className={classes.formControl}
          />
          {this.state.type.includes('select') && <div>
            {this.state.items.map((x, i) =>
              <Input key={i}
                className={classes.inputControl}
                fullWidth
                type='text'
                value={x}
                placeholder={i < 2 ? 'Choice' : 'Option'}
                required={i < 2}
                onChange={(e) => {
                  let tmp = this.state.items.slice(0);
                  tmp[i] = e.target.value;
                  this.setState({items: tmp});
                  this.props.handleEdit(Object.assign({}, this.state, {
                    items: tmp
                  }));
                }}
                endAdornment={(i >= 2) &&
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() => {
                        let tmp = this.state.items.slice(0).filter((val, idx) => idx !== i);
                        this.setState({items: tmp});
                        this.props.handleEdit(Object.assign({}, this.state, {
                          items: tmp
                        }));
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />)
            }
            <Button
              onClick={() => {
                let tmp = this.state.items.slice(0);
                tmp.push('');
                this.setState({items: tmp});
              }}
            >
              Add
            </Button>
          </div>}
        </CardContent>
        <CardActions className={classes.rightElement}>
          <FormControlLabel
            control={
              <Switch
                checked={this.state.required}
                onChange={this.handleChangeSwitch}
                color="secondary"
              />
            }
            label="Required"
          />
          <IconButton onClick={() => this.props.handleDelete(this.state.id)}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

Enquete.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Enquete));
