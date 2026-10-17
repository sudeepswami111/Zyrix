import React from "react";
import { StoryChapter } from "@/components/lesson/previews/StoryPreview";
import { QuizQuestion } from "@/components/lesson/previews/QuizPreview";

export const EPISODE_2_STARTER_CODE = `# Episode 2: Assign a Value to a Variable
# Step 1: Store a number inside a variable named 'score'
score = 92
print("Asha's initial score is:", score)

# Step 2: Variables can change! Overwrite the box with a new value
score = 100
print("Updated score after re-grading:", score)

# Step 3: Python doesn't care what goes inside - try text and booleans
learner = "Asha"
is_passing = True
print("Student:", learner, "| Passed:", is_passing)
`;

export const EPISODE_2_STORY_CHAPTERS: StoryChapter[] = [
  {
    id: "e2-chap-1",
    number: "01",
    title: "A Name for Everything",
    subtitle: "Why typing raw numbers quickly stops working",
    sceneLabel: "Scene 01: The Labeled Box",
    progressByline: "Chapter 1 of 3 • Naming Memory",
    readTime: "1 min read",
    content: (
      <div className="space-y-3.5 text-xs sm:text-sm sm:leading-relaxed text-[#2B2521]">
        <p>
          In Episode 1, Asha celebrated running her very first line of code:{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-[#F1E2CF] text-[#8C3A20]">
            print(&quot;Exam scores analyzed!&quot;)
          </code>
          . But as she sat down with her laptop the next evening, a practical
          problem struck her: she had thirty student test scores to calculate,
          and typing raw numbers like 92 directly into every print statement was
          brittle.
        </p>
        <p>
          She wanted Python to remember a calculation so she could reuse it
          three lines later. That&apos;s when she typed{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-[#F1E2CF] text-[#8C3A20]">
            score = 92
          </code>
          . Suddenly, the number wasn&apos;t just floating in the void — it had
          a sticky label on it.
        </p>
      </div>
    ),
  },
  {
    id: "e2-chap-2",
    number: "02",
    title: "The Equals Sign Lie",
    subtitle: "In math it means equality; in Python it means 'store'",
    sceneLabel: "Scene 02: Assignment Semantics",
    progressByline: "Chapter 2 of 3 • The Store Command",
    readTime: "1 min read",
    content: (
      <div className="space-y-3.5 text-xs sm:text-sm sm:leading-relaxed text-[#2B2521]">
        <p>
          In algebra class, Asha remembered seeing statements like{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-[#F1E2CF] text-[#8C3A20]">
            x = x + 1
          </code>{" "}
          and thinking it was impossible nonsense. But Python isn&apos;t doing
          algebraic balance checks.
        </p>
        <p>
          The single equals sign{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-[#F1E2CF] text-[#8C3A20]">
            =
          </code>{" "}
          is an active arrow: it takes whatever value is on the right-hand side,
          creates it in memory, and points the name on the left-hand side right
          at it. When Asha later typed{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-[#F1E2CF] text-[#8C3A20]">
            score = 100
          </code>
          , the old 92 simply detached. The box now held 100.
        </p>
      </div>
    ),
  },
  {
    id: "e2-chap-3",
    number: "03",
    title: "Opening the Box",
    subtitle: "The subtle difference between 'score' and score",
    sceneLabel: "Scene 03: Printing What's Inside",
    progressByline: "Chapter 3 of 3 • Dereferencing Names",
    readTime: "1 min read",
    content: (
      <div className="space-y-3.5 text-xs sm:text-sm sm:leading-relaxed text-[#2B2521]">
        <p>
          Asha made her first classic syntax misstep: she wrote{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-[#F1E2CF] text-[#8C3A20]">
            print(&quot;score&quot;)
          </code>{" "}
          and the terminal printed the literal word{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-[#F1E2CF] text-[#8C3A20]">
            score
          </code>
          .
        </p>
        <p>
          Quotes tell Python: <em>&ldquo;Treat this as plain text characters.&rdquo;</em>{" "}
          Without quotes,{" "}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-[#F1E2CF] text-[#8C3A20]">
            print(score)
          </code>{" "}
          tells Python: <em>&ldquo;Go find the box labeled score, open it, and hand me whatever is inside.&rdquo;</em>{" "}
          When the screen lit up with <strong>100</strong>, Asha grinned. Her program
          had memory.
        </p>
      </div>
    ),
    closingTeaser:
      "Asha has mastered variables. Next in Episode 3, she'll discover what happens when she combines numbers with text — and why Python draws a strict line between data types.",
  },
];

export const EPISODE_2_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    conceptCategory: "Assignment Operator",
    question: "What does the single equals sign (=) mean in Python line: x = 5?",
    options: [
      {
        id: "1A",
        letter: "A",
        text: "It checks whether x and 5 are equal and returns True or False.",
        isCorrect: false,
        explanation: "Equality testing in Python uses the double equals sign (==). A single = is assignment.",
      },
      {
        id: "1B",
        letter: "B",
        text: "It stores the value 5 into a variable named x.",
        isCorrect: true,
        explanation: "The single equals sign is the assignment operator: it stores or binds the right-hand value to the left-hand name.",
      },
      {
        id: "1C",
        letter: "C",
        text: "It permanently locks x so it can never be changed again.",
        isCorrect: false,
        explanation: "Variables in Python can be reassigned freely; they are not locked constants by default.",
      },
      {
        id: "1D",
        letter: "D",
        text: "It creates a math equation to be solved algebraically.",
        isCorrect: false,
        explanation: "Python does not solve algebraic equations on assignment; it executes a one-way store operation.",
      },
    ],
  },
  {
    id: 2,
    conceptCategory: "Variable Reassignment",
    question: "What will print after running: x = 5 followed by x = 10, then print(x)?",
    options: [
      {
        id: "2A",
        letter: "A",
        text: "5",
        isCorrect: false,
        explanation: "5 was overwritten when x = 10 was executed.",
      },
      {
        id: "2B",
        letter: "B",
        text: "15",
        isCorrect: false,
        explanation: "Reassignment does not add numbers together; it overwrites the existing value.",
      },
      {
        id: "2C",
        letter: "C",
        text: "10",
        isCorrect: true,
        explanation: "Variables store the most recent value assigned to them. Assigning 10 replaces the previous value 5.",
      },
      {
        id: "2D",
        letter: "D",
        text: "An error stating that x has already been defined.",
        isCorrect: false,
        explanation: "Python allows reassignment at any time without raising any error.",
      },
    ],
  },
  {
    id: 3,
    conceptCategory: "Quotes vs Identifiers",
    question: "If score = 92, what is the output of print(\"score\") with quotation marks?",
    options: [
      {
        id: "3A",
        letter: "A",
        text: "92",
        isCorrect: false,
        explanation: "Quotes tell Python to treat 'score' as literal text, not as a variable lookup.",
      },
      {
        id: "3B",
        letter: "B",
        text: "score",
        isCorrect: true,
        explanation: "Quotation marks define a string literal. Python prints the exact word score, ignoring any variable with that name.",
      },
      {
        id: "3C",
        letter: "C",
        text: "SyntaxError: Unexpected quotes",
        isCorrect: false,
        explanation: "print(\"score\") is completely valid Python; it just prints the literal word.",
      },
      {
        id: "3D",
        letter: "D",
        text: "None",
        isCorrect: false,
        explanation: "It will print the text string 'score' followed by a newline.",
      },
    ],
  },
  {
    id: 4,
    conceptCategory: "Dynamic Typing",
    question: "Does Python require you to specify a variable's type (like 'int x = 5') before using it?",
    options: [
      {
        id: "4A",
        letter: "A",
        text: "Yes, Python requires explicit type declarations for every variable.",
        isCorrect: false,
        explanation: "Languages like C or Java require explicit types, but Python is dynamically typed.",
      },
      {
        id: "4B",
        letter: "B",
        text: "No, Python infers the type automatically from the value being assigned.",
        isCorrect: true,
        explanation: "Python determines the type of an object automatically at runtime. You simply write name = value.",
      },
      {
        id: "4C",
        letter: "C",
        text: "Only for strings and lists, but not for numbers.",
        isCorrect: false,
        explanation: "No data type in Python requires mandatory type declarations upon variable creation.",
      },
      {
        id: "4D",
        letter: "D",
        text: "Only inside functions.",
        isCorrect: false,
        explanation: "Python uses dynamic typing everywhere, both at module scope and within functions.",
      },
    ],
  },
  {
    id: 5,
    conceptCategory: "Naming Rules",
    question: "Which of the following is an INVALID variable name in Python?",
    options: [
      {
        id: "5A",
        letter: "A",
        text: "student_score",
        isCorrect: false,
        explanation: "Lowercase letters with underscores (snake_case) is standard and valid.",
      },
      {
        id: "5B",
        letter: "B",
        text: "score_2",
        isCorrect: false,
        explanation: "Numbers are allowed anywhere in a variable name except at the very start.",
      },
      {
        id: "5C",
        letter: "C",
        text: "2_score",
        isCorrect: true,
        explanation: "In Python, variable names cannot start with a digit. 2_score causes a SyntaxError.",
      },
      {
        id: "5D",
        letter: "D",
        text: "_score",
        isCorrect: false,
        explanation: "Starting with an underscore is valid Python syntax.",
      },
    ],
  },
  {
    id: 6,
    conceptCategory: "Case Sensitivity",
    question: "Are Age and age considered the same variable in Python?",
    options: [
      {
        id: "6A",
        letter: "A",
        text: "Yes, Python ignores capitalization in variable names.",
        isCorrect: false,
        explanation: "Python is strictly case-sensitive. Age and age are two completely distinct variables.",
      },
      {
        id: "6B",
        letter: "B",
        text: "No, Python is case-sensitive, so Age and age are two completely separate variables.",
        isCorrect: true,
        explanation: "Because Python is case-sensitive, age, Age, and AGE refer to three completely different memory locations.",
      },
      {
        id: "6C",
        letter: "C",
        text: "Only on Windows operating systems.",
        isCorrect: false,
        explanation: "Python language semantics are identical across all operating systems.",
      },
      {
        id: "6D",
        letter: "D",
        text: "Only if declared in the same line.",
        isCorrect: false,
        explanation: "They are always separate identifiers in Python.",
      },
    ],
  },
  {
    id: 7,
    conceptCategory: "Undefined Variables",
    question: "What error occurs if you try to print(mystery) before assigning any value to mystery?",
    options: [
      {
        id: "7A",
        letter: "A",
        text: "TypeError",
        isCorrect: false,
        explanation: "TypeError happens when an operation is performed on an inappropriate type.",
      },
      {
        id: "7B",
        letter: "B",
        text: "NameError",
        isCorrect: true,
        explanation: "Python raises a NameError: name 'mystery' is not defined because the identifier does not exist in any namespace.",
      },
      {
        id: "7C",
        letter: "C",
        text: "ValueError",
        isCorrect: false,
        explanation: "ValueError happens when an argument has the right type but an inappropriate value.",
      },
      {
        id: "7D",
        letter: "D",
        text: "Python automatically prints 0 for unassigned variables.",
        isCorrect: false,
        explanation: "Unlike some languages, Python never creates default zero/null values for undefined names.",
      },
    ],
  },
  {
    id: 8,
    conceptCategory: "Multiple Types in One Box",
    question: "What happens if you run: val = 42 followed by val = \"forty-two\"?",
    options: [
      {
        id: "8A",
        letter: "A",
        text: "A runtime error because you cannot change a variable's data type.",
        isCorrect: false,
        explanation: "Python variables are just labels pointing to objects. You can reassign a variable to an object of any type.",
      },
      {
        id: "8B",
        letter: "B",
        text: "Python successfully stores the text \"forty-two\" in val.",
        isCorrect: true,
        explanation: "Types belong to values, not to variable names. The variable val can point to an integer and later to a string.",
      },
      {
        id: "8C",
        letter: "C",
        text: "Python converts the string into the number 42.",
        isCorrect: false,
        explanation: "Python does not convert the string; it simply binds val to the new string object.",
      },
      {
        id: "8D",
        letter: "D",
        text: "val becomes a list containing both [42, \"forty-two\"].",
        isCorrect: false,
        explanation: "Reassignment overwrites the reference; it does not append values into a list.",
      },
    ],
  },
  {
    id: 9,
    conceptCategory: "Copying Values",
    question: "Given a = 5 and b = a. If you then do a = 10, what is the value of b?",
    options: [
      {
        id: "9A",
        letter: "A",
        text: "10, because b stays linked to a forever.",
        isCorrect: false,
        explanation: "b was bound to the integer 5. Reassigning a to 10 changes where a points, not where b points.",
      },
      {
        id: "9B",
        letter: "B",
        text: "5, because b still points to the value 5.",
        isCorrect: true,
        explanation: "b = a means b points to the object that a was pointing to (5). Changing a later does not alter b.",
      },
      {
        id: "9C",
        letter: "C",
        text: "None",
        isCorrect: false,
        explanation: "b holds the valid integer 5.",
      },
      {
        id: "9D",
        letter: "D",
        text: "SyntaxError",
        isCorrect: false,
        explanation: "This is standard, valid Python code.",
      },
    ],
  },
  {
    id: 10,
    conceptCategory: "Mental Model",
    question: "Which mental model best describes variables in Python?",
    options: [
      {
        id: "10A",
        letter: "A",
        text: "Hardcoded slots carved into hardware silicon that can never be moved.",
        isCorrect: false,
        explanation: "Python variables are dynamic references, not rigid hardware memory offsets.",
      },
      {
        id: "10B",
        letter: "B",
        text: "Named sticky labels attached to objects floating in memory.",
        isCorrect: true,
        explanation: "In Python, variables are names pointing to objects in memory. When you assign, you move the sticky label to a new object.",
      },
      {
        id: "10C",
        letter: "C",
        text: "Print commands that send output directly to the user.",
        isCorrect: false,
        explanation: "Variables store references; print() is what displays output.",
      },
      {
        id: "10D",
        letter: "D",
        text: "Equations that continuously recompute whenever other numbers change.",
        isCorrect: false,
        explanation: "Python statements execute sequentially once, unlike spreadsheet formula cells.",
      },
    ],
  },
];
