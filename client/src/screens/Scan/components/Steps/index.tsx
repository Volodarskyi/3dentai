import { theme } from "antd";
import { observer } from "mobx-react-lite";

import { useStores } from "@/hooks/useStores";

const Steps = () => {
  const { token } = theme.useToken();
  const { scanStore } = useStores();
  const { steps, step } = scanStore;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "260px",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
      }}
    >
      {steps[step].content}
    </div>
  );
};

export default observer(Steps);
