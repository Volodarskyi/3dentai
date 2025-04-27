import { makeAutoObservable } from "mobx";

class scansViewStore {
  scanID: string = "";
  constructor() {
    makeAutoObservable(this);
  }

  setScanID(scanID: string) {
    this.scanID = scanID;
  }

  getScanID() {
    return this.scanID;
  }
}

export default new scansViewStore();
