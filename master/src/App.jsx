import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import NoteAddIcon from '@material-ui/icons/NoteAdd';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import CloseIcon from '@material-ui/icons/Close';
import FileUploadIcon from '@material-ui/icons/FileUpload';

import Enquete from './Enquete'
import { new_enquete, snack_close, sendEnquete} from './actions'

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  handleAdd: () => { dispatch(new_enquete()); },
  handleClose: () => { dispatch(snack_close()); },
  sendEnquete: (title, key, questions) => { dispatch(sendEnquete(title, key, questions)); },
});

const styles = theme => ({
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,
  },
  flex: {
    flex: 1,
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: '',
      key: '',
    };
  }

  handleChangeText = name => e => {
    this.setState({
      [name]: e.target.value
    });
  }

  handleClick = () => {
    this.setState(state => ({
      open: !state.open,
    }));
  };

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { classes } = this.props;
    let isTouch;
    if (typeof document !== 'undefined') {
      isTouch = 'ontouchstart' in document.documentElement;
    }
    return (
      <div>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='title' color='inherit' className={classes.flex}>
              Edit Enquete
            </Typography>
            <Input
              type='text'
              placeholder='Title'
              required={true}
              value={this.state.title}
              onChange={this.handleChangeText('title')}
              className={classes.formControl}
              disableUnderline={true}
            />
            <Input
              type='text'
              placeholder='Key'
              required={true}
              value={this.state.key}
              onChange={this.handleChangeText('key')}
              className={classes.formControl}
              disableUnderline={true}
            />
            <Button
              disabled={this.state.title.length == 0|| this.state.key.length < 3}
              color='inherit'
              onClick={() => this.props.sendEnquete(this.state.title, this.state.key, this.props.questions)}
            >
              Upload
              <FileUploadIcon className={classes.rightIcon} />
            </Button>
          </Toolbar>
        </AppBar>
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
          spacing={16}
        >
          {this.props.questions.map(item =>
            <Grid item xs={6} key={item.id}>
              <Enquete question={item} />
            </Grid>
          )}
        </Grid>
        <SpeedDial
          ariaLabel='SpeedDial'
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          onBlur={this.handleClose}
          onClick={this.handleClick}
          onClose={this.handleClose}
          onFocus={isTouch ? undefined : this.handleOpen}
          onMouseEnter={isTouch ? undefined : this.handleOpen}
          onMouseLeave={this.handleClose}
          open={this.state.open}
        >
          <SpeedDialAction
            key='Add'
            icon={<NoteAddIcon />}
            tooltipTitle='Add'
            onClick={() => this.props.handleAdd()}
          />
          <SpeedDialAction
            key='Print'
            icon={<PrintIcon />}
            tooltipTitle='Print'
            onClick={() => console.log(this.props)}
          />
        </SpeedDial>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.props.isSnack}
          autoHideDuration={3000}
          onClose={this.props.handleClose}
          message={<span>{this.props.snackMessage}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.props.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));
