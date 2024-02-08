import {useEffect, useState} from 'react';
import {MediaItem, MediaItemWithOwner, User} from '../types/DBTypes';
import {fetchData} from '../lib/utils';
import {Credentials} from '../types/LocalTypes';
import {LoginResponse, UserResponse} from '../types/MessageTypes';

const useMedia = (): MediaItemWithOwner[] => {
  const [mediaArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);

  const getMedia = async () => {
    try {
      const mediaItems = await fetchData<MediaItem[]>(
        import.meta.env.VITE_MEDIA_API + '/media',
      );

      const itemsWithOwner: MediaItemWithOwner[] = await Promise.all(
        mediaItems.map(async (item) => {
          const owner = await fetchData<User>(
            import.meta.env.VITE_AUTH_API + '/users/' + item.user_id,
          );
          const itemWithOwner: MediaItemWithOwner = {
            ...item,
            username: owner.username,
          };
          return itemWithOwner;
        }),
      );

      setMediaArray(itemsWithOwner);
      console.log('mediaArray', itemsWithOwner);
    } catch (error) {
      console.error('getMedia failed', error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  return mediaArray;
};

const useAuthentication = () => {
  const postLogin = async (creds: Credentials) => {
    try {
      return await fetchData<LoginResponse>(
        import.meta.env.VITE_AUTH_API + '/auth/login',
        {
          method: 'POST',
          body: JSON.stringify(creds),
          headers: {'Content-Type': 'application/json'},
        },
      );
    } catch (error) {
      console.error('useAuthentication failed', error);
    }
  };

  return {postLogin};
};

const useUser = () => {
  const getUserByToken = async (token: string) => {
    try {
      const options = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };

      return await fetchData<UserResponse>(
        import.meta.env.VITE_AUTH_API + '/users/token',
        options,
      );
    } catch (error) {
      console.error('useUser failed', error);
    }
  };

  return {getUserByToken};
};

export {useMedia, useAuthentication, useUser};
