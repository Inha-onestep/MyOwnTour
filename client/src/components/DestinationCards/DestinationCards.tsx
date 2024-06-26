import { Block } from "./styles";
import { NoMarginTitle } from "../DestinationPicker/styles";
import { CardComponent } from "../CardComponent";
import { useRef, useState } from "react";

interface DestinationCardsProps {
  isError: React.MutableRefObject<boolean>;
}
export default function DestinationCards({ isError }: DestinationCardsProps) {
  const destination = [
    "산",
    "바다",
    "역사/문화",
    "체험",
    "건축/조형물",
    "카페",
  ];
  const [selected, setSelected] = useState([0, 0, 0, 0, 0, 0]);
  const count = useRef(1);
  return (
    <>
      <NoMarginTitle>선호하는 여행테마를 선택해 주세요.</NoMarginTitle>
      <Block>
        {destination.map((item, idx) => (
          <CardComponent
            title={item}
            src={`/img/destination_${idx}.jpg`}
            setSelected={setSelected}
            idx={idx}
            count={count}
            selected={selected}
            type="destination"
            isError={isError}
          />
        ))}
      </Block>
    </>
  );
}
