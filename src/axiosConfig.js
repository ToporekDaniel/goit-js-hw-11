export function axiosConfig(word, page) {
  return {
    params: {
      // opcje
      key: '41265249-e32640f8794e7a54bd81efaed',
      q: word,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: page,
    },
  };
}
