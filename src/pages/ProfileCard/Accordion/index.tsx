import { useState } from "react"

type AccordionItemProps = {
	title: string
	isToggled: boolean
	content: string
	color: string
	color2: string
	onToggle: () => void
}

function AccordionItem(props: AccordionItemProps): JSX.Element {
	const { onToggle } = props
	// Color cannot construct dynamically because of how tailwindcss works
	return (
		<div className="mb-4 flex">
			<div className={`w-2 ${props.color}`} />
			<div className={`flex w-full flex-col text-start ${props.color2}`}>
				<button type="button" className="flex" onClick={onToggle}>
					<div className="my-3 flex-grow pl-2 text-start">{props.title}</div>
					<div className={"w-12 self-center transition-transform " + (props.isToggled ? "rotate-45" : "")}>+</div>
				</button>
				<div
					className={"overflow-hidden pl-2 pr-12 transition-all " + (props.isToggled ? "max-h-screen p-2" : "max-h-0")}
				>
					{props.content}
				</div>
			</div>
		</div>
	)
}

const accordionItemsData = [
	{
		title: "What is React and why should I learn it?",
		content:
			"React is a popular JavaScript library used for building user interfaces. It allows you to create reusable UI components that can be combined to create complex interfaces. Learning React can help you build modern, scalable web applications and improve your job prospects as a developer.",
		isToggled: false,
		color: "bg-orange-500",
		color2: "bg-orange-200"
	},
	{
		title: "Do I need to know JavaScript before learning React?",
		content:
			"Yes, you should have a good understanding of JavaScript before learning React. React is a JavaScript library, so you need to know the basics of JavaScript such as variables, functions, arrays, and objects. You should also be familiar with concepts like scope, closures, and callbacks.",
		isToggled: false,
		color: "bg-blue-500",
		color2: "bg-blue-200"
	},
	{
		title: "What tools do I need to learn React?",
		content:
			"To get started with React, you need a code editor such as Visual Studio Code or Atom, and a web browser like Chrome or Firefox. You can also use Node.js and npm to set up a development environment and install packages.",
		isToggled: false,
		color: "bg-violet-500",
		color2: "bg-violet-200"
	},
	{
		title: "How do I create a React component?",
		content:
			"To create a React component, you can use the `React.createClass` method or create a class that extends the `React.Component` class. You can define the component's `render` method to return the HTML markup, and use props to pass data to the component.",
		isToggled: false,
		color: "bg-purple-500",
		color2: "bg-purple-200"
	},
	{
		title: "What is JSX and how does it work with React?",
		content:
			"JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files. It's used to create React elements and components, and makes it easier to work with the virtual DOM. JSX is not required to use React, but it's a helpful tool that can make your code more readable and maintainable.",
		isToggled: false,
		color: "bg-green-500",
		color2: "bg-green-200"
	}
]

export default function Accordion() {
	const [accordionItems, setAccordionItems] = useState(accordionItemsData)

	const toggleContent = (index: number) => {
		setAccordionItems(prev => {
			const newAccordionItems = [...prev].map((item, itemIndex) => {
				if (index === itemIndex) {
					return {
						...item,
						isToggled: !item.isToggled
					}
				}
				return item
			})
			return newAccordionItems
		})
	}

	return (
		<div className="flex">
			<div className="mx-auto sm:w-[560px]">
				<div className="my-4 text-center text-[var(--colar-sand-2)]">
					<h3 className="my-1 text-3xl font-bold">Frequently Asked Questions</h3>
					<p className="mx-auto max-w-xs text-sm">Answers to common questions about our frontend challenge website.</p>
				</div>
				<div className="mb-8 text-[var(--colar-sand-11)]">
					{accordionItems.map((props, index) => (
						<AccordionItem
							key={props.title}
							onToggle={() => {
								toggleContent(index)
							}}
							{...props}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
