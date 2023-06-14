
const WidgetParent = ({children,flexProp}) => {
  return (
    <div className={`WidgetParent flex flex-col items-center  box-border border-2 border-b w-[90%] ${flexProp}`} >
      {children}
    </div>  
  )
}

export default WidgetParent