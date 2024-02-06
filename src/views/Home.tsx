import {MediaItem, MediaItemWithOwner} from '../types/DBTypes';
import MediaRow from '../components/MediaRow';
import {useEffect, useState} from 'react';
import {fetchData} from '../lib/utils';

const Home = () => {
  const [mediaArray, setMediaArray] = useState<MediaItem[]>([]);

  const getMedia = async () => {
    try {
      const data = await fetchData<MediaItem[]>(
        import.meta.env.VITE_MEDIA_API + '/media',
      );

      const dataWithOwner: MediaItemWithOwner = await Promise.all(
        data.map((item) => {
          const username = fetchData(
            import.meta.VITE_AUTH_API + '/users/' + item.user_id,
          );
          const itemWithOwner: MediaItemWithOwner = {username, ...item};
          // TODO: fix this!!!
        }),
      );

      setMediaArray(data);
    } catch (error) {
      console.error('getMedia failed', error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  return (
    <>
      <h2>My art</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow key={item.media_id} item={item} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
