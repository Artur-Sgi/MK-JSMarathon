const getRandom = limit => Math.ceil(Math.random() * limit);

const getCurrentTime = () => {
  const currentDate = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };

  return currentDate.toLocaleString('en-US', options);
};

const createElement = (tag, className) => {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
};

export { getRandom, getCurrentTime, createElement };
