import React, {useState, useEffect} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function Questionnaire(props) {
  const classes = useStyles();
    let [randomizeOptions, setRandomizeOptions] = useState([])

    let randomizeOption = (correctOption, incorrectOptions) => {
        let randomizeOptionsArr = [];
        let correctOptionIndex = Math.floor((Math.random()*100)/(100/(incorrectOptions.length + 1)))
        randomizeOptionsArr[correctOptionIndex] = correctOption
        let incorrectOptionsIndex = 0
        for(let options = 0; options < incorrectOptions.length + 1; options++){
            if(randomizeOptionsArr[options]){
                continue
            }
            randomizeOptionsArr[options] = incorrectOptions[incorrectOptionsIndex]
            incorrectOptionsIndex = incorrectOptionsIndex + 1
        }
        return randomizeOptionsArr
      }

  useEffect(() => {
      console.log("props ====== ", props.questions[props.pageNumber])
      return (function(){
          let options = randomizeOption(props.questions[props.pageNumber].correct_answer, props.questions[props.pageNumber].incorrect_answers)
          console.log("options ===== ", options)
          setRandomizeOptions([...options])
      })()
  }, [props.pageNumber])

  let removeWithSpace = value => {
    return value.replace(/%20|%3A|%27|%22|%3F|%2C/g, " ");
  };

  let showResult = () => {
    if (
      props.alignment === props.questions[props.pageNumber].correct_answer
    ) {
      return "Correct!";
    } else if (
      props.questions[props.pageNumber].incorrect_answers.includes(
        props.alignment
      )
    ) {
      return "Sorry!";
    } else {
      return null;
    }
  };

  let setDifficulty = difficulty => {
    if (difficulty === "hard") {
      return (
        <>
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </>
      );
    } else if (difficulty === "medium") {
      return (
        <>
          <StarIcon />
          <StarIcon />
          <StarBorderIcon />
        </>
      );
    } else {
      return (
        <>
          <StarIcon />
          <StarBorderIcon />
          <StarBorderIcon />
        </>
      );
    }
  };
  let setQuestionPageNumber = e => {
    e.preventDefault();
    if (props.alignment === null) {
      return null;
    } else {
      if (showResult() === "Correct!") {
          props.setCorrectAnswers(props.correctAnswers + 1)
      }
      props.setPageNumber(props.pageNumber + 1)
      props.setAlignment(null)
    }
  };

  let handleChange = (e, value) => {
    props.setAlignment(value)
  };

  let showResultColor = showResult() === "Correct!" ? "green" : "red"

  return (
    <div className={classes.root}>
        <Typography variant="h2" style={{color:"black"}}>
          Question {props.pageNumber + 1} of {props.questions.length}
        </Typography>
        <Typography variant="h5" style={{color:"black"}}>{removeWithSpace(props.questions[props.pageNumber].category)}</Typography>
        <Typography variant="h6" style={{color:"black"}} gutterBottom>{setDifficulty(props.questions[props.pageNumber].difficulty)}</Typography>
        <Typography variant="h6" style={{color:"black", margin:"30px 0px 30px 0px"}}>{removeWithSpace(props.questions[props.pageNumber].question)}</Typography>
        <form onSubmit={setQuestionPageNumber}>
            <ToggleButtonGroup
              value={props.alignment}
              size="small"
              exclusive
              onChange={handleChange}
            >
              {randomizeOptions.map(item => (
                <ToggleButton value={item} disabled={props.alignment} style={{color:"black"}} >
                  {removeWithSpace(item)}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          <br />

          <Typography variant="h4" style={{color:showResultColor, marginBottom: "20px"}}>{showResult()}</Typography>
          
          <Button variant="contained" color="primary" type="primary" htmlType="submit">
          {props.pageNumber + 1 === props.questions.length ? "Finish" : "Next"}
          </Button>
        </form>
        
        </div>
        
  );
}
