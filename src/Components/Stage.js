import React from 'react'
import './Stage.css'
// label,id,type,required,choices,title,firstName,lastName,length,min,max,defaultValue,age,viewMode
// Add input
//Common Items--> label,id,type,required,viewMode

// const Stage = ({label,type,required,viewMode}) => {
//     return(
//         <div>
//             <label>First Name:
//                 <input name="id" type="text" />
//             </label>
//         </div>
//     )
// }

// label,type,required,viewMode

class Stage extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            type:'MultiChoice',
            required:'true',
            viewMode:'readOnly'
        }
    }
    onFormSubmit = (e) => {
        e.preventDefault()
        const label = e.target.label.value
        const type = this.state.type
        const required = this.state.required
        const viewMode = this.state.viewMode
        // console.log(label,type,required,viewMode)
        this.props.addStage ? this.props.SaveStageData(label,type,required,viewMode) : this.props.history.push("/view-edit-mode")
        e.target.label.value = ''
        // this.setState({type:'',required:'',viewMode:''})
    }
    onTypeChange = (e) => {
        const type = e.target.value
        this.setState({type})
    }
    onRequiredChange = (e) => {
        const required = e.target.value
        this.setState({required})
    }
    onViewModeChange = (e) => {
        const viewMode = e.target.value
        this.setState({viewMode})
    }
    ViewEditGo = () => {
        this.props.history.push("/view-edit-mode")
    }

    render(){
        return(
            <div className="stage-container">
                <form onSubmit={this.onFormSubmit}>
                <h1 style={{textAlign: 'center'}}>Stage{"  "+this.props.counter}</h1>
                    <label>Name:
                        <input name="label" type="text" />
                    </label><br/>
                    <label>Type:
                        <select id="type" value={this.state.type} onChange={this.onTypeChange} >
                            <option value="MultiChoice">MultiChoice</option>
                            <option value="Text">Text</option>
                            <option value="integer">Number</option>                    
                        </select>
                    </label><br/>
                    <label>Required:
                        <select id="required" value={this.state.required} onChange={this.onRequiredChange}  >
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </label><br/>
                    <label>View Mode:
                        <select id="viewMode" value={this.state.viewMode} onChange={this.onViewModeChange} >
                            <option value="readonly">Read Only</option>
                            <option value="edit">Edit</option>
                        </select>
                    </label><br/>
                    <input style={{color:'black'}} type="submit" value="Save & Continue" />
                </form>
                    <input style={{color:'black'}}  type="submit" onClick={this.ViewEditGo} value="Finish" />
            </div>
        )
    }
}


export default Stage;