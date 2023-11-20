import { useTodoContext } from '../Core/Context';

export const TodoForm = () => {

  const {
    handleSubmit,
    newTask,
    setNewTask,
    error } = useTodoContext();


  return (
    <form onSubmit={handleSubmit} action="" className="mb-3">
      <div className='group'>
        <input
          className="form-control"
          type="text"
          placeholder='New task'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />

        <button type="submit" className="btn btn-primary options">
          +
        </button>
      </div>
      {error && <div className="text-danger mt-2">{error}</div>}
    </form>

  );
}