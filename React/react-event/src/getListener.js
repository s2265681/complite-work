import { getFiberCurrentPropsFromNode } from "./ReactDOMComponentTree";


export default function getListener(fiberInst,registrationName){
    //return fiberInst.props[registrationName];
    const stateNode = fiberInst.stateNode;
    const props = getFiberCurrentPropsFromNode(stateNode);
    const listener = props[registrationName];
    return listener;
}