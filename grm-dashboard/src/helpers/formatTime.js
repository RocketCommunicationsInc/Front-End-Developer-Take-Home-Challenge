const contactTimeForHumans = (begin, end) => {
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
    return new Date(epoch).toLocaleString();
}

export {contactTimeForHumans, formatDateTime};