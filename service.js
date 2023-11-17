const { existsSync, readFileSync, writeFileSync } = require('fs');

module.exports = function (path) {
  const tasksByStatus = existsSync(path) ? JSON.parse(readFileSync(path)) : {};

  return {
    changeTaskStatus(task, oldStatus, newStatus) {
      if (
        tasksByStatus[oldStatus] instanceof Array &&
        tasksByStatus[newStatus] instanceof Array
      ) {
        const index = tasksByStatus[oldStatus].findIndex((t) => t === task);
        if (index !== -1) {
          tasksByStatus[oldStatus].splice(index, 1);
          tasksByStatus[newStatus].push(task);
          writeFileSync(path, JSON.stringify(tasksByStatus));
          return true;
        }
      }
      return false;
    },

    getTasksByStatus() {
      return tasksByStatus;
    },
  };
};
