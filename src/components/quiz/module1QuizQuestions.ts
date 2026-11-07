export type QuizQuestionType = "multiple-choice" | "true-false";

export interface QuizQuestion {
  id: string;
  episode: "What Is Python?" | "Assign a Value to a Variable";
  type: QuizQuestionType;
  prompt: string;
  code?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const module1QuizQuestions: QuizQuestion[] = [
  {
    id: "m1-q1",
    episode: "What Is Python?",
    type: "multiple-choice",
    prompt: "What is Python?",
    options: [
      "A programming language",
      "A web browser",
      "A database",
      "An operating system",
    ],
    correctIndex: 0,
    explanation: "Python is a language you use to give a computer instructions.",
  },
  {
    id: "m1-q2",
    episode: "What Is Python?",
    type: "multiple-choice",
    prompt: "Why is Python a popular first language?",
    options: [
      "It reads almost like plain English",
      "It only works on phones",
      "It needs no computer",
      "It can't make mistakes",
    ],
    correctIndex: 0,
    explanation: "Simple, readable code makes it easy to start.",
  },
  {
    id: "m1-q3",
    episode: "What Is Python?",
    type: "multiple-choice",
    prompt: "What does this code show?",
    code: 'print("Hello")',
    options: ['"Hello" with the quotes', "Hello", "print Hello", "Nothing"],
    correctIndex: 1,
    explanation: "The quotes tell Python it's text. They aren't printed.",
  },
  {
    id: "m1-q4",
    episode: "What Is Python?",
    type: "true-false",
    prompt: "You must wait for a long compile step before Python shows a result.",
    options: ["True", "False"],
    correctIndex: 1,
    explanation: "Python runs your line right away and shows the result.",
  },
  {
    id: "m1-q5",
    episode: "What Is Python?",
    type: "multiple-choice",
    prompt: "Which line correctly shows text on screen?",
    options: ['Print("Hi")', 'print("Hi")', "print(Hi)", 'show("Hi")'],
    correctIndex: 1,
    explanation:
      "Python is case-sensitive, so print must be lowercase, and text needs quotes.",
  },
  {
    id: "m1-q6",
    episode: "Assign a Value to a Variable",
    type: "multiple-choice",
    prompt: "What is a variable?",
    options: [
      "A labeled box that stores a value",
      "A kind of error",
      "A way to close a program",
      "A type of chart",
    ],
    correctIndex: 0,
    explanation: "A labeled box that stores a value.",
  },
  {
    id: "m1-q7",
    episode: "Assign a Value to a Variable",
    type: "multiple-choice",
    prompt: "In x = 5, what does the = sign do?",
    code: "x = 5",
    options: [
      "Checks if x equals 5",
      "Stores 5 in x",
      "Adds 5 to x",
      "Prints 5",
    ],
    correctIndex: 1,
    explanation: 'In Python, = means "store this", not "is equal to".',
  },
  {
    id: "m1-q8",
    episode: "Assign a Value to a Variable",
    type: "multiple-choice",
    prompt: "What does this code print?",
    code: "x = 5\nx = 10\nprint(x)",
    options: ["5", "10", "15", "x"],
    correctIndex: 1,
    explanation: "The second assignment overwrites the first. The last value wins.",
  },
  {
    id: "m1-q9",
    episode: "Assign a Value to a Variable",
    type: "multiple-choice",
    prompt: "Which line stores text in a variable?",
    options: ["age = 25", "is_done = True", 'name = "Asha"', "scores = [91, 88]"],
    correctIndex: 2,
    explanation: "Text goes inside quotes.",
  },
  {
    id: "m1-q10",
    episode: "Assign a Value to a Variable",
    type: "multiple-choice",
    prompt: 'score = 92 then print("score"). What is printed?',
    code: 'score = 92\nprint("score")',
    options: ["92", "score", '"score"', "An error"],
    correctIndex: 1,
    explanation:
      'Quotes make it plain text. print(score) without quotes would open the box and show 92.',
  },
];

