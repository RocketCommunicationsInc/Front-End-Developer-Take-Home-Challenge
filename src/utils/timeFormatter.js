const contactTimeInMinutes = (begin, end) => {
	  const minutes = (end-begin)/60;
	  return minutes;
};

const errorTimeDate = (errorTime) => {
	const date = new Date(errorTime);
	return date.toLocaleString();
};

export { contactTimeInMinutes, errorTimeDate };