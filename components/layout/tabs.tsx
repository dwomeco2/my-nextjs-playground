export default [
	{
		name: "Preview Card",
		pageName: "PreviewCard",
		labels: ["tailwind", "react-image"]
	} as const,
	{
		name: "Profile Card",
		pageName: "ProfileCard",
		labels: ["tailwind", "react-image"]
	} as const,
	{
		name: "Pricing Component",
		pageName: "PricingComponent",
		labels: ["tailwind"]
	} as const,
	{
		name: "Countdown timer",
		pageName: "CountdownTimer",
		labels: ["tailwind", "useInterval"]
	} as const,
	{
		name: "Sidebar Component",
		pageName: "SidebarComponent",
		labels: ["react-icons", "tailwind"]
	} as const,
	// {name: 'Image Slider', comp: <ImageSlider key={nanoid()}/>, labels: ['react-transition-group', 'tailwind']} as const,
	{
		name: "Masonry layout",
		pageName: "MasonryLayout",
		labels: ["react-image", "intersection observer", "layout animation", "tailwind", "jotai", "view transition"]
	} as const
	// {name: 'Hacker News', comp: <HackerNews key={nanoid()}/>, labels: ['jotai', 'react-query', 'zod', 'intersection observer', 'tailwind']} as const,
	// {name: 'Library encounterd issues log', comp: <IssuesWithLibrary key={nanoid()}/>, labels: []} as const,
	// {name: 'TodoList', comp: <TodoList key={nanoid()}/>, labels: ['react-dnd', 'zod', 'react-icons', 'tailwind']} as const,
	// {name: '2048', comp: <Game2048 key={nanoid()}/>, labels: ['react-spring', 'react-swipeable', 'jotai', 'zod', 'tailwind']} as const,
].reverse()
