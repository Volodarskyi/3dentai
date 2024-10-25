import scanStore from "@/store/reducers/scan";
import { UploadImg } from "@/store/reducers/upload-img";

export const RootStore = {
  scanStore: new scanStore(),
  uploadImgStore: new UploadImg(),
};
