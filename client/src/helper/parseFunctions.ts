export const jwtDecode = (
  t: string,
): { raw: string; header: any; payload: any } => {
  const token: { raw: string; header: any; payload: any } = {
    raw: t,
    header: JSON.parse(window.atob(t.split(".")[0])),
    payload: JSON.parse(window.atob(t.split(".")[1])),
  };

  return token;
};
