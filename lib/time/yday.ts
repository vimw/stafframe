function getYDay(date: Date): number{
    const poczatek = new Date(date.getFullYear(), 0, 1);
    const diff = date.valueOf() - poczatek.valueOf();
    const day = 1000 * 60 * 60 * 24 // ms * s * m * h = d

    const yday = Math.floor(diff / day) + 1;
    return yday;
}

export { getYDay };