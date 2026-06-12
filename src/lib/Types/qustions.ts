export interface IQuestionsResponse {
  code: number
  payload: {
    questions: Question[]
  }
}

export interface Question {
  id: string
  text: string
  examId: string
  answers: Answer[]
  createdAt: string
  updatedAt: string
  immutable: boolean
}

export interface Answer {
  id: string
  text: string
}