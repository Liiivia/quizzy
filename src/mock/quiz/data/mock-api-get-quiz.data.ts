/* eslint-disable quotes */
import { ApiGetQuiz } from '@quiz/domain/typing/models/api-get-quiz.model';


export const mockApiGetQuiz: ApiGetQuiz = {
  "response_code": 0,
  "results": [{
    "category": "Entertainment: Comics",
    "type": "multiple",
    "difficulty": "easy",
    "question": "Who is Batman?",
    "correct_answer": "Bruce Wayne",
    "incorrect_answers": ["Clark Kent", "Barry Allen", "Tony Stark"],
    "merged_answers": ["Bruce Wayne", "Barry Allen", "Tony Stark", "Clark Kent"],
    "correct_answer_index": 0
  }, {
    "category": "Entertainment: Comics",
    "type": "multiple",
    "difficulty": "easy",
    "question": "What is the alter-ego of the DC comics character &quot;Superman&quot;?",
    "correct_answer": "Clark Kent",
    "incorrect_answers": ["Bruce Wayne", "Arthur Curry", "John Jones"],
    "merged_answers": ["Arthur Curry", "Clark Kent", "Bruce Wayne", "John Jones"],
    "correct_answer_index": 1
  }, {
    "category": "Entertainment: Comics",
    "type": "multiple",
    "difficulty": "easy",
    "question": "In Black Hammer, what city did the heroes save from the Anti-God?",
    "correct_answer": "Spiral City",
    "incorrect_answers": ["Mega-City One", "Rockwood", "Star City"],
    "merged_answers": ["Star City", "Mega-City One", "Rockwood", "Spiral City"],
    "correct_answer_index": 3
  }, {
    "category": "Entertainment: Comics",
    "type": "multiple",
    "difficulty": "easy",
    "question": "What's the race of Invincible's father?",
    "correct_answer": "Viltrumite",
    "incorrect_answers": ["Kryptonian", "Kree", "Irken"],
    "merged_answers": ["Viltrumite", "Irken", "Kree", "Kryptonian"],
    "correct_answer_index": 0
  }, {
    "category": "Entertainment: Comics",
    "type": "multiple",
    "difficulty": "easy",
    "question": "Which one of these superhero teams appears in the Invincible comics?",
    "correct_answer": "Guardians of the Globe",
    "incorrect_answers": ["Avengers", "Justice League", "Teenage Mutant Ninja Turtles"],
    "merged_answers": ["Justice League", "Avengers", "Teenage Mutant Ninja Turtles", "Guardians of the Globe"],
    "correct_answer_index": 0
  }]
};
