const TaskItem = () => {
  return (
    <li>
      <label>Task</label>
      <input type={'checkbox'} />
      <TaskItem />
    </li>
  );
};

export default TaskItem;
