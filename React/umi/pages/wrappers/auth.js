import { Redirect } from 'umi'

function useAuth(){
    console.log('没有权限');
   return false
}
export default (props) => {
  const { isLogin } = useAuth();
  if (isLogin) {
    return <div>{ props.children }</div>;
  } else {
    return <Redirect to="/" />;
  }
}