import React from 'react'
import FormGenerator from './FormGenerator'
import './ViewEditMode.css'

export default class ViewEditMode extends React.Component{
    
    view = () => {
        this.props.viewModeFun()
    }
    edit = () => {
        this.props.editModeFun()
    }
    
    render(){
        return(
            <div className="main">
                <div className="form-container">
                    <FormGenerator 
                    properties={this.props.properties} 
                    actions={this.props.actions} 
                    save={this.props.save} 
                    cancel={this.props.cancel} 
                    editMode={this.props.editMode}
                    onTextChange={this.props.onTextChange}
                    onChoiceChange={this.props.onChoiceChange}
                    onNumberChange={this.props.onNumberChange}
                    />
                    <button className="button" onClick={this.view}>View</button>
                    <button className="button" onClick={this.edit}>Edit</button>
                </div>
            </div>
        )
    }
}