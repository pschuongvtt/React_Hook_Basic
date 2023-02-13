import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import { useState, useEffect } from 'react'; //React Hook Lib
import Todo from './components/Todo';
import Covid from './components/Covid';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";

//Function component - Class - App
function App(){
  let obj = {name: "Thu Hương", birthday: "17/08/1997"}
  
  //Using state hook - string 
  let [name, setName] = useState("LV") //[a1, b1, c1, ..., n]
  let [hoTen, sethoTen] = useState("")

  //Using state hook - Array Outputing
  const [todos, setTodos] = useState([
    {id: "NV01", hoten: "Vũ Thị Thu Hương", loainhansu: "Nhân viên"}, 
    {id: "NV02", hoten: "Nguyễn Thị Ngọc", loainhansu: "Nhân viên"}, 
    {id: "NV03", hoten: "Nguyễn Trần Ngọc Trâm", loainhansu: "Giảng viên"}
  ])

  //Function Random Number from min to max 
  const getRndInteger = (min, max) =>{
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  //Function 
  const handleEventClick = (event) => {
    /*Update value for property name*/
    //C1: name = "Thu Huong"
    //C2: Using function setName, React re-render function component
    //setName("Thu Huong")

    /*Click button Click me, setup setName = adrress*/
    //setName(hoTen)
    
    /*Show log pro name*/
    //console.log("Click me", name)

    /*
    Hook not merge state - not using Array todos 
    Using: ... spread syntax array js
    */

    if(!hoTen){
      return alert("Empty Input")
    }
    let newtodo = {
                      id: 'NV0' + getRndInteger(4,100), 
                      hoten: hoTen, 
                      loainhansu: "Nhân viên"
                  } //get hoTen from Input type = "text"
    setTodos([...todos, newtodo])//Copy Array: ...todos 

    /*Clear Input type hoTen*/
    sethoTen("")
  }

  //Function handleOnchangeInput
  const handleOnchangeInput = (event) => {
    /*Update value for property hoTen*/
    sethoTen(event.target.value)
    console.log("Click me", event.target.value)
  }

  //Function Delete Element Array Todos 
  const DataDeletTodoArray = (id) => {
    //Not delete todos array if todos is using - Type Error: "Assignment to constant variable"
    let currentTodos = todos
    //Filter Diffent Id Because Array lost ID in Array todos
    currentTodos = currentTodos.filter(item => item.id != id)
    setTodos(currentTodos)
  }

  /*Life Cycle
    Define function useEffect -  useEffect(()=> { }): useEffect runtime when component update will run function useEffect() in Hook 
                                                      = function componentDidUpdate() in Class Component 
    useEffect(()=> { }, []): Truyền vào 1 tham số vào hàm useEffect = hàm componentDidmount() trong Class component. Tuy nhiên nó chỉ chạy duy nhất 1 lần
    useEffect(()=> { }): Nếu muốn chạy nhiều hơn 1 lần thì Add điều kiện chạy vào 
  */
  useEffect(()=> {
    console.log("Run function useEffect hoTen")
  }, [hoTen]);

  useEffect(()=> {
    console.log("Run function useEffect todos")
  }, [todos]);

  //Return Function component
  return (
    <Router>
      <div className="App">
        {/* Call Nav.js */}
        <Nav />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Chào mừng bạn đến React Hook - {name}!</h2>
          {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
          <Routes>
            <Route path="/" element={
              <div>
                <div>
                  <p>------------------------------------------Thông tin Menu Home-------------------------------------</p>
                  <p>Fetching data with UseEffect - Sever API: https://documenter.getpostman.com/view/10808728/SzS8rjbc </p>
                  <p>Mô tả thông tin của các trường data</p>
                  <p>
                    - Date: Ngày <br/>
                    - Active: Tổng số ca <br/>
                    - Country - Tên quốc gia <br/>	
                    - CountryCode - Mã quốc gia <br/>
                    - Deaths - Số ca tử vong <br/>
                    - Recovered - Số ca hồi phục <br/>
                  </p>
                  <p>
                    Nội dung kỹ thuật sử dụng: <br/>
                    + useState : Sau khi fetch data về lưu lại<br/>
                      componentDidmount(): Lấy data về  trong Class Component = useEffect() trong Hook <br/>
                    + sync function(): Xử lý đồng bộ. <br/>
                    + useEffect: Truyền vào 1 tham số vào hàm useEffect = hàm componentDidmount() trong Class component. <br/>
                    Tuy nhiên nó chỉ chạy duy nhất 1 lần - Fetch data Server API - dùng axios <br/>
                  </p>
                </div>
                 {/* Call Covid.js */}
                <h3>Lấy danh sách API Covid</h3>
                <Covid/>
              </div>
            } />  
            
            <Route path="/todo" element={
              <div>
                <div>
                  <p>------------------------------------------Thông tin Menu Todo App-------------------------------------</p>
                  <p>
                    Nội dung kỹ thuật sử dụng: <br/>
                    + Prop: Using Prop property todos call parent to child <br/>
                    + DataDeletTodoArray: Function as Props from App.js to Todo.js<br/>
                    + Reusing Compnents - Not using React Router <br/>
                    + Using Map : Not change modify value todos, render value<br/>
                  </p>
                </div>
                {/* C1: Not using prop  */}
                {/* <div className='Todos-Container'>
                  For / Foreach => Map : Not change modify value todos, render value
                  {todos.map(todos => {
                    console.log("Check todos list:", todos)
                    return(
                      Using key: React know id to update what element
                      <li className='Todos-Child' key = {todos.id}>{todos.hoten}</li>
                    )
                  })}
                </div> */}

                {/* C2: Using Prop property todos call parent to child 
                left: "mydata" : name prop 
                right: "todos": value prop
                DataDeletTodoArray: Function as Props from App.js to Todo.js
                */}
                <Todo 
                  mydata = {todos}
                  title = {"All Todos"}
                  DataDeletTodoArray = {DataDeletTodoArray}
                />

                {/* Lọc tất cả những nhân viên có loainhansu = "Giảng viên */}
                <Todo
                  mydata = {todos.filter(item => item.loainhansu == "Giảng viên")}
                  title = "Fillter type 'GV' In All ToDos"
                  DataDeletTodoArray = {DataDeletTodoArray}
                />
                
                {/* Input, Button */}
                <input className="text-input" type = "text" placeholder='FullName For App Todo' value = {hoTen} onChange={(event) => handleOnchangeInput(event)}></input>
                <button type="button" onClick = {(event) => handleEventClick(event)} className = "button-30">Add List Todo App</button>
              </div>
            }/>
          </Routes>
        </header>
      </div>
    </Router>
  );
}


export default App;

