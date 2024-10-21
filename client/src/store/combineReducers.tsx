import scanStore from "@/store/reducers/scan";
import {UploadImgStore} from "@/store/reducers/upload-img-store";


export const RootStore = {
  scanStore: new scanStore(),
  uploadImgStore : new UploadImgStore()
};
