import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');

const player = new Player(iframe);

player.on(
  'timeupdate',
  throttle(time => {
    localStorage.setItem(
      'videoplayer-current-time',
      JSON.stringify(time.seconds)
    );
    console.log('update czasu ', time.seconds);
  }, 1000)
);

window.addEventListener('DOMContentLoaded', () => {
  const savedTime = JSON.parse(
    localStorage.getItem('videoplayer-current-time')
  );
  if (savedTime !== null && savedTime !== undefined) {
    player.setCurrentTime(savedTime);
  }
});
