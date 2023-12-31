import { useEffect, useRef } from "react";
import { Map, Polyline } from "react-kakao-maps-sdk";
import { useRecoilValue } from "recoil";
import { usePostRoutesToKaKaoMap } from "../../hooks";
import { courseState, dayState, pathState } from "../../state";
import { MapMarkerComponent } from "../MapMarkerComponent";
import { Wrapper } from "./styles";

export default function MapComponent() {
  const day = useRecoilValue(dayState);
  const items = useRecoilValue(courseState);
  const filteredCourses = items.filter((item) => {
    return item.day === day;
  });
  const waypoints = filteredCourses.map((item) => {
    return {
      x: item.location.longitude,
      y: item.location.latitude,
    };
  });
  const origin = waypoints.shift();
  const destination = waypoints.pop();

  const { mutate, isLoading } = usePostRoutesToKaKaoMap(
    origin,
    destination,
    waypoints
  );
  useEffect(() => {
    mutate();
  }, [day]);
  const paths = useRef<{ lat: number; lng: number }[]>([]);
  paths.current = useRecoilValue(pathState).path;
  return (
    <>
      {isLoading ? (
        <>로딩 중...</>
      ) : (
        <Wrapper>
          <Map
            center={
              items[3]
                ? {
                    lat: items[3].location.latitude,
                    lng: items[3].location.longitude,
                  }
                : {
                    lat: 0,
                    lng: 0,
                  }
            }
            style={{ width: "100%", height: "100vh" }}
            level={8}
          >
            <Polyline
              path={paths.current}
              strokeWeight={3}
              strokeColor={"#1677ff"}
              strokeOpacity={1}
              strokeStyle={"solid"}
            />
            {filteredCourses.map((loc, idx) => (
              <>
                <MapMarkerComponent
                  address={loc.address}
                  children={loc.children}
                  latitude={loc.location.latitude}
                  longitude={loc.location.longitude}
                  idx={idx}
                />
              </>
            ))}
          </Map>
        </Wrapper>
      )}
    </>
  );
}
