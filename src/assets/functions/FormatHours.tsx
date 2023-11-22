export default function formatHours(hour: string, minutes:number) {
    let [hours, mins] = hour.split(':').map(Number);
    mins = mins + minutes;
    hours = hours + Math.floor(mins / 60);
    hours = (hours % 24 + 24) % 24;
    mins = mins % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}