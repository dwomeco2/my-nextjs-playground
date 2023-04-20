import PuffLoader from "components/share/PuffLoader"
import Image from "next/image"
import { createContext, Suspense, useContext, useState } from "react"

import {
	MdAnalytics,
	MdAvTimer,
	MdHome,
	MdInsertDriveFile,
	MdMenuOpen,
	MdMoreVert,
	MdOutlineLightMode,
	MdOutlineSecurity,
	MdOutlineWhatshot,
	MdSearch,
	MdSupport
} from "react-icons/md"

type ThemeType = "light" | "dark"
type ListContextProp = {
	theme: ThemeType
	isCollapse: boolean
	iconStyle: Record<string, string>
	setIsCollapse: () => void
	toggleTheme: () => void
}

const ListContext = createContext({} as ListContextProp)

function useListContext() {
	const [listContextState, setListContextState] = useState<ListContextProp>({
		theme: "dark",
		isCollapse: false,
		iconStyle: {
			size: "1.3rem"
		},
		setIsCollapse() {
			setListContextState(prev => ({ ...prev, isCollapse: !prev.isCollapse }))
		},
		toggleTheme() {
			setListContextState(prev => ({
				...prev,
				theme: prev.theme === "dark" ? "light" : "dark"
			}))
		}
	})

	return listContextState
}

function ListSpaceExpander() {
	return <div className="flex-1" />
}

function ListDivider() {
	const { theme } = useContext(ListContext)

	const sidebarOnBackgroundColor =
		theme === "dark"
			? "border-[var(--sidebar-on-background-color-dark)]"
			: "border-[var(--sidebar-on-background-color-light)]"

	return (
		<div>
			<hr className={`${sidebarOnBackgroundColor} h-0 border-b border-solid `} />
		</div>
	)
}

function ListInput() {
	const { theme, isCollapse, iconStyle } = useContext(ListContext)

	const collapseClassName = isCollapse ? " hidden " : ""

	const sidebarSurfaceColor =
		theme === "dark" ? "bg-[var(--sidebar-surface-color-dark)]" : "bg-[var(--sidebar-surface-color-light)]"
	const sidebarOnSurfaceColor =
		theme === "dark" ? "text-[var(--sidebar-on-surface-color-dark)]" : "text-[var(--sidebar-on-surface-color-light)]"

	return (
		<div
			className={` ${
				!isCollapse ? sidebarSurfaceColor : ""
			} ${sidebarOnSurfaceColor} w-hull flex h-full items-center overflow-hidden rounded-full px-2 py-2`}
		>
			<i>
				<MdSearch {...iconStyle} />
			</i>
			<input
				type="text"
				className={` ${sidebarSurfaceColor} w-full px-2 text-xs outline-none ${collapseClassName} `}
				placeholder="Search"
			/>
		</div>
	)
}

function ListSection({ title, children }: { title: string; children?: JSX.Element | JSX.Element[] }) {
	const { isCollapse } = useContext(ListContext)

	const collapseClassName = isCollapse ? " text-center text-[0.65rem] " : " text-left px-2 text-xs "

	return (
		<div>
			<div className={` mb-2 font-bold ${collapseClassName}`}>{title}</div>
			{children}
		</div>
	)
}

function ListButton({ onClick, children }: { onClick?: () => void; children?: JSX.Element | JSX.Element[] }) {
	const { theme } = useContext(ListContext)

	const sidebarSurfaceColorHover =
		theme === "dark" ? "hover:bg-[var(--sidebar-surface-color-dark)]" : "hover:bg-[var(--sidebar-surface-color-light)]"
	const sidebarSurfaceColorHoverBorder = "hover:rounded"
	const sidebarOnSurfaceColorHover =
		theme === "dark"
			? "hover:text-[var(--sidebar-on-surface-color-dark)]"
			: "hover:text-[var(--sidebar-on-surface-color-light)]"

	return (
		<div
			className={` ${sidebarSurfaceColorHover} ${sidebarSurfaceColorHoverBorder} ${sidebarOnSurfaceColorHover} flex items-center justify-start p-2 text-xs`}
		>
			<button type="button" className="h-full w-full" onClick={onClick}>
				{children}
			</button>
		</div>
	)
}

function ListItem({ children }: { children?: JSX.Element | JSX.Element[] }) {
	const { theme } = useContext(ListContext)

	const sidebarOnBackgroundColor =
		theme === "dark"
			? "text-[var(--sidebar-on-background-color-dark)]"
			: "text-[var(--sidebar-on-background-color-light)]"

	return <div className={` ${sidebarOnBackgroundColor} my-2 py-2 text-sm `}>{children}</div>
}

// Focus on how to position Icon & text
function IconText({
	children,
	buttonText,
	className = ""
}: {
	children: JSX.Element
	buttonText: string
	className?: string
}) {
	const { isCollapse } = useContext(ListContext)

	const collapseClassName = isCollapse ? " hidden " : ""

	return (
		<div className={`${className} flex h-full w-full items-center `}>
			<i>{children}</i>
			<div className={`pl-2 ${collapseClassName} `}>{buttonText}</div>
		</div>
	)
}

function IconTextButton({
	buttonText,
	onClick,
	iconComponent
}: {
	buttonText: string
	onClick?: () => void
	iconComponent: JSX.Element
}) {
	return (
		<ListButton onClick={onClick}>
			<IconText buttonText={`${buttonText}`}>{iconComponent}</IconText>
		</ListButton>
	)
}

function List({
	width,
	height,
	children
}: {
	width?: string
	height?: string
	children?: JSX.Element | JSX.Element[]
}) {
	const { theme } = useContext(ListContext)

	const styles = {
		width,
		height
	}

	const sidebarBackgroundColor =
		theme === "dark" ? "bg-[var(--sidebar-background-color-dark)]" : "bg-[var(--sidebar-background-color-light)]"
	const sidebarOnBackgroundColor =
		theme === "dark"
			? "text-[var(--sidebar-on-background-color-dark)]"
			: "text-[var(--sidebar-on-background-color-light)]"

	return (
		<div
			className={`flex flex-col overflow-hidden rounded p-2 ${sidebarBackgroundColor} ${sidebarOnBackgroundColor}`}
			style={styles}
		>
			{children}
		</div>
	)
}

function SidebarComponent() {
	const listContextState = useListContext()

	const { isCollapse, iconStyle, setIsCollapse, toggleTheme } = listContextState

	return (
		<ListContext.Provider value={listContextState}>
			<List width={isCollapse ? "53px" : "250px"} height="">
				<ListItem>
					<IconText buttonText="Logoipsum" className="px-2 [&>div:nth-child(2)]:font-bold">
						<MdOutlineWhatshot {...iconStyle} height={`${isCollapse ? "1.3rem" : "2rem"}`} />
					</IconText>
				</ListItem>
				<ListItem>
					<IconTextButton
						buttonText="Collapse Menu"
						iconComponent={<MdMenuOpen {...iconStyle} />}
						onClick={setIsCollapse}
					/>
				</ListItem>
				<ListDivider />
				<ListItem>
					<ListInput />
				</ListItem>
				<ListItem>
					<ListSection title="Home">
						<IconTextButton buttonText="Start" iconComponent={<MdHome {...iconStyle} />} />
						<IconTextButton buttonText="Analytics" iconComponent={<MdAnalytics {...iconStyle} />} />
						<IconTextButton buttonText="IconSecurity" iconComponent={<MdOutlineSecurity {...iconStyle} />} />
					</ListSection>
				</ListItem>
				<ListItem>
					<ListSection title="Reports">
						<IconTextButton buttonText="Timed Reports" iconComponent={<MdAvTimer {...iconStyle} />} />
						<IconTextButton buttonText="Support Center" iconComponent={<MdSupport {...iconStyle} />} />
						<IconTextButton buttonText="Data Reports" iconComponent={<MdInsertDriveFile {...iconStyle} />} />
					</ListSection>
				</ListItem>
				<ListItem>
					<ListSpaceExpander />
				</ListItem>
				<ListItem>
					<IconTextButton
						buttonText="Switch to light Theme"
						iconComponent={<MdOutlineLightMode {...iconStyle} />}
						onClick={toggleTheme}
					/>
				</ListItem>
				<ListDivider />
				<ListItem>
					<div className="flex h-full w-full items-center p-2">
						<Image src="https://picsum.photos/50/50" alt="logo" width="30" height="30" className="rounded-full" />
						{!isCollapse && (
							<>
								<div className="flex w-full flex-1 flex-col items-start pl-2">
									<span className="text-sm font-medium">Benjamin-Leon Kraft</span>
									<span className="text-xs">Product Designer</span>
								</div>
								<button type="button">
									<i>
										<MdMoreVert {...iconStyle} />
									</i>
								</button>
							</>
						)}
					</div>
				</ListItem>
			</List>
		</ListContext.Provider>
	)
}

export default function SideBar() {
	const [toggleEditor, setToggleEditor] = useState(false)

	return (
		<div>
			<div className="mb-2 flex w-full justify-center text-center">
				<div>
					<button
						type="button"
						className="cbtn cbtn-primary"
						onClick={() => {
							setToggleEditor(!toggleEditor)
						}}
					>
						WYSIWYG Editor
					</button>
				</div>
			</div>
			<div className="flex w-full">
				<div>
					<SidebarComponent />
				</div>
				<div className="flex-1">
					<Suspense fallback={<PuffLoader />}>
						{toggleEditor && (
							// eslint-disable-next-line react/iframe-missing-sandbox
							<iframe
								src="https://lihkg-wysiwyg-editor.surge.sh"
								style={{
									width: "100%",
									height: "100%",
									border: 0,
									borderRadius: "4px",
									overflow: "hidden"
								}}
								title="WYSIWYG Editor"
								sandbox="allow-scripts allow-same-origin"
							/>
						)}
					</Suspense>
				</div>
			</div>
		</div>
	)
}
