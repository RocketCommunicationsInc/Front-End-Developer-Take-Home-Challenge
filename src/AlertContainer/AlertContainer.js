import './AlertContainer.css'
import  data from '../data.json'
import Alert from '../Alert/Alert'


const AlertContainer = () => {

  // console.log(data[0])
const renderAlerts = () => data.map((item, index) => {
  // console.log(item[index]);
  return <Alert data={data[index]} key={index} />
})
data.forEach((item, index)=>{
  console.log(item.contactName)
})

  return (
    <div className='AlertContainer'>
        <div className='AlertContainer-header'> </div>
        <div className='alert-list'>
 
          {/* <ul>
            {renderAlerts()}
          </ul> */}
        </div>
    </div>
  )
}

export default AlertContainer
