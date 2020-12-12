import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import UpperSlider from './components/UpperSlider'
import Questionnaire from './components/Questionnaire'
import Footer from './components/Footer'
import Questions from "./questions.json";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  const [pageNumber, setPageNumber] = useState(0)
  const [alignment, setAlignment] = useState(null)
  const [showLabel, setShowLabel] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)

  return (
    <div className={classes.root}>
        {pageNumber === Questions.length ?
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper} elevation={0}>
                    <Typography variant="h3" style={{color:"black"}}>
                            Your score is{" "}{Math.round((correctAnswers / pageNumber) * 100)}%
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
        :
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={0}>
              <UpperSlider setPageNumber={setPageNumber} pageNumber={pageNumber} questions={Questions}/>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={0}>
              <Questionnaire 
                setPageNumber={setPageNumber} 
                pageNumber={pageNumber} 
                setAlignment={setAlignment} 
                alignment={alignment} 
                setShowLabel={setShowLabel} 
                showLabel={showLabel} 
                setCorrectAnswers={setCorrectAnswers}
                correctAnswers={correctAnswers}
                questions={Questions}
                />
        </Paper>
        </Grid>
        <Grid item xs={12} >
          <Paper className={classes.paper} elevation={0}>
              <Footer
                pageNumber={pageNumber} 
                correctAnswers={correctAnswers}
                questions={Questions}
              />
          </Paper>
        </Grid>
      </Grid>
        }
    </div>
  );
}
