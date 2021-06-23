
const initState = {
    count : 0
}

export const reducer =(action,state=initState)=>{
    console.log('type')
    switch(action.type){
            case 'add':
               return {
                ...state,
                count:initState.count++
              }
            break;
            default :
            return initState 
        }

}