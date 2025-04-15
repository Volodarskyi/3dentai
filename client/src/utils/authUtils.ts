export const jwtDecode = (
  t: string,
): { raw: string; header: any; payload: any } => {
  return {
    raw: t,
    header: JSON.parse(window.atob(t.split(".")[0])),
    payload: JSON.parse(window.atob(t.split(".")[1])),
  };
};
