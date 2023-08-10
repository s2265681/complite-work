import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../store/counterSlice";
import { ReactI18NextChild, Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function One() {
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  let name = "janny" as ReactI18NextChild;

  const detailRemain = 15;
  const number = 10;
  return (
    <>
      <Trans>content.One</Trans>
      <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        <Trans>content.Increment</Trans>
      </button>
      <span>{count}</span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        <Trans>content.Decrement</Trans>
      </button>

      <br />
      {/* <Trans
        // i18nKey="myKey" // optional -> fallbacks to defaults if not provided
        defaults="hello <italic>beautiful</italic>" // optional defaultValue
        components={{ italic: <i /> }}
      ></Trans> */}
      <Trans i18nKey="userMessagesUnread" count={count}>
        Hello
        <a href="baidu">LiMing</a>, you have
        {{ count }} unread message. <Link to="/msgs">Go to messages</Link>.
      </Trans>

      <br />
      <Trans i18nKey="gotolink">
        click
        <strong style={{ cursor: "pointer" }}>
          <a href="baidu">www.baidu.com</a>
        </strong>
        dddd
      </Trans>

      <br />

      <Trans
        // i18nKey="myKey" // optional -> fallbacks to defaults if not provided
        defaults="hello <italic>beautiful</italic> <bold>{{what}}</bold>" // optional defaultValue
        values={{ what: "world" }}
        components={{ italic: <a />, bold: <strong /> }}
      />

      <br />
      <br />
      <br />
      <Trans
        i18nKey={"detail_remains"}
        number={number}
        detailRemain={detailRemain}
      >
        Free trial accounts are allowed <b>{{ number: number }}</b> visits to
        the details page per day. You have <b>{{ detailRemain }}</b> visits
        remaining.
      </Trans>

      <br />
      <br />
      <br />
      <Trans i18nKey={"cookie_service"}>
        Please see our
        <a
          href="https://kalowave.feishu.cn/docx/K2CCdCjiood6Brxtzq9cnLyxn8b"
          target="_blank"
        >
          <b>Terms of Service</b>
        </a>
        and
        <a
          href="https://kalowave.feishu.cn/docx/EOMjd0fa2oAjdxxlRCeclHRznWc"
          target="_blank"
        >
          <b>Privacy Policy</b>
        </a>
        for more information.
      </Trans>
    </>
  );
}
