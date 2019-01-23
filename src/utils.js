export const shuffle = (array) => {
  let arr = [], n = array.length, i = 0;
  var temp;

  while (n > 0){
  	let k = Math.floor(Math.random() * n);
  	n = n - 1;
  	temp = array[n];
  	array[n] = array[k];
  	array[k] = temp;
  }
}

export const copyArray = (array) => {
  return (JSON.parse(JSON.stringify(array)));
}

