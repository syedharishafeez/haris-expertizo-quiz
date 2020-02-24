import React, { Component } from "react";
import Questions from "./Questions";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import LinearProgress from "@material-ui/core/LinearProgress";
import { lighten, withStyles } from "@material-ui/core/styles";
import { Progress } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { is } from "@babel/types";

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
    console.log(); // 9/10

    console.log(
      "correct = ",
      (this.state.correctAnswers / this.state.pageNumber) * 100
    );
    console.log(
      "allwrongs = ",
      (this.state.correctAnswers / Questions.length) * 100
    );
    console.log(
      "allcorrects = ",
      (this.state.correctAnswers === 0
        ? 0
        : (this.state.correctAnswers / this.state.pageNumber) * 100) -
        (this.state.correctAnswers === 0
          ? 0
          : (this.state.correctAnswers / this.state.pageNumber) * 100) +
        (this.state.correctAnswers === 0
          ? 0
          : (this.state.correctAnswers / Questions.length) * 100)
    );
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
        <Progress multi>
          {/* <Progress bar value="15"></Progress> */}

          <Progress
            bar
            color="warning"
            value={
              this.state.correctAnswers === 0
                ? 0
                : (this.state.correctAnswers / Questions.length) * 100
            }
          >
            {this.state.correctAnswers === 0
              ? 0
              : Math.round(
                  (this.state.correctAnswers / Questions.length) * 100
                )}
          </Progress>
          <Progress
            bar
            color="success"
            value={
              (this.state.correctAnswers === 0
                ? 0
                : (this.state.correctAnswers / this.state.pageNumber) * 100) -
              (this.state.correctAnswers / Questions.length) * 100
            }
          >
            {this.state.correctAnswers === 0
              ? 0
              : Math.round(
                  (this.state.correctAnswers / this.state.pageNumber) * 100
                )}
          </Progress>
          <Progress
            bar
            color="info"
            value={
              this.state.pageNumber === 0
                ? 100
                : ((this.state.correctAnswers +
                    Questions.length -
                    this.state.pageNumber) /
                    Questions.length) *
                    100 -
                  (this.state.correctAnswers / this.state.pageNumber) * 100
            }
          >
            {this.state.pageNumber === 0
              ? 100
              : Math.round(
                  ((this.state.correctAnswers +
                    Questions.length -
                    this.state.pageNumber) /
                    Questions.length) *
                    100
                )}
          </Progress>
        </Progress>
      </div>
    );
  }
}

export default Challenge;
