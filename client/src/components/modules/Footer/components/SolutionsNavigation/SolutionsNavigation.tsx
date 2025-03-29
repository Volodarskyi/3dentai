import { FC } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation"; // ✅ use next/navigation for App Router

import Button from "@/components/UI/UiButton/UiButton";

// import { useStores } from "@/hooks/useStores";
import "./SolutionsNavigation.Styles.scss";

const SolutionNavigationComponent: FC = () => {
  // const { dialogStore } = useStores();
  const router = useRouter();

  const toComingPage = () => {
    router.push("/coming");
  };

  // const testLoader = () => {
  //   dialogStore.showLoader();
  // };
  //
  // const testSuccess = () => {
  //   dialogStore.showSuccess(
  //     "test some success for test this componetn and understand how many chars we can type in this line",
  //   );
  // };
  //
  // const testError = () => {
  //   dialogStore.showError(
  //     "test some success for test this componetn and understand ",
  //   );
  // };
  //
  // const testClose = () => {
  //   dialogStore.closeAll();
  // };

  return (
    <div className={"scanNavigation"}>
      <Button onClick={toComingPage} text={"More Details"} width={300} />
      {/*<Button onClick={testLoader} text={"loader"} />*/}
      {/*<Button onClick={testSuccess} text={"success"} />*/}
      {/*<Button onClick={testError} text={"error"} />*/}
      {/*<Button onClick={testClose} text={"close"} />*/}
    </div>
  );
};

export const SolutionNavigation = observer(SolutionNavigationComponent);
