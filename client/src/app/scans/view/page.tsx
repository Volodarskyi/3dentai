import { notFound } from "next/navigation";

import ScansViewPage from "@/appPages/ScanViewPage/ScansViewPage";

interface ScansView {
  searchParams: Promise<{
    scanID?: string;
  }>;
}

export default async function ScansViewScreen(props: ScansView) {
  const params = await props.searchParams;
  const { scanID } = params;
  console.log(scanID);

  if (!scanID) {
    return notFound();
  }
  return <ScansViewPage scanId={scanID} />;
}
