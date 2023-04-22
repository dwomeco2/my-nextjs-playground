import {z} from 'zod';

export const topStoriesSchema = z.array(z.number()).default([]);

export const storySchema = z.object({
	id: z.number(),
	deleted: z.boolean().optional().default(false),
	type: z.string(),
	by: z.string().optional().default(''),
	time: z.number().optional(),
	dead: z.boolean().optional().default(false),
	kids: z.array(z.number()).optional().default([]),
	descendants: z.number().optional(),
	score: z.number().optional(),
	title: z.string().optional().default(''),
	url: z.string().optional().default(''),
});

export const commentSchema = z.object({
	id: z.number(),
	deleted: z.boolean().optional().default(false),
	type: z.string(),
	by: z.string().optional().default(''),
	time: z.number().optional(),
	kids: z.array(z.number()).optional().default([]),
	parent: z.number().optional(),
	text: z.string().optional().default(''),
});

export const itemSchema = storySchema.merge(commentSchema);

export type HackerNewsItemType = z.infer<typeof itemSchema>;
