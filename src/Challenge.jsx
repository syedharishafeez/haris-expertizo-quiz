import React, { Component } from "react";
import Questions from "./Questions";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import LinearProgress from "@material-ui/core/LinearProgress";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten("#ff6c5c", 0.5)
  },
  bar: {
    borderRadius: 20,
    backgroundColor: "#ff6c5c"
  }
})(LinearProgress);

class Challenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 0,
      alignment: null,
      showLabel: false
    };
  }

  showResult = () => {
    if (
      this.state.alignment === Questions[this.state.pageNumber].correct_answer
    ) {
      return "Correct!";
    } else if (
      Questions[this.state.pageNumber].incorrect_answers.includes(
        this.state.alignment
      )
    ) {
      return "Sorry!";
    } else {
      return null;
    }
  };

  setDifficulty = difficulty => {
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
  setPageNumber = e => {
    e.preventDefault();
    if (this.state.alignment === null) {
      return null;
    } else {
      this.setState({ pageNumber: this.state.pageNumber + 1, alignment: null });
    }
  };

  handleChange = (e, value) => {
    this.setState({ alignment: value });
  };

  render() {
    return (
      <div>
        <BorderLinearProgress
          variant="determinate"
          color="secondary"
          value={50}
        />
        <h1>
          Question {this.state.pageNumber + 1} of {Questions.length}
        </h1>
        <p>
          {Questions[this.state.pageNumber].category.replace(/%20|%3A/g, " ")}
        </p>
        <p>{this.setDifficulty(Questions[this.state.pageNumber].difficulty)}</p>
        <p>
          {Questions[this.state.pageNumber].question.replace(
            /%20|%3A|%27|%22|%3F|%2C/g,
            " "
          )}
        </p>
        <form onSubmit={this.setPageNumber}>
          <label>
            <ToggleButtonGroup
              value={this.state.alignment}
              size="small"
              exclusive
              onChange={this.handleChange}
            >
              <ToggleButton
                value={Questions[this.state.pageNumber].correct_answer}
                disabled={this.state.alignment}
              >
                {Questions[this.state.pageNumber].correct_answer.replace(
                  /%20|%3A|%27|%22|%3F|%2C/g,
                  " "
                )}
              </ToggleButton>
              {Questions[this.state.pageNumber].incorrect_answers.map(item => (
                <ToggleButton value={item} disabled={this.state.alignment}>
                  {item.replace(/%20|%3A|%27|%22|%3F|%2C/g, " ")}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </label>
          <br />
          <p>{this.showResult()}</p>
          <button type="primary" htmlType="submit">
            Next Page
          </button>
        </form>
      </div>
    );
  }
}

export default Challenge;
