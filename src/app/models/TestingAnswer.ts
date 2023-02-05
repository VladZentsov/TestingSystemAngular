import { Answer } from "./Answer"

export class TestingAnswer{
  constructor(
    TestId:string,
    Answers: Answer[]
  ){
    this.TestId = TestId
    this.Answers = Answers
  }

  TestId:string
  Answers: Answer[]
}
