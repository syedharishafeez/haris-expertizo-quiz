import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Progress } from "reactstrap";

// Inspired by the former Facebook spinners.

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function UpperSlider(props) {
  const classes = useStyles();

  let showProgess = (type, value, display) => {
    return (
      <Progress bar color={type} value={value}>
        {display}
      </Progress>
    );
  };

  return (
    <div className={classes.root}>
      <Progress multi>
          {showProgess(
            "warning",
            props.correctAnswers === 0
              ? 0
              : (props.correctAnswers / props.questions.length) * 100,
            props.correctAnswers === 0
              ? 0
              : Math.round((props.correctAnswers / props.questions.length) * 100)
          )}

          {showProgess(
            "success",
            (props.correctAnswers === 0
              ? 0
              : (props.correctAnswers / props.pageNumber) * 100) -
              (props.correctAnswers / props.questions.length) * 100,
            props.correctAnswers === 0
              ? 0
              : Math.round(
                  (props.correctAnswers / props.pageNumber) * 100
                )
          )}

          {showProgess(
            "info",
            props.pageNumber === 0
              ? 100
              : ((props.correctAnswers +
                  props.questions.length -
                  props.pageNumber) /
                  props.questions.length) *
                  100 -
                  (props.correctAnswers / props.pageNumber) * 100,
            props.pageNumber === 0
              ? 100
              : Math.round(
                  ((props.correctAnswers +
                    props.questions.length -
                    props.pageNumber) /
                    props.questions.length) *
                    100
                )
          )}
        </Progress>
        
        
    </div>
  );
}
