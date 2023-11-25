import Conversation from "../components/conversation/Conversation"

const Messages = () => {
  return (
    <main className="main">
      <Conversation name="Nacho Menendez Lopez" username="nachomenendez" date="hace 1 minuto" last_message="Tú: Lorem ipsum dolor!" />
      <Conversation name="Fernando Escalona" username="fereskalona" date="hace 1 minuto" last_message="Tú: Lorem ipsum dolor!" />
      <Conversation name="Laura Tortosa" username="lauratortosa" date="hace 1 minuto" last_message="Tú: Lorem ipsum dolor!" />
      <Conversation name="Paco Porras" username="pacopaquito" date="hace 1 minuto" last_message="Tú: Lorem ipsum dolor!" />
      <Conversation name="Perico Palotes" username="pericopalotes" date="hace 1 minuto" last_message="Tú: Lorem ipsum dolor!" />
    </main>
  )
}

export default Messages