import { Page } from '@playwright/test';

const TASKS = [
  'Task-Reading',
  'Task-Writing',
  'Task-Sleeping',
  'Task-Running',
] as const;

export class TodoPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto('https://demo.playwright.dev/todomvc');
  }

  newTodoInput() {
    return this.page.getByPlaceholder('What needs to be done?');
  }

  todoItems() {
    return this.page.getByRole('listitem').filter({
      has: this.page.getByRole('checkbox', { name: 'Toggle Todo' }),
    });
  }

  todoItem(name: string) {
    return this.todoItems().filter({ hasText: name });
  }

  async addTask(name: string) {
    await this.newTodoInput().fill(name);
    await this.newTodoInput().press('Enter');
  }

  async addDefaultTasks() {
    for (const task of TASKS) {
      await this.addTask(task);
    }
  }

  async completeTask(name: string) {
    await this.todoItem(name).getByRole('checkbox').check();
  }

  async completeAllVisibleTasks() {
    const items = this.todoItems();
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      await items.nth(i).getByRole('checkbox').check();
    }
  }

  completedFilter() {
    return this.page.getByRole('link', { name: 'Completed' });
  }

  clearCompletedButton() {
    return this.page.getByRole('button', { name: 'Clear completed' });
  }
}

export { TASKS };
