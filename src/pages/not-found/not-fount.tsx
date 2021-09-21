import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div >
      Упс.... <br />
      Такой страницы нет <br />
      <Link to='/'>На главную</Link>
    </div>
  );
};

export default NotFound;
