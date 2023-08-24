import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../store/counterSlice";
import {
  ReactI18NextChild,
  Trans,
  useTranslation,
  Interpolate,
} from "react-i18next";
import { Link } from "react-router-dom";

export default function One() {
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  let name = "janny" as ReactI18NextChild;

  const detailRemain = 15;
  const number = 10;

  const click = () => {
    console.log("click");
  };
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
          Terms of Service
        </a>
        and <Link to="/msgs">Privacy Policy</Link> for more information.
      </Trans>

      <br />
      <br />
      <br />

      <Trans i18nKey="userMessagesUnread2">
        Please see our
        <a href="baidu1">Terms of Service</a>, you have
        {{}} unread message. <a href="baidu2">Privacy Policy</a> for more
        information.
      </Trans>

      <br />
      <br />
      <br />

      <Trans i18nKey="concatLink3">
        ?<a className="1">TikTok</a>or<a className="2">Contact</a>
      </Trans>

      <br />
      {/* 翻译问题。。。。 多个标签 a标签 加重解决*/}
      <div
        dangerouslySetInnerHTML={{
          __html: t("helloWorld", {
            linkA: "dddd",
            linkB: "aaaa",
          }),
        }}
      />

      <Trans
        i18nKey="myKey" // optional -> fallbacks to defaults if not provided
        defaults="hello <italic>beautiful</italic> <bold>{{what}}</bold>" // optional defaultValue
        values={{ what: "world", count: 222 }}
        components={{
          italic: (
            <i
              onClick={() => {
                console.log("111");
              }}
            />
          ),
          bold: <strong />,
        }}
      />

      <br />

      {/* 最终解决方案 */}
      <Trans
        i18nKey="gogogog"
        components={{
          1: <a href="dddd" />,
          2: <a href="dddd222" />,
        }}
      />

      <br />
      {/* 项目 */}
      <Trans
        i18nKey="signupErrorTip"
        components={{
          1: <a href="dddd" />,
          2: <a href="dddd222" />,
        }}
      />

      <Trans
        i18nKey={"accountTiktokHelp"}
        components={{
          1: <div>How to add an account registered with TikTok?</div>,
          2: (
            <div>
              Step 1, complete the phone number verification of this account in
              “My Kalodata”.
            </div>
          ),
          3: <div>Step 2, add this phone number as a sub-account.</div>,
        }}
      ></Trans>
    </>
  );
}
