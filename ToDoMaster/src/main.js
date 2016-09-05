import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';


module.exports = React.createClass({

  getInitialState() {
    return({
      tasks: ['obj1', 'obj2', 'obj3'],
      completedTasks: [],
      task: ''
    })
  },

  renderList(tasks){
    return(
      //render and return a task within a view and add it to the list
      tasks.map((task, index)=>{
        return(
          <View key={task} style={styles.task}>
            <Text>
              {task}
            </Text>
            <TouchableOpacity
              onPress={()=> this.completeTask(task, index)}
              >
              <Text>
                &#10003;
              </Text>
            </TouchableOpacity>
          </View>
        )
      })
    )
  },

  rendrCompleted(task){
    return(
      task.map((task,index)=>{
        return(
          <View key={task} style={styles.task}>
            <Text style={styles.completed}>
              {task} - Completed
            </Text>
            <TouchableOpacity
              onPress={()=>this.deleteTask(index)}
              >
              <Text>
                &#10005;
              </Text>
            </TouchableOpacity>
          </View>
        )
      })
    )
  },

  deleteTask(index){
    let completedTasks = this.state.completedTasks
    completedTasks = completedTasks.slice(0,index).concat(completedTasks.slice(index+1));
    this.setState({completedTasks});
  },

  completeTask(task, index){
    //console.log(task);
    // get the current tasks list form state
    let tasks = this.state.tasks
    // slice the list and delete the selected index
    tasks = tasks.slice(0, index).concat(tasks.slice(index+1));
    //update the list from state


    // get the current completedTask list form state
    let completedTasks = this.state.completedTasks;;
    //add the selected task to the completedTask Array
    completedTasks = completedTasks.concat([this.state.tasks[index]])

    this.setState({
      tasks,
      completedTasks
    });
    console.log('completedTask', this.state.completedTasks);
  },

  addTask(){
    let tasks = this.state.tasks.concat([this.state.task]);
    // this.setState({tasks: tasks})
    this.setState({
      tasks
    })

  },

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.header}>
          To Do List
        </Text>
        <TextInput
          style={styles.input}
          placeholder="add a task"

          onChangeText={(text) => {
            this.setState({task: text});
            console.log(this.state.task);
          }}

          onEndEditing={()=>this.addTask()}
          />
        <ScrollView>
          {this.renderList(this.state.tasks)}
          {this.rendrCompleted(this.state.completedTasks)}
        </ScrollView>

      </View>
    )
  }
})

const styles = StyleSheet.create({

  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  header:{
    textAlign: 'center',
    marginTop: 30,
    fontSize: 18,
    margin: 40,
  },
  input:{
    height: 60,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    textAlign: 'center',
    margin: 30,
  },
  task:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    height: 60,
    borderBottomWidth: 1,
    borderColor: 'black'
  },
  completed:{
    color: 'gray',
    textDecorationLine: 'line-through',
  }

})
