/**
 * Episode 1 – "What Is Python?" coding test questions.
 *
 * Each question is self-contained data so future episodes supply their own
 * arrays without touching the SandboxTest component.
 */

export interface TestQuestion {
  /** Unique stable identifier */
  id: string;
  /** Short prompt shown above the editor (plain language / Asha voice) */
  prompt: string;
  /** Starter code placed in the editor when the question loads */
  starter: string;
  /** Exact expected stdout after trimming trailing whitespace per line */
  expectedOutput: string;
  /**
   * Optional source check – a regex that must match the submitted code.
   * When present, a submission that passes the output check but fails the
   * source check is still marked failed (with the sourceFailMessage).
   */
  sourceCheck?: RegExp;
  /** Message shown when the source check fails */
  sourceFailMessage?: string;
  /**
   * When true, grading only checks that stdout is non-empty AND the source
   * check passes (used for "print your name" type questions).
   */
  anyNonEmptyOutput?: boolean;
  /** Single hint text revealed on first click */
  hint: string;
  /** One-line message shown on a correct submission */
  passMessage: string;
  /** One-line message shown on an incorrect submission */
  failMessage: string;
}

export const episode1TestQuestions: TestQuestion[] = [
  {
    id: "e1t2",
    prompt:
      "Spot the bug! Rahul sent Asha this snippet, but it crashes. Fix it so it prints: Scores analyzed!",
    starter: 'Print("Scores analyzed!")',
    expectedOutput: "Scores analyzed!",
    sourceCheck: /print\s*\(/,
    sourceFailMessage: "Python is case-sensitive — the function name must be all lowercase: print()",
    hint: "Python is case-sensitive. The function name must be lowercase: print, not Print.",
    passMessage:
      "Exactly right. Python is case-sensitive: print works, Print raises a NameError.",
    failMessage:
      'Change Print to lowercase print. The output must be exactly: Scores analyzed!',
  },
  {
    id: "e1t3",
    prompt:
      "Another bug. The code below crashes because the text is missing its quotes. Fix it so it prints: Hello World",
    starter: "print(Hello World)",
    expectedOutput: "Hello World",
    sourceCheck: /print\s*\(/,
    sourceFailMessage: "Keep the print() call — just add quotes around the text inside it.",
    hint: 'Text (strings) must be wrapped in quotes. Try: print("Hello World")',
    passMessage:
      'Strings in Python must be wrapped in quote marks — single (\') or double (") both work.',
    failMessage:
      'Add quote marks around Hello World inside print(). The output must read: Hello World',
  },
  {
    id: "e1t4",
    prompt:
      "Now make it personal. Print your own name — type it inside print() and hit Submit. Any name is fine!",
    starter: "",
    anyNonEmptyOutput: true,
    expectedOutput: "",
    sourceCheck: /print\s*\(/,
    sourceFailMessage: "Use print() to display your name.",
    hint: 'Try: print("Your Name Here") — replace the placeholder with your actual name.',
    passMessage:
      "Great! print() works with any text. You can put anything you like between the quotes.",
    failMessage:
      "Make sure your code calls print() with your name inside, and that the output isn't empty.",
  },
  {
    id: "e1t6",
    prompt:
      "Asha wants to see some numbers. Print 1, 2 and 3, each on its own line. Numbers don't need quotes — just write print(1).",
    starter: "",
    expectedOutput: "1\n2\n3",
    sourceCheck: /print\s*\(/,
    sourceFailMessage: "Use print() to display each number.",
    hint: "Numbers don't need quotes. Try print(1) for the first line.",
    passMessage:
      "Numbers work just like text in print(), only without quotes.",
    failMessage:
      "Check that 1, 2 and 3 each appear on their own line, in order.",
  },
];

