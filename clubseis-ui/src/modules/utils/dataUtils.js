export const numberChange = (number) => {
    const daysDifference = parseInt(number);
    const selectedDate = new Date(daysDifference * (1000 * 60 * 60 * 24));

    return selectedDate.toISOString().split('T')[0];
};

export const dateChange = (date) => {
    const selectedDate = new Date(date);
    return Math.floor(selectedDate.getTime() / (1000 * 60 * 60 * 24));
};