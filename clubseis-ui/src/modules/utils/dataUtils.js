export const todayStringDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

export const fromStringDateToNumber = (date) => {
    const selectedDate = new Date(date);
    return Math.floor(selectedDate.getTime() / (1000 * 60 * 60 * 24));
};

export const fromNumberToStringDate = (number) => {
    const daysDifference = parseInt(number);
    const selectedDate = new Date(daysDifference * (1000 * 60 * 60 * 24));

    return selectedDate.toISOString().split('T')[0];
};
