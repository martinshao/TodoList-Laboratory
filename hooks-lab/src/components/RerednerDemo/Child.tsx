
function Child(props: { log: () => void }) {
  console.info('Child rendering...')

  const { log } = props
  return (
    <h2 onClick={log}>Child</h2>
  )
}

export default Child