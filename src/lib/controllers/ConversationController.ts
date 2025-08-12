// src/lib/controllers/ConversationController.ts

export interface Message {
	id: string;
	content: string;
	role: 'user' | 'assistant';
	timestamp: Date;
}

export interface ConversationState {
	messages: Message[];
	isLoading: boolean;
	error: string | null;
}

export class ConversationController {
	private state: ConversationState = {
		messages: [],
		isLoading: false,
		error: null
	};

	private listeners: Array<(state: ConversationState) => void> = [];

	// Subscribe to state changes
	subscribe(listener: (state: ConversationState) => void) {
		this.listeners.push(listener);
		// Return unsubscribe function
		return () => {
			const index = this.listeners.indexOf(listener);
			if (index > -1) {
				this.listeners.splice(index, 1);
			}
		};
	}

	// Notify all listeners of state changes
	private notify() {
		this.listeners.forEach((listener) => listener({ ...this.state }));
	}

	// Get current state
	getState(): ConversationState {
		return { ...this.state };
	}

	// Send a message to OpenAI
	async sendMessage(content: string, model: string = 'gpt-4o'): Promise<void> {
		if (!content.trim() || this.state.isLoading) {
			return;
		}

		// Add user message
		const userMessage: Message = {
			id: this.generateId(),
			content: content.trim(),
			role: 'user',
			timestamp: new Date()
		};

		this.state.messages.push(userMessage);
		this.state.isLoading = true;
		this.state.error = null;
		this.notify();

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					message: content,
					model: model
				})
			});

			const data = await response.json();

			if (data.success) {
				// Add assistant response
				const assistantMessage: Message = {
					id: this.generateId(),
					content: data.response,
					role: 'assistant',
					timestamp: new Date()
				};

				this.state.messages.push(assistantMessage);
				this.state.error = null;
			} else {
				this.state.error = data.error || 'Failed to get response';
				console.error('API Error:', data.error);
			}
		} catch (error) {
			this.state.error = 'Network error occurred';
			console.error('Request failed:', error);
		} finally {
			this.state.isLoading = false;
			this.notify();
		}
	}

	// Clear conversation
	clearConversation(): void {
		this.state.messages = [];
		this.state.error = null;
		this.notify();
	}

	// Generate unique ID for messages
	private generateId(): string {
		return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
	}
}
