import dialogStore from "./reducers/dialogStore";
import modalStore from "./reducers/modalStore";
import menuStore from "./reducers/menuStore";
import scanStore from "./reducers/scanStore";
import scansViewStore from "./reducers/scansViewStore";
import userStore from "./reducers/userStore";

export const RootStore = {
  scanStore,
  userStore,
  modalStore,
  menuStore,
  dialogStore,
  scansViewStore,
};
