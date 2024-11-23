export default function Page({ ...props }: unknown) {
  return <pre>{JSON.stringify(props, null, 2)}</pre>
}
