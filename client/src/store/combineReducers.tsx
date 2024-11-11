import scanStore from "./reducers/scanStore";
import { UploadImgStore } from "./reducers/uploadImgStore";
import { UserStore } from "./reducers/userStore";

export const RootStore = {
  scanStore: new scanStore(),
  uploadImgStore: new UploadImgStore(),
  userStore: new UserStore(),
};
