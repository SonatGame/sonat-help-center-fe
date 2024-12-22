export type Lesson = {
  _id: string;
  title: string;
  description: string;
  googleDocsUrl: string;
};

export type Chapter = {
  _id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

export type Rating = {};

export type Comment = {};

export type MiniTest = {};

export type Course = {
  _id: string;
  title: string;
  description: string;
  learningOutcomes: string[];
  modules: Chapter[];
  team: string;
  KSA: string;
  thumbnailUrl: string;
  coverImageUrl: string;
  ratings: Rating[];
  comments: Comment[];
  tests: MiniTest[];
  createdAt: string;
  updatedAt: string;
  rating: {
    rating: number;
    count: number;
  };
};
