import { test, expect } from '@playwright/test';
import { TodoPage, TASKS } from './pages/TodoPage';

test.describe('TodoMVC UI tests', () => {
  test('UI1: create 4 tasks and assert they are created', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.open();
    await todoPage.addDefaultTasks();

    await expect(todoPage.todoItems()).toHaveCount(4);
    await expect(todoPage.todoItems()).toHaveText([...TASKS]);
    for (const task of TASKS) {
      await expect(todoPage.todoItem(task)).toBeVisible();
    }
    await expect(page.getByText('4 items left')).toBeVisible();
  });

  test('UI2: complete 2 tasks and assert they moved to Completed', async ({ page }) => {
    const todoPage = new TodoPage(page);
    const completedTasks = ['Task-Reading', 'Task-Writing'];

    await todoPage.open();
    await todoPage.addDefaultTasks();

    for (const task of completedTasks) {
      await todoPage.completeTask(task);
      await expect(todoPage.todoItem(task)).toHaveClass(/completed/);
    }

    await todoPage.completedFilter().click();

    await expect(todoPage.todoItems()).toHaveCount(2);
    for (const task of completedTasks) {
      await expect(todoPage.todoItem(task)).toBeVisible();
    }
    await expect(todoPage.todoItem('Task-Sleeping')).toHaveCount(0);
    await expect(todoPage.todoItem('Task-Running')).toHaveCount(0);
  });

  test('UI3: complete remaining tasks, clear all, and assert the list is empty', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.open();
    await todoPage.addDefaultTasks();
    await todoPage.completeAllVisibleTasks();

    await expect(todoPage.clearCompletedButton()).toBeVisible();
    await todoPage.clearCompletedButton().click();

    await expect(todoPage.todoItems()).toHaveCount(0);
    await expect(todoPage.newTodoInput()).toBeVisible();
    await expect(page.getByText('items left')).toHaveCount(0);
  });
});
