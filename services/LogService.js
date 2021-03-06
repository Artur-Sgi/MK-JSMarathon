import { getRandom, getCurrentTime } from './HelpersService.js';

const logs = {
  start:
    'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
  end: [
    '[time] - Результат удара [playerWins]: [playerLose] - труп',
    '[time] - [playerLose] погиб от удара бойца [playerWins]',
    '[time] - Результат боя: [playerLose] - жертва, [playerWins] - убийца',
  ],
  hit: [
    '[time] - [playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага: -[hp], [[hpLeft]/100]',
    '[time] - [playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника: -[hp], [[hpLeft]/100]',
    '[time] - [playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента: -[hp], [[hpLeft]/100]',
    '[time] - [playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента: -[hp], [[hpLeft]/100]',
    '[time] - [playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента: -[hp], [[hpLeft]/100]',
    '[time] - [playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага: -[hp], [[hpLeft]/100]',
    '[time] - [playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника: -[hp], [[hpLeft]/100]',
    '[time] - [playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника: -[hp], [[hpLeft]/100]',
    '[time] - [playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника: -[hp], [[hpLeft]/100]',
    '[time] - [playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника: -[hp], [[hpLeft]/100]',
    '[time] - [playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника: -[hp], [[hpLeft]/100]',
    '[time] - [playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага: -[hp], [[hpLeft]/100]',
    '[time] - [playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента: -[hp], [[hpLeft]/100]',
    '[time] - [playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника: -[hp], [[hpLeft]/100]',
    '[time] - [playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента: -[hp], [[hpLeft]/100]',
    '[time] - [playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента: -[hp], [[hpLeft]/100]',
    '[time] - [playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника: -[hp], [[hpLeft]/100]',
    '[time] - [playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага: -[hp], [[hpLeft]/100]',
  ],
  defence: [
    '[time] - [playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу. Успешная защита смягчила удар: -[hp], [[hpLeft]/100]',
    '[time] - [playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь. Успешная защита смягчила удар: -[hp], [[hpLeft]/100]',
    '[time] - [playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке. Успешная защита смягчила удар: -[hp], [[hpLeft]/100]',
    '[time] - [playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь. Успешная защита смягчила удар: -[hp], [[hpLeft]/100]',
    '[time] - [playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку. Успешная защита смягчила удар: -[hp], [[hpLeft]/100]',
    '[time] - [playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют. Успешная защита смягчила удар: -[hp], [[hpLeft]/100]',
    '[time] - [playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение. Успешная защита смягчила удар: -[hp], [[hpLeft]/100]',
  ],
  draw: '[time] - Ничья - это тоже победа!',
};

const $chat = document.querySelector('.chat');

const attachLog = text => {
  const el = `<p>${text}</p>`;
  $chat.insertAdjacentHTML('afterbegin', el);
};

const generateActionText = (attackResult, name1, name2, hp2) => {
  const type = attackResult.type;
  const randomLogId = getRandom(logs[type].length - 1);
  const text = logs[type][randomLogId]
    .replace('[playerKick]', name1)
    .replace('[playerDefence]', name2)
    .replace('[time]', getCurrentTime())
    .replace('[hp]', attackResult.value)
    .replace('[hpLeft]', hp2);

  return text;
};

const generateStartText = (name1, name2) => {
  const text = logs['start']
    .replace('[player1]', name1)
    .replace('[player2]', name2)
    .replace('[time]', getCurrentTime());

  return text;
};

const generateEndText = (winnerName, loserName) => {
  const randomLogId = getRandom(logs['end'].length - 1);
  const text = logs['end'][randomLogId]
    .replace('[playerWins]', winnerName)
    .replace('[playerLose]', loserName)
    .replace('[time]', getCurrentTime());

  return text;
};

const generateDrawText = () => logs['draw'].replace('[time]', getCurrentTime());

const generateLog = (
  attackResult,
  { name1 },
  { name: name2, hp: hp2 },
  winnerName = null
) => {
  const type =
    typeof attackResult === 'string' ? attackResult : attackResult.type;

  let text;
  switch (type) {
    case 'start':
      text = generateStartText(name1, name2);
      break;
    case 'hit':
    case 'defence':
      text = generateActionText(attackResult, name1, name2, hp2);
      break;
    case 'end':
      const loserName = winnerName === name1 ? name2 : name1;
      text = generateEndText(winnerName, loserName);
      break;
    case 'draw':
      text = generateDrawText();
      break;
    default:
      text = 'No avaliable variants!';
  }

  attachLog(text);
};

export { generateLog };
