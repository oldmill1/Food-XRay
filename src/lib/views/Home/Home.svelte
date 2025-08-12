<!-- src/lib/views/Home/Home.svelte -->
<script lang="ts">
	import styles from '$lib/views/Home/Home.module.scss';

	let foodInput = '';

	function handleSubmit() {
		if (foodInput.trim()) {
			console.log('Analyzing:', foodInput);
			// We'll implement the actual analysis logic later
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
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
		></textarea>

		<div class={styles.buttonContainer}>
			<button
				class={styles.takePictureButton}
				on:click={handleTakePicture}
			>
				🖼️
			</button>
		</div>
	</div>
</div>