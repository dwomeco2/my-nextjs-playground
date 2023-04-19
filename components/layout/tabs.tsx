import { nanoid } from "nanoid"
import { lazy } from "react"

const PreviewCardComponent = lazy(async () => import("../../src/pages/PreviewCard"))
const ProfileCardComponent = lazy(async () => import("../../src/pages/ProfileCard"))
// const PricingComponent = lazy(async () => import('../components/PricingComponent'));
// const CountdownTimer = lazy(async () => import('../components/CountdownTimer'));
// const SidebarComponent = lazy(async () => import('../components/SidebarComponent'));
// const ImageSlider = lazy(async () => import('../components/ImageSlider'));
const MasonryLayout = lazy(async () => import("../../src/pages/MasonryLayout"))
// const HackerNews = lazy(async () => import('../components/HackerNews'));
// const IssuesWithLibrary = lazy(async () => import('../components/IssuesWithLibrary'));
// const TodoList = lazy(async () => import('../components/TodoList'));
// const Game2048 = lazy(async () => import('../components/Game2048'));

export default [
	{
		name: "Preview Card",
		pageName: "PreviewCard",
		comp: <PreviewCardComponent key={nanoid()} />,
		labels: ["tailwind", "react-image"]
	} as const,
	{
		name: "Profile Card",
		pageName: "ProfileCard",
		comp: <ProfileCardComponent key={nanoid()} />,
		labels: ["tailwind", "react-image"]
	} as const,
	// {name: 'Pricing Component', comp: <PricingComponent key={nanoid()}/>, labels: ['tailwind']} as const,
	// {name: 'Countdown timer', comp: <CountdownTimer key={nanoid()}/>, labels: ['tailwind', 'useInterval']} as const,
	// {name: 'Sidebar Component', comp: <SidebarComponent key={nanoid()}/>, labels: ['react-icons', 'tailwind']} as const,
	// {name: 'Image Slider', comp: <ImageSlider key={nanoid()}/>, labels: ['react-transition-group', 'tailwind']} as const,
	{
		name: "Masonry layout",
		pageName: "MasonryLayout",
		comp: <MasonryLayout key={nanoid()} />,
		labels: ["react-image", "intersection observer", "layout animation", "tailwind"]
	} as const
	// {name: 'Hacker News', comp: <HackerNews key={nanoid()}/>, labels: ['jotai', 'react-query', 'zod', 'intersection observer', 'tailwind']} as const,
	// {name: 'Library encounterd issues log', comp: <IssuesWithLibrary key={nanoid()}/>, labels: []} as const,
	// {name: 'TodoList', comp: <TodoList key={nanoid()}/>, labels: ['react-dnd', 'zod', 'react-icons', 'tailwind']} as const,
	// {name: '2048', comp: <Game2048 key={nanoid()}/>, labels: ['react-spring', 'react-swipeable', 'jotai', 'zod', 'tailwind']} as const,
].reverse()
