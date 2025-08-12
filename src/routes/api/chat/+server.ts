// src/routes/api/chat/+server.ts

import { json } from '@sveltejs/kit';
import OpenAI from 'openai';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from '@sveltejs/kit';

const openai = new OpenAI({
	apiKey: env.OPENAI_API_KEY
});

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { message, model = 'gpt-4o' } = await request.json();

		const completion = await openai.chat.completions.create({
			model: model,
			messages: [{ role: 'user', content: message }],
			max_completion_tokens: 500
		});

		return json({
			success: true,
			response: completion.choices[0]?.message?.content || 'No response generated'
		});
	} catch (error) {
		console.error('OpenAI API error:', error);
		return json(
			{
				success: false,
				error: 'Failed to generate response'
			},
			{ status: 500 }
		);
	}
};
