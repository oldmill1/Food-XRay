<!-- src/lib/views/Home/Home.svelte -->
<script lang="ts">
	import styles from '$lib/views/Home/Home.module.scss';
	import FoodInputForm from '$lib/components/FoodInputForm/FoodInputForm.svelte';
	import { ConversationController } from '$lib/controllers/ConversationController';
	import { onMount } from 'svelte';

	let foodInput = '';
	let isLoading = false;

	// Create conversation controller instance
	const conversationController = new ConversationController();

	onMount(() => {
		// Subscribe to conversation state changes
		// Cleanup subscription on component destroy
		return conversationController.subscribe((state) => {
			isLoading = state.isLoading;

			// Log the latest assistant message for now
			if (state.messages.length > 0) {
				const latestMessage = state.messages[state.messages.length - 1];
				if (latestMessage.role === 'assistant') {
					console.log('OpenAI Response:', latestMessage.content);
				}
			}

			// Log any errors
			if (state.error) {
				console.error('Conversation Error:', state.error);
			}
		});
	});

	async function handleSubmit(event: CustomEvent<string>) {
		const message = event.detail;
		console.log('Analyzing:', message);

		// Send message through controller
		await conversationController.sendMessage(message);

		// Clear input on successful submission (when not loading anymore)
		const state = conversationController.getState();
		if (!state.isLoading && !state.error) {
			foodInput = '';
		}
	}

	function handleTakePicture() {
		console.log('Taking picture...');
		// We'll implement camera functionality later
	}
</script>

<div class={styles.homeContainer}>
	<FoodInputForm
		bind:value={foodInput}
		{isLoading}
		on:submit={handleSubmit}
		on:takePicture={handleTakePicture}
	/>
</div>