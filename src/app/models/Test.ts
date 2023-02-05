import { Question } from "./Question"

export class Test{
  constructor(
    Id: string,
    Name:string,
    Description: string,
    Questions: Question[]
  ){
    this.Id = Id
    this.Name = Name
    this.Description = Description
    this.Questions = Questions
  }

  Id:string
  Name:string
  Description: string
  Questions: Question[]
}
