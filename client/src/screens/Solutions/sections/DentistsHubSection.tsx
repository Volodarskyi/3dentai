import { FC } from "react";
import { observer } from "mobx-react-lite";

// interface IDentistsHubSection {
// }

const DentistsHubSectionComponent: FC = () => {
  return (
    <section className={"mobileSection"} id="dentist-hub">
      DentistsHubSectionComponent
    </section>
  );
};

export const DentistsHubSection = observer(DentistsHubSectionComponent);
