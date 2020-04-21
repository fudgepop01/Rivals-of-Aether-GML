export default (arr) => {
    return arr.reduce((ary, ele) => {ary.unshift(ele); return ary}, []);
    
}