import { nanoid } from "nanoid"
import React, { useCallback, useMemo, useRef, useState } from "react"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { CgSearch } from "react-icons/cg"
import { FaTrash } from "react-icons/fa"
import { z } from "zod"

import styles from "./index.module.css"

type TodoListProps = {
	id: string
	text: string
	isChecked?: boolean
}

const dragItem = z.object({ id: z.string(), index: z.number() })
type DragItemType = z.infer<typeof dragItem>

type TodoItemProps = {
	todo: TodoListProps
	index: number
	setTodos: React.Dispatch<React.SetStateAction<TodoListProps[]>>
}

function TodoItem(props: TodoItemProps) {
	const { todo, index, setTodos } = props

	const { text, isChecked } = todo

	const ref = useRef<HTMLDivElement>(null)

	const dragItem: DragItemType = { ...todo, index }

	const [, drop] = useDrop(
		{
			accept: "todo",
			hover(item: DragItemType, monitor) {
				if (!ref.current) {
					return
				}

				const dragIndex = item.index
				const hoverIndex = index
				// Don't replace items with themselves
				if (dragIndex === hoverIndex) {
					return
				}

				// Determine mouse position
				const clientOffset = monitor.getClientOffset()
				if (!clientOffset) {
					return
				}

				// Determine rectangle on screen
				const hoverBoundingRect = ref.current?.getBoundingClientRect()
				// Get vertical middle
				const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

				// Get pixels to the top
				const hoverClientY = clientOffset.y - hoverBoundingRect.top
				// Only perform the move when the mouse has crossed half of the items height
				// When dragging downwards, only move when the cursor is below 50%
				// When dragging upwards, only move when the cursor is above 50%
				// Dragging downwards
				if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
					return
				}

				// Dragging upwards
				if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
					return
				}

				// console.log(`UPDATE: hoverID: ${todo.id}(${todo.index}), dragID: ${item.id}(${item.index})`);
				handleDrop(dragIndex, hoverIndex)

				item.index = hoverIndex
			}
		},
		[dragItem]
	)

	const [, drag] = useDrag(
		{
			type: "todo",
			item: dragItem
		},
		[dragItem]
	)

	drag(drop(ref))

	const handleTodoChecked = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
		setTodos(prev => {
			const newTodos = [...prev]
			newTodos.map(todo => {
				if (todo.id === id) {
					todo.isChecked = event.target.checked
				}
				return todo
			})
			return newTodos
		})
	}

	const handleDrop = (dragIndex: number, hoverIndex: number) => {
		setTodos(prev => {
			const updatedList = [...prev]
			if (updatedList[hoverIndex] && updatedList[dragIndex]) {
				const tmp = updatedList[hoverIndex] as TodoListProps
				updatedList[hoverIndex] = updatedList[dragIndex] as TodoListProps
				updatedList[dragIndex] = tmp
			}

			return updatedList
		})
	}

	const deleteTodoItem = (id: string) => {
		setTodos(prev => prev.filter(todo => todo.id !== id))
	}

	return (
		<div ref={ref} className={`${styles.todoitem ?? ""}`}>
			<div className="flex items-center rounded-md hover:bg-gray-800">
				<div className="flex grow ">
					<div className="flex items-center px-1">
						<input
							checked={isChecked ?? false}
							id="checked-checkbox"
							type="checkbox"
							value=""
							className="h-4 w-4 rounded bg-gray-200 accent-green-600"
							onChange={e => {
								handleTodoChecked(todo.id, e)
							}}
						/>
					</div>
					<div
						className={`grow border-gray-300 px-1 py-2 text-start text-gray-200 ${
							isChecked ? "line-through" : ""
						} cursor-pointer`}
					>
						{text}
					</div>
					<button
						type="button"
						className="rounded-md px-1 py-2 text-lg text-gray-200 hover:bg-gray-800"
						onClick={() => {
							deleteTodoItem(todo.id)
						}}
					>
						<FaTrash />
					</button>
				</div>
			</div>
		</div>
	)
}

function TodoContainer({ children, className }: { children: JSX.Element[] | JSX.Element; className: string }) {
	const [, drop] = useDrop(() => ({
		accept: "todo"
	}))

	return (
		<div ref={drop} className={className}>
			{children}
		</div>
	)
}

function TodoList() {
	const [todos, setTodos] = useState<TodoListProps[]>([])
	const [inputValue, setInputValue] = useState("")

	const handleInputChange = (event: { target: { value: React.SetStateAction<string> } }) => {
		const changedValue = (event.target.value as string).trimStart()
		if (inputValue !== changedValue) {
			setInputValue(changedValue)
		}
	}

	const handleFormSubmit = useCallback(
		(event: { preventDefault: () => void }) => {
			event.preventDefault()
			if (inputValue.length !== 0) {
				setTodos(prev => [...prev, { id: nanoid(), text: inputValue, isChecked: false }])
				setInputValue("")
			}
		},
		[inputValue]
	)

	const todosItem = useMemo(
		() => (
			<TodoContainer className="list-container max-h-[32rem]">
				{todos.map((item, index) => (
					<TodoItem key={item.id} index={index} setTodos={setTodos} todo={item} />
				))}
			</TodoContainer>
		),
		[todos]
	)

	return (
		<div className="mx-auto max-w-2xl rounded-md bg-gray-900 p-2 text-gray-800">
			<div>
				<h1 className="mb-2 text-2xl font-bold text-gray-300">Todo List</h1>
			</div>
			<form className={`flex gap-2 outline-0 ${todos[0] ? "mb-4" : ""}`} onSubmit={handleFormSubmit}>
				<div className="relative flex grow">
					<div className="absolute-center-y left-2 text-gray-300">
						<CgSearch />
					</div>
					<input
						type="text"
						value={inputValue}
						placeholder="Add a task"
						className="reset-input flex-1 rounded-md bg-gray-600 p-2 pl-8 text-gray-200 placeholder-gray-500"
						onChange={handleInputChange}
					/>
				</div>
			</form>
			<DndProvider backend={HTML5Backend}>{todosItem}</DndProvider>
		</div>
	)
}

export default TodoList
