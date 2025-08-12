<!-- src/lib/views/Home/Home.svelte -->
<script lang="ts">
	import styles from '$lib/views/Home/Home.module.scss';
	import FoodInputForm from '$lib/components/FoodInputForm/FoodInputForm.svelte';

	let foodInput = '';
	let isLoading = false;

	async function handleSubmit(event: CustomEvent<string>) {
		const message = event.detail;
		isLoading = true;
		console.log('Analyzing:', message);

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					message: message,
					model: 'gpt-4o'
				})
			});

			const data = await response.json();

			if (data.success) {
				console.log('OpenAI Response:', data.response);
				// Clear the input after successful submission
				foodInput = '';
			} else {
				console.error('API Error:', data.error);
			}
		} catch (error) {
			console.error('Request failed:', error);
		} finally {
			isLoading = false;
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