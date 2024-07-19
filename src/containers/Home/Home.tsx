import ShowForm from '../../components/ShowForm/ShowForm';
import {useAppDispatch} from '../../app/hooks';
import {useEffect} from 'react';
import {changeName} from '../../store/showsSlice';

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeName(''));
  }, [dispatch]);

  return (
    <>
      <ShowForm />
    </>
  );
};

export default Home;