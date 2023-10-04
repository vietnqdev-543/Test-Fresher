import HashLoader from "react-spinners/HashLoader";
const Loading = () => {
    const style = {position:'fixed' , top: "50%" , left : '50%' , transform : "translate(-50% , -50%)"}
  return (
    <div>
        <HashLoader style={style}  />
    </div>
  )
}

export default Loading