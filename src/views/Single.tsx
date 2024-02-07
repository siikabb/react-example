import {NavigateFunction, useLocation, useNavigate} from 'react-router-dom';
import {MediaItemWithOwner} from '../types/DBTypes';

const Single = () => {
  const {state} = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const item: MediaItemWithOwner = state;

  return (
    <>
      <h3>{item.title}</h3>
      {item.media_type.includes('video') ? (
        <video controls src={item.filename}></video>
      ) : (
        <img src={item.filename} alt={item.title} />
      )}
      <p>{item.description}</p>
      <p>
        Uploaded at {new Date(item.created_at).toLocaleString('fi-FI')} by{' '}
        {item.username}
      </p>
      <p>{item.filesize}</p>
      <p>{item.media_type}</p>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Go back
      </button>
    </>
  );
};

export default Single;
