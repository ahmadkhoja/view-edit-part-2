import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Stage from './Components/Stage'
import ViewEditMode from './Components/ViewEditMode'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      properties:[],
      actions: [
        {
          id: "save",
          label: "Save"
        },
        {
          id: "cancel",
          label: "Cancel"
        }
      ],
      counter:1,
      editMode:false,
      addStage:true
      
    }
  }
  SaveStageData = (label,type,required,viewMode) => {
    let counter = this.state.counter
    counter++
    this.setState({counter})
    console.log(label,type,required,viewMode)
    let data = {label,type,required,viewMode}

    if(counter >3){
      this.setState({addStage:false})
    }
    if(type === 'MultiChoice'){
      data.choices = [
        {
          "text": "Mr",
          "value": "Mr"
        },
        {
          "text": "Mrs",
          "value": "Mrs"
        },
        {
          "text": "Miss",
          "value": "Miss"
        }
      ]
      data.value=''
      let properties = this.state.properties
      properties.push(data)
      return this.setState({properties})
    }else if(type === "Text"){
      data.length = 128
      data.value=''
      data.id = "firstName"
      let properties = this.state.properties
      properties.push(data)
      return this.setState({properties})
    }else if(type === "integer"){
      data.minValue = 18
      data.maxValue = 150
      data.value = 45
      let properties = this.state.properties
      properties.push(data)
      return this.setState({properties})
    }else{
      throw new Error('SaveStageData')
    }
  }

  save = () => {
    // alert("Data has been saved successfully")
// save = (text,number,multi) => {
//   const copyState = Object.assign({},this.state)
//   // eslint-disable-next-line
//   copyState.properties.map((prop) => {
//     if(prop.type === 'MultiChoice'){
//       prop.value = multi
//     }else if(prop.type === 'integer'){
//       prop.value = number
//     }
//   })
//   this.setState({copyState})
//   // console.log(copyState)
//   // alert("Data has Saved successfuly")
}
cancel = () => {
    let copyState = Object.assign({},this.state)
    copyState.properties.map((prop,index) => 
      prop.value = ''
    )
    this.setState({copyState})
    // alert("Data has been set to default")
}
editModeFun = () => {
  const copyState = Object.assign({},this.state)
  copyState.properties.map((prop) => 
    prop.viewMode = "edit"
  )
  this.setState({editMode:true,copyState})
}
viewModeFun = () => {
  const copyState = Object.assign({},this.state)
  copyState.properties.map((prop) => 
    prop.viewMode = "readonly"
  )
  this.setState({editMode:false,copyState})
}
onTextChange = (e) => {
  const text = e.target.value
  const copyState = Object.assign({},this.state)
  // eslint-disable-next-line
  copyState.properties.map((prop) => {
    if(prop.type === 'Text'){
      prop.value = text
    }
  })
  this.setState({copyState})
}
onChoiceChange = (e) => {
  const choice = e.target.value
  const copyState = Object.assign({},this.state)
  // eslint-disable-next-line
  copyState.properties.map((prop) => {
    if(prop.type === 'MultiChoice'){
      prop.value = choice
    }
  })
  this.setState({copyState})
}
onNumberChange = (e) => {
  const number = e.target.value
  const copyState = Object.assign({},this.state)
  // eslint-disable-next-line
  copyState.properties.map((prop) => {
    if(prop.type === 'integer'){
      prop.value = number
    }
  })
  this.setState({copyState})
}

  render() {
    return (
      <div className="App">
      <Switch>
        <Route exact path='/' render = {
          (match)=>
          <Stage
          SaveStageData={this.SaveStageData}
          counter={this.state.counter}
          history={match.history}
          addStage={this.state.addStage}
          />
        }/>
        
        <Route exact path='/view-edit-mode' render= {
          (match)=>
            <ViewEditMode 
            history={match.history}
            properties={this.state.properties}
            actions={this.state.actions}
            save={this.save}
            cancel={this.cancel}
            editModeFun={this.editModeFun}
            editMode={this.state.editMode}
            viewModeFun={this.viewModeFun}
            onTextChange={this.onTextChange}
            onChoiceChange={this.onChoiceChange}
            onNumberChange={this.onNumberChange}
            />
          }/>
        </Switch>
      </div>   
    );
  }
}

export default App;
