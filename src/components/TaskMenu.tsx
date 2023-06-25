import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

type TaskMenuProps = {
  isMenuOpened: boolean;
  closeMenu: () => void;
  startEditing: () => void;
  handleAddSubtask: () => void;
  handleDeleteTask: () => void;
};

export const TaskMenu = observer(
  ({
    closeMenu,
    isMenuOpened,
    startEditing,
    handleAddSubtask,
    handleDeleteTask,
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

    const handleAddClick = (e: React.MouseEvent) => {
      e.stopPropagation();

      handleAddSubtask();

      closeMenu();
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      handleDeleteTask();

      closeMenu();
    };

    useEffect(() => {
      window.addEventListener('click', (e) => {
        if (e.target !== document.querySelector('.task-menu')) {
          closeMenu();
        }
      });

      return () => {
        window.removeEventListener('click', (e) => {
          if (e.target !== document.querySelector('.task-menu')) {
            closeMenu();
          }
        });
      };
    }, [closeMenu]);

    return (
      <ul className={`task-menu ${isMenuOpened && 'open'}`}>
        <li onClick={handleAddClick}>Добавить</li>
        <li onClick={handleEditClick}>Редактировать</li>
        <li onClick={handleDeleteClick}>Удалить</li>
        <li onClick={handleCloseClick}>Закрыть</li>
      </ul>
    );
  },
);
