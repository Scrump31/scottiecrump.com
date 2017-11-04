import responsiveLayout from './images/responsiveLayout.png';
import scoreboard from './images/scoreboard.png';
import calculator from './images/calculator.png';
import hardyandkeith from './images/Hardy-and-Keith.png';
import randomQuotes from './images/randomQuotes.png';
import goyt from './images/goyt.png';

const MyProjects = [
  {
    name: 'HERSOG Layout',
    description: 'A web design I took and built into a responsive layout. Technologies used: React, Webpack2, Babel, and SASS.',
    image: responsiveLayout,
    link: 'http://coordinated-wind.surge.sh/',
    code: 'https://github.com/Scrump31/hersog-clone',
  },
  {
    name: 'Hardy & Keith LLC',
    description: 'An e-commerence business offering night life services. Technologies used: Wordpress, WooCommerece',
    image: hardyandkeith,
    link: 'https://hardyandkeith.com/',
    code: 'https://hardyandkeith.com/',
  },
  {
    name: 'Refactored Layout',
    description: 'Refactored About and Signup pages for a local startup company resulting in enhanced user experience (UX) and responsive design. Technologies used: Angular, SASS, and Bootstrap.',
    image: goyt,
    link: 'https://goyt.com/signup',
    code: 'https://goyt.com/signup',
  },
  {
    name: 'Scoreboard',
    description: 'An app used to keep track of player scores. Has a countdown timer and auto updates total scores. Technologies used: Create-React-App, Redux, Reactstrap, and Lodash.',
    image: scoreboard,
    link: 'https://scrump31.github.io/scoreboard/',
    code: 'https://github.com/Scrump31/scoreboard',
  },
  {
    name: 'Javascript Calculator',
    description: 'A functional calculator. Technologies used: Angular, Sass, and the math.js library.',
    image: calculator,
    link: 'https://codepen.io/CrumpDev31/full/xEYbBk',
    code: 'https://github.com/Scrump31/JavascriptCalculator',
  },
  {
    name: 'Random Quote App',
    description: 'An app that displays random quotes. Users can also share quotes via Twitter. Technologies used: Angular and Twitter API.',
    image: randomQuotes,
    link: 'https://codepen.io/CrumpDev31/full/PzoKMo',
    code: 'https://codepen.io/CrumpDev31/pen/PzoKMo',
  },
];

export default MyProjects;
