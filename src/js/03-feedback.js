import throttle from 'lodash.throttle';

const emailData = document.querySelector('input[name="email"]');
const messageData = document.querySelector('textarea[name="message"]');
const form = document.querySelector('.feedback-form');

const autosave = () => {
  const data = {
    email: emailData.value,
    message: messageData.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(data));
  console.log(data);
};

const load = () => {
  const savedData = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (savedData) {
    emailData.value = savedData.email;
    messageData.value = savedData.message;
  } else {
    emailData.value = '';
    messageData.value = '';
  }
};

emailData.addEventListener('input', throttle(autosave, 500));
messageData.addEventListener('input', throttle(autosave, 500));

load();

form.addEventListener('submit', event => {
  event.preventDefault();
  localStorage.removeItem('feedback-form-state');

  console.log('Zapisane dane: ', {
    email: emailData.value,
    message: messageData.value,
  });

  emailData.value = '';
  messageData.value = '';
});
