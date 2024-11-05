//rename an import
import { useState } from "react";
import Picker from "react-datepicker";

const DatePicker = () => {
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dateRange;
    return (
      <div className="d-flex flex-column gap-1 form-group">
        <label htmlFor="date" className="fw-light">Date Range</label>
        <Picker
        id="date"
        className="form-control"
        placeholderText="dd/mm/yyyy - dd/mm/yyyy"
        selectsRange={true}
        startDate={startDate!}
        endDate={endDate!}
        onChange={(update) => {
          setDateRange(update);
        }}
      />
      </div>
    );
}

export default DatePicker