/**
 * Episode 4 – "Comparison and Logical Operators" coding test questions.
 *
 * Each question is self-contained data so future episodes supply their own
 * arrays without touching the SandboxTest component.
 *
 * Scope rules:
 * - No `if` statements anywhere (not taught yet).
 * - Match `and`, `or`, and `not` as whole words with boundary regexes.
 * - Match operator symbols as plain text.
 */

import type { TestQuestion } from "@/components/lesson/episode1TestQuestions";

export const episode4TestQuestions: TestQuestion[] = [
  {
    id: "e4t1",
    prompt:
      "Is the queue number 12 greater than 10? Print the answer for 12 and 10.",
    starter: "",
    expectedOutput: "True",
    sourceCheck: (code: string) => code.includes(">"),
    sourceFailMessage:
      "Put a greater-than symbol > between the two numbers inside print().",
    customFailMessage: (stdout: string, code: string) => {
      if (stdout === "False" || /12\s*<\s*10/.test(code)) {
        return "12 is greater than 10. Use > instead of <.";
      }
      return null;
    },
    hint: "Put a greater-than symbol between the two numbers inside print().",
    passMessage:
      "Spot on! The > operator compares sizes: 12 > 10 evaluates to True.",
    failMessage:
      "Print whether 12 is greater than 10 using >. Expected: True",
  },
  {
    id: "e4t2",
    prompt:
      "Asha is at gate 3, but her ticket says gate 5. Print whether 3 is not equal to 5.",
    starter: "",
    expectedOutput: "True",
    sourceCheck: (code: string) => code.includes("!="),
    sourceFailMessage:
      "Use the not-equal operator != to check if 3 and 5 are different.",
    customFailMessage: (stdout: string, code: string) => {
      if (stdout === "False" || /3\s*==\s*5/.test(code)) {
        return "Gate 3 is different from gate 5. Use != to check that they are not equal.";
      }
      return null;
    },
    hint: "Not-equal is written with an exclamation mark and an equals sign.",
    passMessage:
      "Correct! The != operator checks difference: gate 3 != 5 evaluates to True.",
    failMessage:
      "Print whether 3 is not equal to 5 using !=. Expected: True",
  },
  {
    id: "e4t3",
    prompt: "Fix the bug so Python checks whether 7 equals 7.",
    starter: "print(7 = 7)",
    expectedOutput: "True",
    sourceCheck: (code: string) => code.includes("=="),
    sourceFailMessage:
      "Use the double equals == operator to test if two things are equal.",
    customErrorMessage: (error: string) => {
      if (/SyntaxError/i.test(error)) {
        return "A single = stores a value, so Python can't use it inside print() like this. Use == to ask if two things are equal.";
      }
      return null;
    },
    customFailMessage: (stdout: string, code: string) => {
      if (stdout === "True" && !code.includes("==")) {
        return "Compare 7 and 7 using ==, rather than printing True directly.";
      }
      return null;
    },
    hint: "Use two equals signs (==) to compare two values.",
    passMessage:
      "Bug fixed! A double equals == asks if two values are equal and produces True.",
    failMessage:
      "Use == to ask if 7 equals 7. Expected: True",
  },
  {
    id: "e4t4",
    prompt:
      "Asha must be 18 or older and have a ticket. Print whether she gets in, using the two variables.",
    starter: "age = 20\nhas_ticket = True",
    setupCode: "age = 20\nhas_ticket = True\n",
    expectedOutput: "True",
    sourceCheck: (code: string) =>
      code.includes("age") &&
      code.includes("has_ticket") &&
      code.includes(">=") &&
      /\band\b/.test(code),
    sourceFailMessage:
      "Make sure your code uses age, has_ticket, >= and the word and.",
    customFailMessage: (stdout: string, code: string) => {
      if (/\bor\b/.test(code) && !/\band\b/.test(code)) {
        return "Asha must satisfy both conditions (age 18+ and a ticket). Use and instead of or.";
      }
      if (/print\s*\(\s*True\s*\)/.test(code) && (!code.includes("age") || !code.includes("has_ticket"))) {
        return "Print the result using the age and has_ticket variables, not the hardcoded word True.";
      }
      return null;
    },
    hint: "Compare age with 18 using >=, then join it with the ticket using and.",
    passMessage:
      "And needs both sides to be True: the age check and the ticket.",
    failMessage:
      "Print whether age is >= 18 and has_ticket is True using the variables. Expected: True",
  },
  {
    id: "e4t5",
    prompt:
      "A student card also works as an entry pass. Print whether Asha has a ticket or a card.",
    starter: "has_ticket = False\nhas_card = True",
    setupCode: "has_ticket = False\nhas_card = True\n",
    expectedOutput: "True",
    sourceCheck: (code: string) =>
      code.includes("has_ticket") &&
      code.includes("has_card") &&
      /\bor\b/.test(code),
    sourceFailMessage:
      "Make sure your code uses has_ticket, has_card and the word or.",
    customFailMessage: (stdout: string, code: string) => {
      if (/\band\b/.test(code) && !/\bor\b/.test(code)) {
        return "Asha only needs one of the two passes. Use or instead of and.";
      }
      if (/print\s*\(\s*True\s*\)/.test(code) && (!code.includes("has_ticket") || !code.includes("has_card"))) {
        return "Print the expression using has_ticket and has_card, not a hardcoded True.";
      }
      return null;
    },
    hint: "Or is True when at least one side is True.",
    passMessage:
      "Or is True as long as at least one condition holds true.",
    failMessage:
      "Print whether Asha has a ticket or a card using has_ticket or has_card. Expected: True",
  },
  {
    id: "e4t6",
    prompt: "Asha is on the banned list. Print the opposite of banned using not.",
    starter: "banned = True",
    setupCode: "banned = True\n",
    expectedOutput: "False",
    sourceCheck: (code: string) =>
      code.includes("banned") &&
      /\bnot\b/.test(code),
    sourceFailMessage:
      "Make sure your code uses the word not with the banned variable.",
    customFailMessage: (stdout: string, code: string) => {
      if (stdout === "True" && !/\bnot\b/.test(code)) {
        return "banned is currently True. Use the word not to flip it to False.";
      }
      if (/print\s*\(\s*False\s*\)/.test(code) && !code.includes("banned")) {
        return "Print the expression using not with the banned variable, not a hardcoded False.";
      }
      return null;
    },
    hint: "Not flips True into False. Put it right before the variable name inside print().",
    passMessage:
      "Not flips any boolean value: not True becomes False.",
    failMessage:
      "Print the opposite of banned using not banned. Expected: False",
  },
];

