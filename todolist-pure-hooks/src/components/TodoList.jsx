import React, { useContext } from 'react'
import { List, Tag, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';

import { TodoListContext } from '../context/index'

export default function TodoList() {
  const { todoList, removeTodoItem, markAsCompleted } = useContext(TodoListContext)

  console.info(todoList)

  return (
    <div className='table'>
      <List
        bordered
        dataSource={todoList}
        renderItem={
          (item) => (
            <List.Item key={item.id}>
              {item.label}
              <Button
                type="primary"
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => {
                  removeTodoItem(item.id)
                }}/>
              <Button
                type="primary"
                shape="circle"
                onClick={() => {
                  markAsCompleted(item.id)
                }}>
                completed
              </Button>
              {item.completed && <Tag color="success">success</Tag>}
            </List.Item>
          )
        }
      />
    </div >
  )
}
