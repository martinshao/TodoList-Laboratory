import {
  v4 as uuidv4
} from 'uuid';

export default class Todo {

  constructor(title) {
    this.id = uuidv4();
    this.title = title;
    this.completed = false;
  }
}