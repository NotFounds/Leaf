import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import SendIcon from '@material-ui/icons/Send';

import { fetchEnquete, sendAnswer } from './actions';

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  sendAnswer: (answer) => { dispatch(sendAnswer(answer)); },
});

const styles = theme => ({
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  card: {
    margin: theme.spacing.unit,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  }
});

class Answer extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      activeStep: 0,
      visible: false,
      enquete: this.props.enquete || {
        title: '',
        key: '',
        questions: [],
      },
      answer: this.props.answer || {
        meta: {
          key: '',
          uid: '',
        },
        answers: [],
      },
    };
  }

  componentDidMount() {
    this.setState({
      enquete: this.props.enquete || {
        title: '',
        key: '',
        questions: [],
      },
      answer: this.props.answer || {
        meta: {
          key: '',
          uid: '',
        },
        answers: [],
      },
    });
  }

  handleNext = () => {
    this.setState((prevState) => ({
      activeStep: prevState.activeStep + 1,
      visible: false,
    }));
  };

  handleBack = () => {
    this.setState((prevState) => ({
      activeStep: prevState.activeStep - 1,
      visible: false,
    }));
  };

  handleChangeVisibility = () => {
    this.setState((prevState) => ({
      visible: !prevState.visible
    }));
  };

  handleChange = id => e => {
    let answers = this.state.answer.answers.slice(0).map(x => {
      return (
        x.id === id
            ? { id: id, value: e.target.value }
            : x
        )
      }
    );
    this.setState((prevState) => ({
      answer: Object.assign({}, prevState.answer, {
        answers: answers
      })
    }));
  };

  handleChangeCheckbox = (id, val) => e => {
    let answers = this.state.answer.answers.slice(0).map(x => {
      return (
        x.id === id
          ? x.value.includes(val)
            ? { id: id, value: x.value.slice(0).filter(x => x !== val)}
            : { id: id, value: x.value.slice(0).concat([val]) }
          : x
        )
      }
    );
    this.setState((prevState) => ({
      answer: Object.assign({}, prevState.answer, {
        answers: answers
      })
    }));
  };

  render() {
    const { classes } = this.props;
    const { activeStep, enquete, answer } = this.state;
    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {enquete.questions.map(x => {
            return (
              <Step key={x.id}>
                <StepLabel>{x.title}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          <Card className={classes.card}>
            <CardContent>
              {activeStep === enquete.questions.length ? (
                <div>
                  <Typography variant='headline' component='h2'>
                    Thank you for answering!
                  </Typography>
                  <Typography className={classes.title} color='textSecondary'>
                    All enquetes completed - you're finished!
                  </Typography>
                </div>
              ):(
                <div>
                  <Typography variant='headline' component='h2'>
                    {enquete.questions[activeStep].title}
                  </Typography>
                  <Typography className={classes.title} color='textSecondary'>
                    {enquete.questions[activeStep].description}
                  </Typography>
                  {enquete.questions[activeStep].type === 'text' && (
                    <TextField
                      value={answer.answers[activeStep].value}
                      onChange={this.handleChange(enquete.questions[activeStep].id)}
                      required={enquete.questions[activeStep].required}
                    />
                  )}
                  {enquete.questions[activeStep].type === 'multitext' && (
                    <TextField
                      multiline
                      value={answer.answers[activeStep].value}
                      onChange={this.handleChange(enquete.questions[activeStep].id)}
                      required={enquete.questions[activeStep].required}
                    />
                  )}
                  {enquete.questions[activeStep].type === 'password' && (
                    <FormControl required={enquete.questions[activeStep].required}>
                      <Input
                        type={this.state.visible ? 'text' : 'password'}
                        value={answer.answers[activeStep].value}
                        onChange={this.handleChange(enquete.questions[activeStep].id)}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='Toggle visibility'
                              onClick={this.handleChangeVisibility}
                            >
                              {this.state.visible ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  )}
                  {enquete.questions[activeStep].type === 'select' && (
                    <FormControl component='fieldset' required={enquete.questions[activeStep].required}>
                      <RadioGroup
                        aria-label={enquete.questions[activeStep].title}
                        className={classes.group}
                        value={answer.answers[activeStep].value}
                        onChange={this.handleChange(enquete.questions[activeStep].id)}
                      >
                        {enquete.questions[activeStep].items.map(x => <FormControlLabel value={x} key={enquete.questions[activeStep].id + x} control={<Radio />} label={x} />)}
                      </RadioGroup>
                    </FormControl>
                  )}
                  {enquete.questions[activeStep].type === 'multiselect' && (
                    <FormControl component='fieldset' required={enquete.questions[activeStep].required}>
                      <FormGroup>
                        {enquete.questions[activeStep].items.map(x =>
                            <FormControlLabel
                              key={enquete.questions[activeStep].id + x}
                              control={
                                <Checkbox
                                  value={x}
                                  onChange={this.handleChangeCheckbox(enquete.questions[activeStep].id, x)}
                                  checked={answer.answers[activeStep].value.includes(x)}
                                />
                              }
                              label={x}
                            />
                        )}
                      </FormGroup>
                    </FormControl>
                  )}
                </div>
              )}
            </CardContent>
            <CardActions>
              {activeStep === enquete.questions.length
                ?(<Button
                    color='primary'
                    onClick={this.props.sendAnswer(this.state.answer)}
                  >
                    Send
                    <SendIcon className={classes.rightIcon} />
                  </Button>
                ):(<div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={this.handleNext}
                    disabled={enquete.questions[activeStep].required && answer.answers[activeStep].value === ''}
                  >
                    {activeStep === enquete.questions.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              )}
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

Answer.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Answer));
