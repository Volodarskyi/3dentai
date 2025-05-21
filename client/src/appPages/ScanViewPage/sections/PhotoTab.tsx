import Image from "next/image";

import "./index.Styles.scss";

const PhotoTab = () => {
  const jawMap = {
    lower: {
      baseImage:
        "/assets/teeth/3DentAI_teeth-scheema-prepared_v2-lower-jaw.png",
      overlays: {
        48: "/assets/teeth/3DentAI_teeth-scheema-prepared_v2-lower-jaw_active-48.png",
      },
    },
  };
  return (
    <div className="photo-tab">
      <div className="photo-tab__photo">
        <Image
          src={"/assets/teeth/id1232234334.png"}
          alt={`Jaw photo`}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          unoptimized
        />
      </div>
      <div className="photo-tab__schema">
        {/* Base Image */}
        <Image
          src={jawMap.lower.baseImage}
          alt={`Jaw schema`}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          unoptimized
        />

        {/* Overlay */}
        <Image
          src={jawMap.lower.overlays[48]}
          alt={`Tooth 48`}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
          }}
          unoptimized
        />
      </div>
    </div>
  );
};
export default PhotoTab;
