const contactTimeForHumans = (begin, end) => {
    begin = getSeconds(begin);
    end = getSeconds(end);
    let seconds = Math.abs(begin-end);
    let minutes = Math.floor((seconds % 3600) / 60);
    let hours = Math.floor((seconds / 3600));
    let remainingSeconds = seconds % 60;

    let forHumans = "";

    if(hours > 0) forHumans += hours + " hours ";;
    if(minutes > 0) forHumans += minutes + " minutes ";
    if(remainingSeconds > 0) forHumans += " seconds ";

    return forHumans.trim();
}

const formatDateTime = (epoch) => {
    return new Date(getMiliseconds(epoch)).toLocaleString();
}

//The data in the dataset is a mix of miliseconds
//and seconds. Here we normalize that data
const getMiliseconds = (timestamp) => {
    let miliseconds = 0;
    if (Math.abs(Date.now() - timestamp) < Math.abs(Date.now() - timestamp * 1000)) {
        miliseconds = timestamp;
     } else {
        miliseconds = timestamp * 1000
     }
     return miliseconds;
}

const getSeconds = (timestamp) => {
    let seconds = 0;
    if (Math.abs(Date.now() - timestamp) < Math.abs(Date.now() - timestamp * 1000)) {
        seconds = timestamp / 1000;
     } else {
        seconds = timestamp
     }
    return seconds;
}

export {contactTimeForHumans, formatDateTime};