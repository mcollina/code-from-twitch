import fibonacci from "fibonacci"

export default async ({ number }) => {
  const result = fibonacci.iterate(number)
  return result
}
