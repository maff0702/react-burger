import moment from 'moment';
import 'moment/locale/ru'

const dateFormat = (date) => {
  moment.locale('ru');
  date = moment(date);

  // const day = moment(date).format('DD');
  // const daysAgo = moment().subtract('days', day).fromNow();

  let daysAgo = date.from(moment());
  const timeGreenwich = `${moment(date).format('ZZ')[0]}${moment(date).format('ZZ')[2]}`;
  const time = moment(date).format(`HH:mm i-[GMT]${timeGreenwich}`);

  if (date.format('MMMM DD YYYY') === moment().subtract(1, 'days').format('MMMM DD YYYY')
    || daysAgo === 'день назад'
  ) {
    daysAgo = 'Вчера';
  }
  if (date.format('MMMM DD YYYY') === moment().format('MMMM DD YYYY')) daysAgo = 'Сегодня';
  
  const newDate = `${daysAgo}, ${time}`;
  return newDate;
}

export default dateFormat;
