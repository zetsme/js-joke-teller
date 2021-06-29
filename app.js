const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

const tellMe = (joke) => {
  VoiceRSS.speech({
    key: '7d196c5a16644d1ebaebf7e92d213d89',
    src: joke,
    hl: 'en-gb',
    v: 'Alice',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
};

const getJokes = async () => {
  let joke = '';
  const jokesApiUrl =
    'https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
  try {
    const res = await fetch(jokesApiUrl);
    const data = await res.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    tellMe(joke);
    toggleButton();
  } catch (error) {
    console.log(error);
  }
};

const toggleButton = () => (button.disabled = !button.disabled);

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
