import AsyncStorage from "@react-native-async-storage/async-storage";

const DECK_STORAGE_KEY = "FlashCards:Deck";
AsyncStorage.clear();

const initialDecks = {
  History: {
    title: "History",
    questions: [
      {
        question: "How many years did the 100 years war last?",
        answer: "116 years",
      },
      {
        question: "Which U.S. president had a home called The Hermitage?",
        answer: "Andrew Jackson",
      },
      {
        question: "What year did the War of 1812 end?",
        answer: "1815",
      },
    ],
  },
  Technology: {
    title: "Technology",
    questions: [
      {
        question: "What was the name of the first internet search engine?",
        answer: "Archie",
      },
      {
        question: "Originally Amazon only sold which product?",
        answer: "Books",
      },
      {
        question: "What does LG stand for in LG Electronics?",
        answer: "Lucky-Goldstar",
      },
    ],
  },
  Sports: {
    title: "Sports",
    questions: [
      {
        question: "Which boxer inflicted Muhammad Ali’s first defeat?",
        answer: "Joe Frazier",
      },
      {
        question: "Which country won the first World Cup in 1930?",
        answer: "Uruguay",
      },
      {
        question: "How many NBA championships did Michael Jordan win with the Chicago Bulls?",
        answer: "6",
      },
    ],
  },
};

export async function loadDecks() {
  try {
    const storedDecks = await AsyncStorage.getItem(DECK_STORAGE_KEY); // Load the saved decks from storage
    if (storedDecks === null) {
      // If none are saved then set the current decks as the static pre-defined ones
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(initialDecks));
    }
    // If none are saved then return the current decks as the static pre-defined ones
    return storedDecks ? JSON.parse(storedDecks) : initialDecks;
  } catch (error) {
    console.log(`Something went wrong...`, error);
  }
}

export async function removeDeck(deckTitle) {
  const storedDecks = await AsyncStorage.getItem(DECK_STORAGE_KEY); // Load the saved decks from storage
  // If storedDecks are found
  if (storedDecks) {
    // Parse then delete the deck with the passed deckTitle
    const decks = JSON.parse(storedDecks);
    decks[deckTitle] = undefined;
    delete decks[deckTitle];
    // Update the decks
    await AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks));
  }
}

export async function submitDeck(deckTitle) {
  // Create an empty deck object
  const deck = { title: deckTitle, questions: [] };
  // Stringify and save the deck to AsyncStorage
  await AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({ [deckTitle]: deck }));
}

export async function submitCard(deckTitle, card) {
  const storedDecks = await AsyncStorage.getItem(DECK_STORAGE_KEY); // Load the saved decks from storage
  // Parse then modify the deck with the passed deckTitle
  const decks = JSON.parse(storedDecks);
  decks[deckTitle].questions.push(card);
  // Update the decks
  await AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks));
}
