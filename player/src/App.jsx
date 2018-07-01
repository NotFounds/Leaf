import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

import Answer from './Answer'
import { fetchEnquete, move_page } from './actions';

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  movePage: (page) => { dispatch(move_page(page)); },
  fetchEnquete: (key) => { dispatch(fetchEnquete(key)); },
});

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  inputControl: {
    margin: theme.spacing.unit,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
    };
  }

  handleChange = name => e => {
    this.setState({
      [name]: e.target.value
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
          spacing={16}
        >
          <Grid item xs={6}>
            {this.props.page === 'top' &&
            <Card>
              <CardContent>
                {!this.props.isFetching && <div>
                  <Typography variant='headline' component='h2'>
                    Join Enquete!
                  </Typography>
                  <Typography className={classes.title} color='textSecondary'>
                    Input Enquete Key
                  </Typography>
                </div>}
                {this.props.isFetching && <div>
                  <Typography variant='headline' component='h2'>
                    Please wait a minite
                  </Typography>
                  <Typography className={classes.title} color='textSecondary'>
                    Loading the enquete
                  </Typography>
                </div>}
                {this.props.page === 'top' &&
                <Input
                  className={classes.inputControl}
                  type='text'
                  value={this.state.keyword}
                  placeholder={'Enquete Key'}
                  required={true}
                  onChange={this.handleChange('keyword')}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() => {this.props.movePage('answer'); this.props.fetchEnquete(this.state.keyword); this.setState({ keyword: '' });}}
                        disabled={this.state.keyword.length < 3}
                      >
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />}
                {this.props.isFetching && <center><CircularProgress className={classes.progress} size={70} /></center>}
              </CardContent>
            </Card>}
            {this.props.page === 'answer' && !this.props.isFetching && <Answer />}
          </Grid>
        </Grid>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));
