import { Answer } from "./Answer"

export class Question{
  constructor(
    Number:number,
    QuestionText: string,
    Answers: Answer[]
  ){
    this.Number = Number
    this.QuestionText = QuestionText
    this.Answers = Answers
  }

  Number:number
  QuestionText: string
  Answers: Answer[]
}
