function getYDay(date: Date = new Date()): number{
    const poczatek = Date.UTC(date.getFullYear(), 0, 1);
    const teraz = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());

    const diff = teraz.valueOf() - poczatek.valueOf();
    const day = 1000 * 60 * 60 * 24;
    const yday = Math.floor(diff / day) + 1;

    return yday;
}

export { getYDay };