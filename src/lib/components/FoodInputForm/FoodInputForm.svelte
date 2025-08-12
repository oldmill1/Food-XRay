<!-- src/lib/components/FoodInputForm/FoodInputForm.svelte -->
<script lang="ts">
	import styles from './FoodInputForm.module.scss';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		submit: string;
		takePicture: void;
	}>();

	export let value = '';
	export let isLoading = false;

	function handleKeydown(event: KeyboardEvent) {
		// Check for Cmd+Enter (Mac) or Ctrl+Enter (Windows/Linux)
		if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
			event.preventDefault();
			handleSubmit();
		}
	}

	function handleSubmit() {
		if (value.trim() && !isLoading) {
			dispatch('submit', value);
		}
	}

	function handleTakePicture() {
		dispatch('takePicture');
	}
</script>

<div class={styles.inputCard}>
	<textarea
		placeholder="Describe your meal..."
		bind:value
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
		<div class={styles.loadingText}>
			Analyzing your meal...
		</div>
	{/if}
</div>