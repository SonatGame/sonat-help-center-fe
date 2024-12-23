export type Lesson = {
  _id: string;
  title: string;
  detail: string;
  googleDocUrl: string;
};

export type Chapter = {
  _id: string;
  title: string;
  description: string;
  lessons?: Lesson[];
};

export type Rating = {};

export type Comment = {};

export type Question = {
  question: string;
  answers: string[];
  correctAnswers: number[];
  explanation: string;
};

export type MiniTest = {
  name: string;
  questions: Question[];
  maxSubmissions: number;
  time: number;
};

export type Course = {
  _id: string;
  title: string;
  description: string;
  learningOutcomes: string[];
  modules: Chapter[];
  team: string;
  KSA: string;
  thumbnail: string;
  coverImage: string;
  ratings: Rating[];
  comments: Comment[];
  tests: MiniTest[];
  createdAt: string;
  updatedAt: string;
  rating: {
    rating: number;
    count: number;
  };
  learnersCount: number;
};

export type CourseRes = {
  data: Course[];
  meta: {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
};
