import {useEffect, useState} from 'react';
import {MediaItem, MediaItemWithOwner, User} from '../types/DBTypes';
import {fetchData} from '../lib/utils';
import {Credentials} from '../types/LocalTypes';
import {
  LoginResponse,
  MediaResponse,
  UploadResponse,
  UserResponse,
} from '../types/MessageTypes';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);

  const getMedia = async () => {
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
  };

  useEffect(() => {
    getMedia();
  }, []);

  const postMedia = (
    file: UploadResponse,
    inputs: Record<string, string>,
    token: string,
  ) => {
    // TODO: create a suitable object for Media API,
    // the type is MediaItem without media_id, user_id, thumbnail and created_at.
    // All those are generated by the API.
    const media: Omit<
      MediaItem,
      'media_id' | 'user_id' | 'thumbnail' | 'created_at'
    > = {
      title: inputs.title,
      description: inputs.description,
      filename: file.data.filename,
      filesize: file.data.filesize,
      media_type: file.data.media_type,
    };

    // TODO: post the data to Media API and get the data as MediaResponse
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(media),
    };
    // TODO: return the data
    return fetchData<MediaResponse>(
      import.meta.env.VITE_MEDIA_API + '/media',
      options,
    );
  };
  return {mediaArray, postMedia};
};

const useAuthentication = () => {
  const postLogin = async (creds: Credentials) => {
    return await fetchData<LoginResponse>(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify(creds),
        headers: {'Content-Type': 'application/json'},
      },
    );
  };
  return {postLogin};
};

const useUser = () => {
  const getUserByToken = async (token: string) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    return await fetchData<UserResponse>(
      import.meta.env.VITE_AUTH_API + '/users/token',
      options,
    );
  };

  const postUser = async (user: Record<string, string>) => {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    await fetchData<UserResponse>(
      import.meta.env.VITE_AUTH_API + '/users',
      options,
    );
  };

  return {getUserByToken, postUser};
};

const useFile = () => {
  const postFile = async (file: File, token: string) => {
    const formData = new FormData();
    formData.append('file', file);

    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    };

    return await fetchData<UploadResponse>(
      import.meta.env.VITE_UPLOAD_SERVER + '/upload',
      options,
    );
  };

  return {postFile};
};

export {useMedia, useAuthentication, useUser, useFile};
