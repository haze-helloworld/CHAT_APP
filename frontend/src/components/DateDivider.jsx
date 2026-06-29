import { format, isToday, isYesterday } from "date-fns";

function DateDivider({ date }) {

    const d = new Date(date);

    let label;

    if (isToday(d)) {
        label = "Today";
    } else if (isYesterday(d)) {
        label = "Yesterday";
    } else {
        label = format(d, "dd MMMM yyyy");
    }

    return (
        <div className="flex justify-center my-4">
            <span className="bg-[#43245E] px-3 py-1 rounded-full text-xs">
                {label}
            </span>
        </div>
    );
}

export default DateDivider;