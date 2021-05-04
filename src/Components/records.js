import React,{Component} from 'react'

import PatientCard from './patientCard'

const date= new Date();

class Records extends Component{
    constructor(){
        super()
        this.state={screen:'today',keyword:'',loading:true}
    }

    
    
    
    //Recieve all the patients that have been registered from the database
    componentDidMount()
    {
      //on load
      // request main electron application for the patient (name and id)
      window.ipcRenderer.send('give_patient_data')


      
      
      
      // on recieving patient (id,name) from electron
      window.ipcRenderer.on('got_patient_data',(event,arg) =>
      {
        //save our [array containing{Patient_id,Patient_Name}] to the state
        this.setState(prevState=>
          {
            return {...prevState,data:arg,loading:false}
          })
          console.log(this.state.data)
        
      })

    }

    





    render(){

      let patientCardsToRender=()=>
      
      {

        //make sure this is rendered after we get patient-data from electron
        if(this.state.loading === false)
        {
          //get the html cards into this variable so we can change the 
          //portion according if screen is set to 'all','filter','byDate'


          // if screen is set to show all patients
          if(this.state.screen === 'all')
          {
            let tempForStorage=
            this.state.data.map(item =>
            {
               
                return (< PatientCard patientName={item[1]} patientId={item[0]} key={item[0]} />)
              
            })
            console.log(tempForStorage)
            return(
              <div id='chart'>
                    {tempForStorage}
              </div>
            )
           


          }

          // if screen is set to only show todays patients
          else if(this.state.screen==='today')
          {
                //getting date so we can compare with the dates in records to get todays records
                let todaysDate=`${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
                console.log(todaysDate)
                let tempForStorage=this.state.data.map(item =>
                  {
                    if(item[2]===`${todaysDate}`)
                    {
                      //if date field in each record equal to todays date we will return it to our temporary variable
                      // to render it later
                      console.log(item)
                      return (< PatientCard patientName={item[1]} patientId={item[0]} key={item[0]} />)

                    }

                    else{
                      // else then leave that record
                    }
                  })
                  
                  // then render that selected records in charts 
                  return(
                    <div id='chart'>
                          {tempForStorage}
                    </div>
                  )


            

          }

          else if(this.state.screen === 'byname')
          {
            // search by id or name
            
          }
          

        }

        else if(this.state.loading === true)
        {
          return null
        }

      }







        return(
            <div id='Records'>
                <div id='navbar'>
                <nav className="navbar">
          <div className="navbar__container">
            <a href="#home" id="navbar__logo">
              Patient Database
            </a>
            <div className="navbar__toggle" id="mobile-menu">
              <span className="bar"></span> <span class="bar"></span>
              <span className="bar"></span>
            </div>
            <ul className="navbar__menu">
              <li className="navbar__item">
                <a href="#home" className="navbar__links" id="home-page">
                  Home
                </a>
              </li>
              <li className="navbar__item">
                <a href="#about" className="navbar__links" id="about-page">
                  Register
                </a>
              </li>
              <li className="navbar__item">
                <a
                  href="#services"
                  className="navbar__links"
                  id="services-page"
                >
                  Records
                </a>
              </li>
              <li className="navbar__btn">
                <a href="#sign-up" className="button" id="signup">
                  Sign Out
                </a>
              </li>
            </ul>
          </div>
        </nav>

                </div>
                <div id='controls_and_records'>
                    <div id='controls'>

                    </div>



                    
                      {patientCardsToRender()}
                      
                      
                                
                    

                </div>

            </div>
        )
    }
}

export default Records