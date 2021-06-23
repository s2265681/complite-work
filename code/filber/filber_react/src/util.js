

export function setProps(dom,oldProps,newProps) {
    for(let key in oldProps) {

    }
    for(let key in newProps) {
        if(key !== 'children') {
            setProps(dom,key,newProps[key]);
        }
    }
}

function setProps(dom,key,value) {
    if(/^on/.test(key)) {  // onClick
        

    }
}