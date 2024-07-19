import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  changeName,
  selectorShowsLoading,
  selectorShowName,
  selectorShows, selectorShow, cleanShows,
} from '../../store/showsSlice';
import {fetchShows} from '../../store/showThunk';
import {Link} from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

const ShowForm = () => {
  const showName = useAppSelector(selectorShowName);
  const dispatch = useAppDispatch();
  const shows = useAppSelector(selectorShows);
  const loading = useAppSelector(selectorShowsLoading);
  const oneShow = useAppSelector(selectorShow);

  useEffect(() => {
    if(showName !== '' && showName !== oneShow?.name) {
      dispatch(fetchShows(showName));
    } else {
      dispatch(cleanShows());
    }
  }, [dispatch, showName, oneShow]);


  const changeShowName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    dispatch(changeName(value));
  };

  let showsList;

  if(loading) {
    showsList = (
      <div className='autocomplete align-items-center'>
        <Spinner />
      </div>
    );
  } else if (shows.length > 0) {
    showsList = (
      <div className="autocomplete">
        {shows.map((show) => (
          <Link to={`/shows/${show.id}`} key={show.id} className="mb-2 link-dark text-decoration-none" >{show.name}</Link>
        ))}
      </div>
    );
  }

  return (
    <div className="search-container mt-5">
      <div className="d-flex align-items-center">
        <label className="mb-0 me-4" htmlFor="name">Search for TV Show:</label>
        <input type="text" id='name' className='p-2 search-input' value={showName} onChange={changeShowName} />
      </div>
      {showsList}
    </div>
  );
};

export default ShowForm;