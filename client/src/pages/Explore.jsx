import SuggestedUser from "../components/suggestedUser/SuggestedUser"

const Explore = () => {
  return (
    <main className="main">
      <SuggestedUser name="Nacho Menendez Lopez" username="nachomenendez" />
      <SuggestedUser name="Fernando Escalona" username="fereskalona" />
      <SuggestedUser name="Laura Tortosa" username={"lauratortosa"} />
    </main>
  )
}

export default Explore