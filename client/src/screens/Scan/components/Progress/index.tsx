import { Steps } from "antd";
import { observer } from "mobx-react-lite";

import { useStores } from "@/hooks/useStores";

const Progress = observer(() => {
  const { scanStore } = useStores();
  const { step, steps } = scanStore;

  return <Steps current={step} items={steps} />;
});

export default Progress;
