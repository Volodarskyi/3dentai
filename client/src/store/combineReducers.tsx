import scanStore from "@/store/reducers/scan";
import { UploadImgStore } from "@/store/reducers/uploadImgStore";
import { UserStore } from "@/store/reducers/user-store";

export const RootStore = {
  scanStore: new scanStore(),
  uploadImgStore: new UploadImgStore(),
  userStore: new UserStore(),
};
