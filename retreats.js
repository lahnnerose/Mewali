// Quiz Variables
const questionDisplay = document.querySelector("#questions");
const answerDisplay = document.querySelector("#answer");

// Questions Arrays
const questions = [
  {
    id: 0,
    text: "Which set of pictures vibes with you more?",
    answers: [
      {
        text: "Bali Beach",
        image: "./assets/BaliBeach.jpg",
        alt: "Photos of Bali",
      },
      {
        text: "Tulum Beach",
        image: "./assets/TulumBeach.jpg",
        alt: "Photos of Bali",
      },
    ],
  },
  {
    id: 1,
    text: "Which plate would you prefer to DEVOUR?",
    answers: [
      {
        text: "Bali Food",
        image: "./assets/BaliFood.jpg",
        alt: "Photo of balinese rice based dish",
      },
      {
        text: "Mexican Food",
        image: "./assets/mexicoFood.jpg",
        alt: "Photo of mexican tacos",
      },
    ],
  },
  {
    id: 2,
    text: "Pick your night vibe",
    answers: [
      {
        text: "Tulum Night",
        image: "./assets/TulumNight.jpg",
        alt: "Photo of Mexican beach at night",
      },
      {
        text: "Bali Night",
        image: "./assets/BaliNight.jpg",
        alt: "Photo of balinese landscape at night",
      },
    ],
  },
  {
    id: 3,
    text: "Pick your mantra",
    answers: [
      {
        text: "Mexican Mantra",
        image: "./assets/TulumBike.jpg",
        alt: "Photo of a bike in Tulum with a sign saying Follow Your Dream",
      },
      {
        text: "Bali Mantra",
        image: "./assets/BaliBike.jpg",
        alt: "Photo of a man on a bike with a slogan t-shirt",
      },
    ],
  },
];
const answers = [
  {
    combination: ["Bali Beach", "Bali Food", "Bali Night"],
    text: "You're going to Bali!",
    image: "./assets/BaliLansdscape.jpg",
    alt: "Image of Bali Landscape showing temple gates",
  },
  {
    combination: ["Tulum Beach", "Mexican Food", "Tulum Night"],
    text: "You're going to Mexico!",
    image: "./assets/TulumLandscape.jpg",
    alt: "Image of Tulum Landscape",
  },
];

// need to have a default answer to compensate for lack of combination data

const unansweredQuestions = [];
const chosenAnswers = [];

const populateQuestions = () => {
  questions.forEach((question) => {
    const titleBlock = document.createElement("div");
    titleBlock.id = question.id;
    titleBlock.classList.add("title-block");
    const titleHeading = document.createElement("h2");
    titleHeading.textContent = question.text;
    titleBlock.append(titleHeading);

    questionDisplay.append(titleBlock);

    const answersBlock = document.createElement("div");
    answersBlock.id = question.id + "-questions";
    answersBlock.classList.add("answer-options");

    unansweredQuestions.push(question.id);

    question.answers.forEach((answer) => {
      const answerBlock = document.createElement("div");
      answerBlock.classList.add("answer-block");
      answerBlock.addEventListener("click", () =>
        handleClick(question.id, answer.text)
      );
      const answerImage = document.createElement("img");
      answerImage.setAttribute("src", answer.image);

      const answerTitle = document.createElement("h3");

      //   When i delete these two lines the page doesnt work?? but we dont need them?
      const answerInfo = document.createElement("p");
      const imageLink = document.createElement("a");

      answerBlock.append(answerImage, answerTitle);
      answersBlock.append(answerBlock);
    });

    questionDisplay.append(answersBlock);
  });
};

populateQuestions();

const handleClick = (questionID, chosenAnswer) => {
  if (unansweredQuestions.includes(questionID))
    chosenAnswers.push(chosenAnswer);
  const itemToRemove = unansweredQuestions.indexOf(questionID);

  if (itemToRemove > -1) {
    unansweredQuestions.splice(itemToRemove, 1);
  }
  console.log(chosenAnswers);
  console.log(unansweredQuestions);

  disableQuestionBlock(questionID, chosenAnswer);
  const lowestQuestionID = Math.min(...unansweredQuestions);
  location.href = "#" + lowestQuestionID;

  if (!unansweredQuestions.length) {
    // Scroll to answer div
    location.href = "#answer";
    showAnswer();
  }
};

// START - Show Answer Function
const showAnswer = () => {
  let result;
  answers.forEach((answer) => {
    if (
      chosenAnswers.includes(answer.combination[0]) +
      chosenAnswers.includes(answer.combination[1]) +
      chosenAnswers.includes(answer.combination[2])
    ) {
      result = answer;
    } else if (!result) {
      //first answer object is default
      result = answers[0];
    }
  });

  const answerBlock = document.createElement("div");
  answerBlock.classList.add("result-block");
  const answerTitle = document.createElement("h2");
  answerTitle.textContent = result.text;
  const answerImage = document.createElement("img");
  answerImage.setAttribute("src", result.image);
  answerImage.setAttribute("alt", result.alt);

  answerBlock.append(answerTitle, answerImage);

  answerDisplay.append(answerBlock);

  const allAnswerBlocks = document.querySelectorAll(".answer-block");
  Array.from(allAnswerBlocks).forEach((answerBlock) =>
    answerBlock.replaceWith(answerBlock.cloneNode(true))
  );
};
// END - Show Answer Function

const disableQuestionBlock = (questionId, chosenAnswer) => {
  const currentQuestionBlock = document.getElementById(
    questionId + "-questions"
  );

  Array.from(currentQuestionBlock.children).forEach((block) => {
    if (block.children.item(1).innerText !== chosenAnswer) {
      block.style.opacity = "50%";
    }
  });
};
