type TaskMenuProps = {
  isMenuOpened: boolean;
  closeMenu: () => void;
  startEditing: () => void;
};

export const TaskMenu = ({
  closeMenu,
  isMenuOpened,
  startEditing,
}: TaskMenuProps) => {
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    startEditing();
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    closeMenu();
  };

  return (
    <ul className={`task-menu ${isMenuOpened && 'open'}`}>
      <li>Добавить</li>
      <li onClick={handleEditClick}>Редактировать</li>
      <li>Удалить</li>
      <li onClick={handleCloseClick}>Закрыть</li>
    </ul>
  );
};
