import { makeAutoObservable } from "mobx";
import {apiClient} from "@/api/apiClient";

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

  fetchScansByDoctorAndUser = async (
      userId: string,
      status?: string
  ): Promise<any[]> => {
    try {
      let requestUrl = `/api/scans/doctor?userId=${encodeURIComponent(userId)}`;
      if (status) {
        requestUrl += `&status=${encodeURIComponent(status)}`;
      }

      const res = await apiClient.get(requestUrl)

      return res.data?.scans || [];
    } catch (error: any) {
      console.error("Failed to fetch scans:", error.response?.data || error.message);
      return [];
    }
  };
}

export default new scansViewStore();
