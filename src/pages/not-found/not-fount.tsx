import { FC } from 'react';
import { Link } from 'react-router-dom';

const NotFound: FC = () => (
  <div >
    Упс.... <br />
    Такой страницы нет <br />
    <Link to='/'>На главную</Link>
  </div>
);

export default NotFound;
