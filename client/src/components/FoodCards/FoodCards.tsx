import { NoMarginTitle } from "../DestinationPicker/styles";
import { CardComponent } from "../CardComponent";
import { Block } from "../DestinationCards/styles";
import { useState, useRef } from "react";

interface FoodCardsProps {
  isError: React.MutableRefObject<boolean>;
}
export default function FoodCards({ isError }: FoodCardsProps) {
  const accommodation = [
    "한식",
    "중식",
    "일식",
    "양식",
    "고기/구이",
    "패스트푸드",
  ];
  const [selected, setSelected] = useState([0, 0, 0, 0, 0, 0]);
  const count = useRef(1);
  return (
    <>
      <NoMarginTitle>선호하는 음식메뉴를 선택해 주세요.</NoMarginTitle>
      <Block>
        {accommodation.map((item, idx) => (
          <CardComponent
            title={item}
            src={`/src/img/food_${idx}.jpg`}
            setSelected={setSelected}
            idx={idx}
            selected={selected}
            count={count}
            type="food"
            isError={isError}
          />
        ))}
      </Block>
    </>
  );
}
