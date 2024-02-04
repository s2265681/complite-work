import { Trans } from "react-i18next";
// import i18next from "i18next";

export default function Three() {
  const title = "content.Three";
  return (
    <>
      <Trans>content.Three</Trans>
      <div>
        <Trans>{title}</Trans>
      </div>
    </>
  );
}
