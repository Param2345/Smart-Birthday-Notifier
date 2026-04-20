export const isValidDate = (str) => {
    const d = new Date(str);
    return !isNaN(d.getTime());
};

export const daysLeft = (dob) => {
    const today = new Date();
    const birth = new Date(dob);

    birth.setFullYear(today.getFullYear());

    if (birth < today) {
        birth.setFullYear(today.getFullYear() + 1);
    }

    const diff = birth - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
};