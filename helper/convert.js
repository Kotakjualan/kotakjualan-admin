
export const convertToRp = (val) => {
  val = (val || "");
  if (val == 0) {
    return 'Rp. ' + 0
  }
  if (val) {
    const num = parseInt(val).toFixed(0)
    const rp = new Intl.NumberFormat('id-ID', {
    }).format(num)

    return 'Rp. ' + rp
  }
  return '0'
}
