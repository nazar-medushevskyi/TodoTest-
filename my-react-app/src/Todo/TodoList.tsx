import { useTodoContext } from '../Core/Context'

// @ts-ignore
import Basket from './Images/bin.png'


export const TodoList = () => {

  const {
    tasks,
    handleCheckboxChange,
    handleDelete,
  } = useTodoContext();

  return (
    <ul className="list-group">
      {tasks.map((task) => (
        <li key={task.id} className="list-group-item main-container">
          <div className="oneContainer">
            <input
              className="form-check-input"
              type="checkbox"
              checked={false}
              onChange={() => handleCheckboxChange(task.id)}
              readOnly
            />
            <p className='mb-0 oneContainer__text'>{task.text}</p>
          </div>

          <div className="twoContainer">
            <p className='mb-0 twoContainer__text'>{task.date} {task.dateHours}</p>
            <button
              className="btn btn-danger btn-sm float-end"
              onClick={() => handleDelete(task.id)}
            >
              <img className='bin' src={Basket} alt="Basket" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}