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
</script>

<div class={styles.homeContainer}>
	<div class={styles.inputCard}>
		<input
			type="text"
			placeholder="What did you eat?"
			bind:value={foodInput}
			on:keydown={handleKeydown}
			class={styles.foodInput}
		/>
	</div>
</div>