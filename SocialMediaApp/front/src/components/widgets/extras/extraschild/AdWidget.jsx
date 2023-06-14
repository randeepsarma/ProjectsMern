import AdPic from "images/ad.jpg"
import "../../../../styles/CommonStyle.css"
import { useSelector } from "react-redux"
import "../../../../styles/CommonStyle.css"
const AdWidget = () => {

  const mode = useSelector(state => state.counterSliceReducer.mode)

  return (
    <div className={`AdWidget temp temp2 temp3 flex flex-col box-border  h-[60vh] ${mode === "light" ? "bg-[white]" : "text-[white] bg-[#27272a]"}  `}>
      <div className="one box-border h-[15%] flex flex-row justify-between px-[0.5rem] text-[0.9rem] font-bold rounded-2xl">
        <div className="box-border  flex items-center">Sponsored</div>
        <div className={`box-border flex items-center  cursor-pointer rounded-2xl hover:text-[1rem] ${mode === "light" ? "text-[#373737]" : "text-[white] bg-[#27272a]"}`}>CreateAd</div>
      </div>
      <div className="two box-border h-[55%] flex justify-center items-center">
        <img src={AdPic} alt="" className="h-[100%] w-[95%] rounded-lg" />
      </div>
      <div className="three box-border h-[10%] flex flex-row justify-between px-[0.5rem] text-[0.7rem] font-bold">
        <div className="box-border flex items-center">HR Comestics</div>
        <div className="box-border flex items-center hover:text-[0.9rem]"><a href="www.nykaa.com ">Visit Store</a></div>
      </div>
      <div className="four box-border  h-[20%] text-[0.8rem] px-[0.5rem] font-semibold flex justify-start">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, voluptas.....
      </div>

    </div>
  )
}

export default AdWidget