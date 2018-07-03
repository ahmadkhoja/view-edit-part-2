import React from 'react'

const Message = ({label,value}) => {
    return(
        <div>
            <h2>{label + ' : ' + value}</h2>
            <h3>These values has been saved successfuly</h3>
        </div>
    )
}

const InputControl = ({label,id,type,required,choices,length,min,max,defaultValue,viewMode,onChoiceChange,value,onTextChange,onNumberChange}) => {
    
    // Edit Mode
    if(viewMode === 'edit'){
        if(type === 'MultiChoice'){
            return(
                <label> {label}
                    <select value={value} name='multi' required={required} onChange={onChoiceChange}>
                        {choices.map( (choice,index) => <option value={choice.value} key={index}>{choice.text}</option>)}
                    </select>
                    <br/>
                </label>
            ) 
        }else if(type === 'Text' && id === "firstName" && length){
            console.log('value',value)
            return(
            <label> {label}
                <input id={id} value={value} name='text' type={type.toLowerCase()} required={required} maxLength={length} onChange={onTextChange} />
                <br/>
            </label>
            )
        }else if(type === 'integer'){
            return(
                <label> {label}
                    <input name='numeric' type="number" required={required} min={min} max={max} value={value}onChange={onNumberChange} />
                    <br/>
                </label>
                )
        }

        // View Mode 
    }else{
        if(type === 'MultiChoice'){
            return(
                <label> {label}
                    <select value={value} name='multi' required={required}  disabled onChange={onChoiceChange}>
                        {choices.map( (choice,index) => <option value={choice.value} key={index}>{choice.text}</option>)}
                    </select>
                    <br/>
                </label>
            ) 
        }else if(type === 'Text' && id === "firstName" && length){
            return(
            <label> {label}
                <input id={id} name='text' type={type.toLowerCase()} required={required} value={value} maxLength={length}  disabled/>
                <br/>
            </label>
            )
        }
        else if(type === 'integer'){
            return(
                <label> {label}
                    <input name='numeric' type="number" required={required} min={min} max={max} value={value} disabled />
                    <br/>
                </label>
                )
        }
    }
}

class FormGenerator extends React.Component  {
    constructor(props){
        super(props)
        this.state = {
            choice:'Mr'
        }
    }

onFormSubmit = (e) => {
    e.preventDefault()
    alert("Data has been saved successfully")
    // this.props.save()
}

render(){
    return(
        <div>
            <form onSubmit={this.onFormSubmit}>
               
            { this.props.properties.map((component,index) => 
                <InputControl
                    key={index} 
                    label={this.props.properties[index].label} 
                    id={this.props.properties[index].id} 
                    type={this.props.properties[index].type} 
                    required={this.props.properties[index].required} 
                    choices={this.props.properties[index].choices} 
                    length={this.props.properties[index].length}
                    min={this.props.properties[index].minValue}
                    max={this.props.properties[index].maxValue}
                    viewMode={this.props.properties[index].viewMode}
                    value={component.value}
                    onChoiceChange={this.props.onChoiceChange}
                    onTextChange={this.props.onTextChange}
                    onNumberChange={this.props.onNumberChange}
                />)
            }
            
            { this.props.editMode ?
                <div>  
                    <input type="submit" className="save" value={this.props.actions[0].label} onClick={this.props.save}/>
                </div>
               : null
            }
            </form>
            {this.props.editMode ? <input type="submit" className="cancel" value={this.props.actions[1].label} onClick={this.props.cancel} /> : null}
            <br/>
            
        </div>
    )
  }   
}

export default FormGenerator;