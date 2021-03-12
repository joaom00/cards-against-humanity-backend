import whiteCards from '../cards/white';
import blackCards from '../cards/black';

interface Deck {
  room: string;
  whiteDeck: string[];
  blackDeck: string[];
}

const decks = [] as Deck[];

export const createDeckOfRoom = (room: string) => {
  const deck = {
    room,
    whiteDeck: [...whiteCards],
    blackDeck: [...blackCards],
  };

  decks.push(deck);

  return decks;
};

export const deckAlreadyExists = (room: string) =>
  decks.some((deck) => deck.room === room);

export const pickFourWhiteCards = (room: string) => {
  const roomDeck = decks.find((deck) => deck.room === room);
  const fourCards = [];

  if (roomDeck) {
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(
        Math.random() * roomDeck.whiteDeck.length - 1
      );
      const card = roomDeck.whiteDeck.splice(randomIndex, 1)[0];
      fourCards.push(card);
    }

    return fourCards;
  }
};

export const pickOneWhiteCard = (room: string) => {
  const roomDeck = decks.find((deck) => deck.room === room);

  if (roomDeck) {
    const randomIndex = Math.floor(Math.random() * roomDeck.whiteDeck.length);

    const whiteCard = roomDeck.whiteDeck.splice(randomIndex, 1)[0];

    return whiteCard;
  }
};

export const pickOneBlackCard = (room: string) => {
  const roomDeck = decks.find((deck) => deck.room === room);

  if (roomDeck) {
    const randomIndex = Math.floor(Math.random() * roomDeck.blackDeck.length);

    const blackCard = roomDeck.blackDeck.splice(randomIndex, 1)[0];

    return blackCard;
  }
};
