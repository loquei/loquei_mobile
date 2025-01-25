export interface IPostRating {
  rater_id: string
  description: string
  score: number
  item_id: string
}

export interface IGetRating {
  id: string
  rater_id: string
  description: string
  score: number
  item_id: string
  updated_at: string
  rater: {
    name: string
    photoUrl: string
  }
}