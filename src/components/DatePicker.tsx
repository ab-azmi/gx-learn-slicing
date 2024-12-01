import { useState } from "react";
import Picker from "react-datepicker";

type Props = {
  onChange: (date: [Date | null, Date | null]) => void; 
}

const DatePicker = ({onChange}: Props) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  return (
    <div className="d-flex flex-column gap-1 form-group">
      <label htmlFor="date" className="fw-light">Date Range</label>
      <Picker
        id="date"
        autoComplete="off"
        className="form-control"
        dateFormat={"dd/MM/yyyy"}
        placeholderText="dd/mm/yyyy - dd/mm/yyyy"
        selectsRange={true}
        startDate={startDate!}
        endDate={endDate!}
        onChange={(update) => {
          if (Array.isArray(update)) {
            setDateRange(update);
            onChange(update);
          }
        }}
      />
    </div>
  );
}

export default DatePicker