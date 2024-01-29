import {MediaItem} from '../types/DBTypes';

const MediaRow = (props: {mediaItem: MediaItem}) => {
  const item = props.mediaItem;
  return (
    <tr key={item.media_id} className="media-row">
      <td>
        <img src={item.thumbnail} alt={item.title} />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
    </tr>
  );
};

export default MediaRow;
