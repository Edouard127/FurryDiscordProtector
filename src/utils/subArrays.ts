export default function subArray(a: any[], b: any[]) {
  console.log(a, b)
  let x = a.filter(function (el) {
    return !b.includes(el);
  });
  return x
}