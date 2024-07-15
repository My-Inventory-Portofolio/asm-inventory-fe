export default function ValidDate(str: string) {
  const [day, month, year] = str.split("/")
  const fullYear = `20${year}`
  const date = new Date(`${fullYear}-${month}-${day}`)
  const timeInMillis = date.getTime()
  return timeInMillis || 0
}
