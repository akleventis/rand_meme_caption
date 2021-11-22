/* eslint-disable jsx-a11y/anchor-is-valid */
import './App.css';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { imgQuery, sleep } from './api/query.js';
import memeIDs from './memeIDs.json';

const App = () => {
  const [img, setImg] = useState('');
  const [caption, setCaption] = useState('Caption me!');
  const [clickCount, setClickCount] = useState(0);
  const [imageArr, setimageArr] = useState([...memeIDs]);
  const [title, setTitle] = useState('this app > la clubs on a weekend')
  const { register, handleSubmit } = useForm();

  const title1 = () => {
    setTitle("Burk and Toop");
  }
  const title2 = () => {
    setTitle("Just hit the fadeaway");
  }
  const sounds = [
    new Audio('/assets/audio/p3.mp3'),
    new Audio('/assets/audio/p5.mp3'),
  ];

  useEffect(() => {
    const randId = Math.floor(Math.random() * imageArr.length);

    const queryObject = {
      username: 'alex.leventis',
      password: 'Imgflip@1905',
      text0: caption.length ? caption : 'Caption me!',
      template_id: imageArr[randId],
    };

    imageArr.splice(randId, 1);
    imageArr.length === 0 && setimageArr([...memeIDs]);

    imgQuery(queryObject).then((img) => setImg(img));

    clickCount && sounds[Math.floor(Math.random() * sounds.length)].play();

    sleep(2500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickCount]);

  const onSubmit = (data) => {
    setCaption(data.caption);
    setClickCount((clickCount) => clickCount + 1);
  };

  return (
    <div className="background">
      <header>
      <h1><a onClick={title1}>🐳</a> {title} <a onClick={title2}>🐳</a></h1>
      </header>
      <div className="container">
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <input placeholder="caption" {...register('caption')} />
          <button type="submit">SwAg</button>
        </form>
        {img.length ? <img src={img} alt={caption} /> : ''}
      </div>
    </div>
  );
};

export default App;
