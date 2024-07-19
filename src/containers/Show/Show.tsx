import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import ShowForm from '../../components/ShowForm/ShowForm';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchOneShow} from '../../store/showThunk';
import {selectorShow, selectorShowLoading} from '../../store/showsSlice';
import Spinner from '../../components/Spinner/Spinner';

const Show = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const show = useAppSelector(selectorShow);
  const loading = useAppSelector(selectorShowLoading);

  useEffect(() => {
    if(id) {
      dispatch(fetchOneShow(id));
    }
  }, [id, dispatch]);

  const dateFormat = (date: string) => {
    const showDate = new Date(date);
    return [
        showDate.getDate(),
        showDate.getMonth() + 1,
        showDate.getFullYear()
      ].join('.');
  };

  let informationShow = (
    <>
      {show &&
        <div className='d-flex mt-5 justify-content-between'>
          <div>
            {show.image?.medium && <img src={show.image.medium} alt={show.name} className="rounded"/>}
          </div>
          <div className="col-9 d-flex flex-column">
            <h1>{show.name}</h1>
            <div className='d-flex flex-column my-3'>
              {show.genres.length > 0 &&
                <p>
                <strong>Genres:</strong> {show.genres.map((genre) => (
                <span key={genre} className="me-2">{genre};</span>
              ))}
              </p>
              }
              <span className="mb-2"><strong>Language:</strong> {show.language}</span>
              <span className="mb-2"><strong>Started:</strong> {dateFormat(show.premiered)} year</span>
              <span><strong>Finished:</strong> {show.ended ? `${dateFormat(show.ended)} year` : 'Coming now'}</span>
            </div>
            <div>
              <strong>Annotation:</strong>
              <p>{show.summary ? (show.summary.replace(/<\/?[^>]+(>|$)/g, "")) : ('Abstract missing')}</p>
            </div>
          </div>
        </div>
      }
    </>
  );

  if(loading) {
    informationShow = (
      <div className='text-center'>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <ShowForm />
      {informationShow}
    </div>
  );
};

export default Show;