

const Todo = (props) => {
    //Check props 
    console.log("Check props from parent to child: ", props)
    //Call prop property todos from parent App.js to child Todo.js
    //C1: Lấy dữ liệu qua gọi thuộc tính từ object
    const todos = props.mydata
    //C2: Truyền trực tiếp từ function component biến todos, title --> Thay vì truyền prop
    //const Todo = ({title, todos}) => {...}
    //C3: Lấy 2 phần tử trong mảng prop
    //const {todos, title} = props

    //Function HandleDelete on span - Function as Props: Add span x next to <li>
    const HandleDelete = (id) => {
        console.log(id)
        alert("Mã Nhân Viên: "+ id)
        //Xử lý từ Child Todo.js gọi ngược lên Parent App.js --> Để xóa được mảng todos bên App.js
        props.DataDeletTodoArray(id)
    }

    //Return function Todo
    return(
        <div className='Todos-Container'>
            {/* Reusing Compnents - Not using React Router */}
            <div className="title">
                {/* C1 : Define key title */}
                {props.title}
                {/* C2 */}
                {/* {title} */}
            </div>

            {/* For / Foreach => Map : Not change modify value todos, render value*/}
            {todos.map(todos => {
            console.log("Check todos list:", todos)
            return(
                <div key = {todos.id}>
                    {/*Using key: React know id to update what element*/}
                    {/* <li className='Todos-Child' key = {todos.id}>{todos.hoten}</li> */}
                    <li className='Todos-Child'>
                        {todos.hoten}
                        &nbsp; &nbsp; &nbsp; 
                        <span onClick={()=>HandleDelete(todos.id)}>x</span>
                    </li>
                    
                </div>
            )
            })}

            <hr/>
        </div>
    )
}

export default Todo