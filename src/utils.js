export const shuffle = (array) => {
  let n = array.length, i = 0;
  var temp;

  while (n > 0){
  	let k = Math.floor(Math.random() * n);
  	n--;
  	temp = array[n];
  	array[n] = array[k];
  	array[k] = temp;
  }
  return (array);
}

export const copyArray = (array) => {
  return (JSON.parse(JSON.stringify(array)));
}

