import type { Dayjs } from "dayjs";
import { useState } from "react";
import { DatePicker } from "antd";
import { TopMarginText } from "./styles";
import { NoMarginTitle } from "../DestinationPicker/styles";

const { RangePicker } = DatePicker;

type RangeValue = [Dayjs | null, Dayjs | null] | null;

export default function SchedulePicker() {
  const [dates, setDates] = useState<RangeValue>(null);
  const [value, setValue] = useState<RangeValue>(null);

  const disabledDate = (current: Dayjs) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") >= 3;
    const tooEarly = dates[1] && dates[1].diff(current, "days") >= 3;
    return !!tooEarly || !!tooLate;
  };

  const onOpenChange = (open: boolean) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  return (
    <>
      <NoMarginTitle>원하는 일정을 선택해 주세요.</NoMarginTitle>
      <RangePicker
        style={{ padding: "16px", width: "30vw" }}
        value={dates || value}
        disabledDate={disabledDate}
        onCalendarChange={(val) => {
          setDates(val);
        }}
        onChange={(val) => {
          setValue(val);
        }}
        onOpenChange={onOpenChange}
        changeOnBlur
      />
      <TopMarginText>최대 3일까지만 선택이 가능합니다.</TopMarginText>
    </>
  );
}