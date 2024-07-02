import { ElementType } from 'react';
import Joker from '../assets/deck/Group.svg';
import Cover from '../assets/deck/Group-1.svg';
import clubsA from '../assets/deck/Group-2.svg';
import spadesA from '../assets/deck/Group-3.svg';
import heartsA from '../assets/deck/Group-4.svg';
import diamondsA from '../assets/deck/Group-5.svg';
import clubsK from '../assets/deck/Group-6.svg';
import clubsQ from '../assets/deck/Group-7.svg';
import clubsJ from '../assets/deck/Group-8.svg';
import clubs8 from '../assets/deck/Group-9.svg';
import clubs9 from '../assets/deck/Group-10.svg';
import clubs10 from '../assets/deck/Group-11.svg';
import spades8 from '../assets/deck/Group-12.svg';
import spades9 from '../assets/deck/Group-13.svg';
import spades10 from '../assets/deck/Group-14.svg';
import spadesJ from '../assets/deck/Group-15.svg';
import spadesQ from '../assets/deck/Group-16.svg';
import spadesK from '../assets/deck/Group-17.svg';
import heartsK from '../assets/deck/Group-18.svg';
import heartsQ from '../assets/deck/Group-19.svg';
import heartsJ from '../assets/deck/Group-20.svg';
import hearts9 from '../assets/deck/Group-21.svg';
import hearts8 from '../assets/deck/Group-22.svg';
import hearts10 from '../assets/deck/Group-23.svg';
import diamondsK from '../assets/deck/Group-24.svg';
import diamondsQ from '../assets/deck/Group-25.svg';
import diamondsJ from '../assets/deck/Group-26.svg';
import diamonds10 from '../assets/deck/Group-27.svg';
import diamonds9 from '../assets/deck/Group-28.svg';
import diamonds8 from '../assets/deck/Group-29.svg';
import clubs6 from '../assets/deck/Group-30.svg';
import clubs7 from '../assets/deck/Group-31.svg';
import clubs3 from '../assets/deck/Group-32.svg';
import clubs4 from '../assets/deck/Group-33.svg';
import clubs5 from '../assets/deck/Group-34.svg';
import clubs2 from '../assets/deck/Group-35.svg';
import spades5 from '../assets/deck/Group-36.svg';
import spades4 from '../assets/deck/Group-37.svg';
import spades3 from '../assets/deck/Group-38.svg';
import spades6 from '../assets/deck/Group-39.svg';
import spades7 from '../assets/deck/Group-40.svg';
import spades2 from '../assets/deck/Group-41.svg';
import hearts7 from '../assets/deck/Group-42.svg';
import hearts6 from '../assets/deck/Group-43.svg';
import hearts5 from '../assets/deck/Group-44.svg';
import hearts4 from '../assets/deck/Group-45.svg';
import hearts3 from '../assets/deck/Group-46.svg';
import hearts2 from '../assets/deck/Group-47.svg';
import diamonds5 from '../assets/deck/Group-48.svg';
import diamonds4 from '../assets/deck/Group-49.svg';
import diamonds2 from '../assets/deck/Group-50.svg';
import diamonds3 from '../assets/deck/Group-51.svg';
import diamonds7 from '../assets/deck/Group-52.svg';
import diamonds6 from '../assets/deck/Group-53.svg';

const DECK_CARDS: Record<string, ElementType> = {
  joker: Joker,
  cover: Cover,
  clubsA: clubsA,
  spadesA: spadesA,
  heartsA: heartsA,
  diamondsA: diamondsA,
  clubsK: clubsK,
  clubsQ: clubsQ,
  clubsJ: clubsJ,
  clubs8: clubs8,
  clubs9: clubs9,
  clubs10: clubs10,
  spades8: spades8,
  spades9: spades9,
  spades10: spades10,
  spadesJ: spadesJ,
  spadesQ: spadesQ,
  spadesK: spadesK,
  heartsK: heartsK,
  heartsQ: heartsQ,
  heartsJ: heartsJ,
  hearts8: hearts8,
  hearts9: hearts9,
  hearts10: hearts10,
  diamondsK: diamondsK,
  diamondsQ: diamondsQ,
  diamondsJ: diamondsJ,
  diamonds8: diamonds8,
  diamonds9: diamonds9,
  diamonds10: diamonds10,
  clubs7: clubs7,
  spades7: spades7,
  hearts7: hearts7,
  diamonds7: diamonds7,
  clubs6: clubs6,
  spades6: spades6,
  hearts6: hearts6,
  diamonds6: diamonds6,
  clubs5: clubs5,
  spades5: spades5,
  hearts5: hearts5,
  diamonds5: diamonds5,
  clubs4: clubs4,
  spades4: spades4,
  hearts4: hearts4,
  diamonds4: diamonds4,
  clubs3: clubs3,
  spades3: spades3,
  hearts3: hearts3,
  diamonds3: diamonds3,
  clubs2: clubs2,
  spades2: spades2,
  hearts2: hearts2,
  diamonds2: diamonds2,
};

interface CardProps {
  variant?: string;
  className?: string;
}

export default function Card({ variant = '1', className }: CardProps) {
  const SVGComponent = DECK_CARDS[variant] || DECK_CARDS['joker'];
  return <SVGComponent className={className} />;
}
