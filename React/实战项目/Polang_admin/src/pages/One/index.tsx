import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../store/counterSlice";
import { ReactI18NextChild, Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function One() {
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  let name = "janny" as ReactI18NextChild;
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
        <a href="baidu">
          <strong>{{ name }}</strong>
        </a>
        , you have
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
    </>
  );
}
