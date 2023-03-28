import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation, Trans } from "react-i18next";

export default function Sider({ update }: any) {
  const count = useSelector((state: any) => state.counter.value);
  const { t, i18n } = useTranslation();
  return (
    <>
      <div id="slider">
        <h1>{`${t("header.Hello World")} ${count}`}</h1>
        <Link to={`/one`}>
          <Trans>content.One</Trans>
        </Link>
        |
        <Link to={`/two`}>
          <Trans>content.Two</Trans>
        </Link>
        |
        <Link to={`/three`}>
          <Trans>content.Three</Trans>
        </Link>
        |
        <Link to={`/openAi`}>
          <Trans>OpenAI</Trans>
        </Link>
        <div className="play_container">
          <div className="header">
            <div>
              <span>{t("header.conquest")}</span>
            </div>
            <select
              onChange={(e) => {
                i18n.changeLanguage(e.target.value);
                // update();
              }}
            >
              <option value="en">English</option>
              <option value="zh">中文</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
