const random = {
  arrayIndex: ar => Math.floor(Math.random() * ar.length),
}

random.arrayItem = ar => ar[random.arrayIndex(ar)]  

export default random