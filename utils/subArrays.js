function subArray(a, b) {
  console.log(a, b)
  let x = a.filter(function (el) {
    return !b.includes(el);
  });
  return x
}
module.exports = subArray