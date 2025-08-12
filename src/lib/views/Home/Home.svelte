<!-- src/lib/views/Home/Home.svelte -->
<script lang="ts">
	import styles from '$lib/views/Home/Home.module.scss';

	let foodInput = '';
	let isLoading = false;

	async function handleSubmit() {
		if (foodInput.trim() && !isLoading) {
			isLoading = true;
			console.log('Analyzing:', foodInput);

			try {
				const response = await fetch('/api/chat', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						message: foodInput,
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
	}

	function handleKeydown(event: KeyboardEvent) {
		// Check for Cmd+Enter (Mac) or Ctrl+Enter (Windows/Linux)
		if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
			event.preventDefault();
			handleSubmit();
		}
	}

	function handleTakePicture() {
		console.log('Taking picture...');
		// We'll implement camera functionality later
	}
</script>

<div class={styles.homeContainer}>
	<div class={styles.inputCard}>
		<textarea
			placeholder="Describe your meal..."
			bind:value={foodInput}
			on:keydown={handleKeydown}
			class={styles.foodInput}
			disabled={isLoading}
		></textarea>

		<div class={styles.buttonContainer}>
			<button
				class={styles.takePictureButton}
				on:click={handleTakePicture}
				disabled={isLoading}
			>
				🖼️
			</button>
		</div>

		{#if isLoading}
			<div style="color: rgba(255, 255, 255, 0.7); text-align: center;">
				Analyzing your meal...
			</div>
		{/if}
	</div>
</div>