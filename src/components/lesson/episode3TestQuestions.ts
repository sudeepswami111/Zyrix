/**
 * Episode 3 – "Operators" coding test questions.
 *
 * Each question is self-contained data so future episodes supply their own
 * arrays without touching the SandboxTest component.
 */

import type { TestQuestion } from "@/components/lesson/episode1TestQuestions";

export const episode3TestQuestions: TestQuestion[] = [
  {
    id: "e3t1",
    prompt:
      "Asha splits 10 samosas between 4 customers. Print the exact division of 10 by 4.",
    starter: "",
    expectedOutput: "2.5",
    sourceCheck: /(^|[^/])\/([^/]|$)/,
    sourceFailMessage: "Use the single slash / division operator.",
    customFailMessage: (stdout: string, code: string) => {
      if (code.includes("//")) {
        return "// is floor division (drops decimals). Use a single slash / for exact division.";
      }
      return null;
    },
    hint: "A single slash gives the exact answer, decimals included.",
    passMessage:
      "Spot on! In Python, / always performs float division and preserves decimals.",
    failMessage:
      "Print the exact division of 10 by 4 using the / operator. Expected: 2.5",
  },
  {
    id: "e3t2",
    prompt: "Print the remainder when 17 is divided by 5.",
    starter: "",
    expectedOutput: "2",
    sourceCheck: /%/,
    sourceFailMessage: "Use the remainder (modulo) % operator.",
    customFailMessage: (stdout: string, code: string) => {
      if (stdout === "5" || /5\s*%\s*17/.test(code)) {
        return "To find the remainder when 17 is divided by 5, use 17 % 5.";
      }
      return null;
    },
    hint: "The remainder operator is %.",
    passMessage:
      "Correct! The % operator finds the remainder after dividing 17 by 5.",
    failMessage:
      "Print the remainder when 17 is divided by 5 using the % operator. Expected: 2",
  },
  {
    id: "e3t3",
    prompt: "Print 2 to the power of 10.",
    starter: "",
    expectedOutput: "1024",
    sourceCheck: /\*\*/,
    sourceFailMessage: "Use the power operator **.",
    customFailMessage: (stdout: string, code: string) => {
      if (stdout === "100" || /10\s*\*\*\s*2/.test(code)) {
        return "2 to the power of 10 is 2 ** 10 (base 2 raised to exponent 10).";
      }
      return null;
    },
    hint: "Two stars mean power.",
    passMessage:
      "Power calculation correct! ** raises a number to an exponent (2¹⁰ = 1024).",
    failMessage:
      "Print 2 to the power of 10 using the ** operator. Expected: 1024",
  },
  {
    id: "e3t4",
    prompt: "Print how many full groups of 5 fit into 17.",
    starter: "",
    expectedOutput: "3",
    sourceCheck: /\/\//,
    sourceFailMessage: "Use the floor division // operator.",
    customFailMessage: (stdout: string, code: string) => {
      if (stdout === "0" || /5\s*\/\/\s*17/.test(code)) {
        return "Divide 17 by 5 (17 // 5) to find how many groups of 5 fit into 17.";
      }
      return null;
    },
    hint: "A double slash drops the leftover and keeps the whole number.",
    passMessage:
      "Spot on! // is floor division — it drops the decimal leftover and keeps whole groups.",
    failMessage:
      "Print how many full groups of 5 fit into 17 using the // operator. Expected: 3",
  },
  {
    id: "e3t5",
    prompt: "Fix the bug so the score becomes 95.",
    starter: "score = 90\nscore =+ 5\nprint(score)",
    setupCode: "score = 90\n",
    expectedOutput: "95",
    sourceCheck: /\+=/,
    sourceFailMessage: "Use the augmented assignment operator +=.",
    customFailMessage: (stdout: string, code: string) => {
      if (stdout === "5" || code.includes("=+")) {
        return "=+ just stores +5. Swap =+ to += to add to the existing value.";
      }
      if (/score\s*=\s*score\s*\+\s*5/.test(code)) {
        return "Almost there! Use the shorthand += operator instead of score = score + 5.";
      }
      return null;
    },
    hint: "Swap =+ to +=. In Python, += means add and assign.",
    passMessage:
      "Bug fixed! += adds to the existing value and reassigns the result.",
    failMessage:
      "Change =+ to += so 5 is added to 90, making score 95.",
  },
  {
    id: "e3t6",
    prompt:
      "price is 15 and quantity is 4. Print the total using the two variables.",
    starter: "price = 15\nquantity = 4",
    setupCode: "price = 15\nquantity = 4\n",
    expectedOutput: "60",
    sourceCheck: (code: string) =>
      code.includes("price") && code.includes("quantity") && code.includes("*"),
    sourceFailMessage:
      "Make sure you multiply the price and quantity variables using *.",
    customFailMessage: (stdout: string, code: string) => {
      if (/15\s*\*\s*4/.test(code) && !/(price\s*\*\s*quantity|quantity\s*\*\s*price)/.test(code)) {
        return "Multiply the variable names (price * quantity), not the hardcoded numbers (15 * 4).";
      }
      return null;
    },
    hint: "Multiply the variable names, not the numbers.",
    passMessage:
      "Excellent! Multiplying variable names gives the dynamic total (15 * 4 = 60).",
    failMessage:
      "Print the total by multiplying the price and quantity variables. Expected: 60",
  },
];
