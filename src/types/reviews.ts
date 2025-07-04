export interface Reviewer {
  name: string;
  photoUrl: string;
}

export interface GoogleReview {
  id: string;
  reviewer: Reviewer;
  rating: number;
  text: string;
  date: string;
  isVerified: boolean;
}