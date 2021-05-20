function bindActionCreators(actionCreators,dispatch){
    if(typeof actionCreators === 'function'){
        return (...args)=> dispatch(actionCreators(...args))
    }
    let bondActionCreators = {}
    for (const key in actionCreators) {
        bondActionCreators[key] = (...args)=> dispatch(actionCreators[key](...args))
    }
    return bondActionCreators
}

export default bindActionCreators