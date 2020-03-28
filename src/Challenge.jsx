import React, { Component } from "react";
import Questions from "./Questions";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { Progress } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class Challenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 0,
      alignment: null,
      showLabel: false,
      correctAnswers: 0
    };
  }

  removeWithSpace = value => {
    return value.replace(/%20|%3A|%27|%22|%3F|%2C/g, " ");
  };

  showProgess = (type, value, display) => {
    return (
      <Progress bar color={type} value={value}>
        {display}
      </Progress>
    );
  };

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
      if (this.showResult() === "Correct!") {
        this.setState({ correctAnswers: this.state.correctAnswers + 1 });
      }
      this.setState({ pageNumber: this.state.pageNumber + 1, alignment: null });
    }
  };

  handleChange = (e, value) => {
    this.setState({ alignment: value });
  };

  render() {
    return this.state.pageNumber === Questions.length ? (
      <p>
        Your score is{" "}
        {Math.round((this.state.correctAnswers / this.state.pageNumber) * 100)}
      </p>
    ) : (
      <div>
        <Progress
          value={((this.state.pageNumber + 1) / Questions.length) * 100}
        ></Progress>

        <h1>
          Question {this.state.pageNumber + 1} of {Questions.length}
        </h1>
        <p>{this.removeWithSpace(Questions[this.state.pageNumber].category)}</p>
        <p>{this.setDifficulty(Questions[this.state.pageNumber].difficulty)}</p>
        <p>{this.removeWithSpace(Questions[this.state.pageNumber].question)}</p>
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
                {this.removeWithSpace(
                  Questions[this.state.pageNumber].correct_answer
                )}
              </ToggleButton>
              {Questions[this.state.pageNumber].incorrect_answers.map(item => (
                <ToggleButton value={item} disabled={this.state.alignment}>
                  {this.removeWithSpace(item)}
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
        <Progress multi>
          {this.showProgess(
            "warning",
            this.state.correctAnswers === 0
              ? 0
              : (this.state.correctAnswers / Questions.length) * 100,
            this.state.correctAnswers === 0
              ? 0
              : Math.round((this.state.correctAnswers / Questions.length) * 100)
          )}

          {this.showProgess(
            "success",
            (this.state.correctAnswers === 0
              ? 0
              : (this.state.correctAnswers / this.state.pageNumber) * 100) -
              (this.state.correctAnswers / Questions.length) * 100,
            this.state.correctAnswers === 0
              ? 0
              : Math.round(
                  (this.state.correctAnswers / this.state.pageNumber) * 100
                )
          )}

          {this.showProgess(
            "info",
            this.state.pageNumber === 0
              ? 100
              : ((this.state.correctAnswers +
                  Questions.length -
                  this.state.pageNumber) /
                  Questions.length) *
                  100 -
                  (this.state.correctAnswers / this.state.pageNumber) * 100,
            this.state.pageNumber === 0
              ? 100
              : Math.round(
                  ((this.state.correctAnswers +
                    Questions.length -
                    this.state.pageNumber) /
                    Questions.length) *
                    100
                )
          )}
        </Progress>
      </div>
    );
  }
}

export default Challenge;
