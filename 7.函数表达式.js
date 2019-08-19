function egFn(){
  
}

console.log(5,egFn.name);
var egFn2 = function () {
  
}
console.log(9,egFn2.name);

function egFn3(num){
  if (num < 1) {
    return 1
  } else {
    return num * egFn3(num - 1)
  }
}
var otherFn = egFn3
egfn3 = null
console.log(egFn3(5));
