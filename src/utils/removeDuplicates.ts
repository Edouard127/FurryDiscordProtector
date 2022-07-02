export default function removeDuplicates(arr: any[]) {
    let unique_array = []
    if(!arr.length) return false
    for (let i = 0; i < arr.length; i++) {
      if (unique_array.indexOf(arr[i]) == -1) {
        unique_array.push(arr[i])
      }
    }
    return unique_array
  }