export interface CreateCourse {
  title: string;
  description: string;
  quizList: any[];
  videoUrl: string;
}

export interface RegisterCourse {
  uid: string;
  cid: string;
}
