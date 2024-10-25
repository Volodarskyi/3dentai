import scanStore from "./reducers/scan";
import { UploadImg } from "./reducers/uploadImg";

export const RootStore = {
  scanStore: new scanStore(),
  uploadImgStore: new UploadImg(),
};
