import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs';
import { Answer } from '../models/Answer';
import { Question } from '../models/Question';
import { ResultModel } from '../models/ResultModel';
import { Test } from '../models/Test';
import { TestingAnswer } from '../models/TestingAnswer';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-testing-page',
  templateUrl: './testing-page.component.html',
  styleUrls: ['./testing-page.component.scss']
})
export class TestingPageComponent implements OnInit {

  test?:Test
  currentQuestionIndex = 0
  currentQuestion?: Question
  myAnswers?:TestingAnswer
  currentSelectedAnswer?: Answer
  result?:ResultModel
  isTestComplete?: boolean

  answers?: Answer[]

  constructor(private route: ActivatedRoute, private testService:TestService) { }

  ngOnInit(): void {
    this.isTestComplete = false
    this.route.params.pipe(switchMap((params: Params)=>this.testService.getTest(params['id']))).subscribe(
      test=>{
        this.test = test
        this.currentQuestion = test.Questions[0]
      }
    )
  }

  nextQuestion():Question{
    if(this.checkNextQuestion()&&this.currentSelectedAnswer!=undefined){
      this.currentQuestionIndex+=1

      this.addMyAnswer()

      this.currentQuestion = this.test?.Questions[this.currentQuestionIndex]
    }

    return this.currentQuestion!
  }

  checkNextQuestion():boolean{
    if(this.currentQuestionIndex+1 < this.test!.Questions.length){
      return true
    } else{
      return false
    }
  }

  finishTest(){
    this.addMyAnswer()
    this.checkResults()
    this.isTestComplete = true
  }

  addMyAnswer(){
    if(this.myAnswers == undefined){
      this.answers = [this.currentSelectedAnswer!]
      this.myAnswers = new TestingAnswer(this.test!.Id, this.answers!)
    }else{
      this.myAnswers?.Answers.push(this.currentSelectedAnswer!)
    }

    this.currentSelectedAnswer = undefined
  }


  checkResults(){
    this.testService.checkResults(this.myAnswers!).subscribe(
      response => {
        this.result = response
      }
    )
  }


  isQuestionSelected():boolean{
    if(this.currentSelectedAnswer==undefined){
      return false
    } else{
      return true
    }
  }

}
