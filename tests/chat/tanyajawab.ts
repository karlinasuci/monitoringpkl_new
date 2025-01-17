import { expect, type Locator, type Page } from '@playwright/test';

export class PlaywrightTanyaJawabPage {
  readonly page: Page;
  readonly questionInput: Locator;
  readonly sendButton: Locator;
  readonly chatBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.questionInput = page.locator('textarea[placeholder="Ajukan pertanyaan..."]');
    this.sendButton = page.locator('button[type="submit"]');
    this.chatBox = page.locator('.chat-box');
  }

    async gotoTanyaJawabPage() {
    await this.page.goto('http://localhost:8000/tanya-jawab');
  }

    async askQuestion(question: string) {
    await this.questionInput.fill(question);
    await this.sendButton.click();
  }

  
  async verifyQuestionSent(question: string) {
    const lastMessage = this.chatBox.locator('.chat-message:last-child .text');
    await expect(lastMessage).toHaveText(question);
  }

    async verifyTeacherAnswer(answer: string) {
    const lastMessage = this.chatBox.locator('.chat-message:last-child .teacher .text');
    await expect(lastMessage).toHaveText(answer);
  }
}
