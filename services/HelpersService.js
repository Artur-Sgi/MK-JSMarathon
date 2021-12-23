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

export { getRandom, getCurrentTime };
