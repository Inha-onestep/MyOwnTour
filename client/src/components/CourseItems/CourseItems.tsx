import {
  Block,
  ButtonContainer,
  ButtonSection,
  Content,
  ImageContainer,
  StyledRate,
  StyledTitle,
} from "./styles";
import {
  DownSquareOutlined,
  EnvironmentOutlined,
  FileImageOutlined,
  MinusSquareOutlined,
  UpSquareOutlined,
} from "@ant-design/icons";
import { message } from "antd";

interface CourseItems {
  id?: number;
  editCourse?: {
    children: string;
    location: {
      lat: number;
      lng: number;
    };
    address: string;
    type: string;
    day: number;
    img: string;
  }[];
  setEditCourse?: React.Dispatch<
    React.SetStateAction<
      {
        children: string;
        location: {
          lat: number;
          lng: number;
        };
        address: string;
        type: string;
        day: number;
        img: string;
      }[]
    >
  >;
  isRate?: boolean;
  rate?: number;
  button?: string;
  title: string;
  address: string;
  type: string;
  day: number;
  location: {
    lat: number;
    lng: number;
  };
  img?: string;
}
export default function CourseItems({
  id,
  editCourse,
  setEditCourse,
  isRate,
  rate,
  button,
  title,
  address,
  day,
  location,
  type,
  img,
}: CourseItems) {
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "성공적으로 추가되었습니다.",
    });
  };
  const handleDelete = (id: number) => {
    if (editCourse && setEditCourse) {
      const newCourse = [...editCourse];
      newCourse.splice(id, 1);
      setEditCourse(newCourse);
    }
  };
  const handleItemUp = (id: number) => {
    if (editCourse && setEditCourse) {
      const newCourse = [...editCourse];
      if (id > 0) {
        const temp = newCourse[id];
        newCourse[id] = newCourse[id - 1];
        newCourse[id - 1] = temp;
      }
      setEditCourse(newCourse);
    }
  };
  const handleItemDown = (id: number) => {
    if (editCourse && setEditCourse) {
      const newCourse = [...editCourse];
      if (id < newCourse.length - 1) {
        const temp = newCourse[id + 1];
        newCourse[id + 1] = newCourse[id];
        newCourse[id] = temp;
      }
      setEditCourse(newCourse);
    }
  };
  const handleItempPush = () => {
    if (editCourse && setEditCourse) {
      const newCourse = [...editCourse];
      newCourse.push({
        children: title,
        location: {
          lat: location.lat,
          lng: location.lng,
        },
        address: address,
        type: type,
        day: day,
        img: img as string,
      });
      setEditCourse(newCourse);
      success();
    }
  };
  return (
    <>
      {contextHolder}
      <Block
        onClick={() => {
          button !== "edit" && handleItempPush();
        }}
      >
        <ImageContainer>
          {img ? (
            <img
              src={img}
              style={{ width: "160px", height: "100px", objectFit: "cover" }}
            />
          ) : (
            <FileImageOutlined width={24} />
          )}
        </ImageContainer>
        <Content>
          <ButtonSection button={button as string}>
            <span>{type}</span>
            {button === "edit" ? (
              <ButtonContainer>
                <MinusSquareOutlined onClick={() => handleDelete(Number(id))} />
                <UpSquareOutlined onClick={() => handleItemUp(Number(id))} />
                <DownSquareOutlined
                  onClick={() => handleItemDown(Number(id))}
                />
              </ButtonContainer>
            ) : null}
            {isRate ? <StyledRate allowHalf disabled value={rate} /> : null}
          </ButtonSection>
          <StyledTitle level={4}>{title}</StyledTitle>
          <div>
            <EnvironmentOutlined />
            <span>{address}</span>
          </div>
        </Content>
      </Block>
    </>
  );
}
