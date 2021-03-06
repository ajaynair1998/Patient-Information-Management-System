import React from 'react'

function ChiefComplaint(props)
{
    
    return (
        <div className='single_entry'>
                            <div className='labels'>
                                <p>Chief Complaint:</p>
                                <p>H/O Complaint:</p>

                            </div>
                            <div className='input_rows'>
                                <p>{props.chiefComplaint}</p>
                                
                                <p>{props.historyOfComplaint}</p>

                            </div>
                            <div className='date'>
                                <p>{props.date}</p>

                            </div>
                            <div className="delete_button">
                                <button  id='delete_button_chief_complaint' className={props.index} onClick={
                                props.handleClickChiefComplaint}>Delete</button>

                            </div>
                            <div>

                            </div>

        </div>


    )

}

export default ChiefComplaint