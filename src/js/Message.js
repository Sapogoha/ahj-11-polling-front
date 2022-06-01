export default class Message {
  constructor(message) {
    this.id = message.id;
    this.email = message.from;
    this.subject = message.subject;
    this.body = message.body;
    this.received = message.received;
  }

  renderDate(timeStamp) {
    const date = new Date(timeStamp);

    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const mins = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    this.creationDate = `${hours}:${mins} ${day}.${month}.${year}`;
  }

  add() {
    this.renderDate(this.received);

    this.cardEl = document.createElement('div');
    this.cardEl.classList.add('inbox__message');

    this.visiblePart = document.createElement('div');
    this.visiblePart.classList.add('message__top');

    this.idEl = document.createElement('div');
    this.idEl.classList.add('message__id');
    this.idEl.dataset.id = this.id;

    this.nameEl = document.createElement('div');
    this.nameEl.classList.add('message__email');
    this.nameEl.textContent = this.email;

    this.timeEl = document.createElement('div');
    this.timeEl.classList.add('message__time');
    this.timeEl.textContent = this.creationDate;

    this.subjectEl = document.createElement('div');
    this.subjectEl.classList.add('message__subject');
    this.subject.length > 15
      ? (this.subjectEl.textContent = `${this.subject.substring(0, 15)}...`)
      : (this.subjectEl.textContent = this.subject);

    this.bodyEl = document.createElement('div');
    this.bodyEl.classList.add('message__body');
    this.bodyEl.classList.add('hidden');
    this.bodyEl.textContent = this.body;

    this.visiblePart.append(
      this.idEl,
      this.nameEl,
      this.subjectEl,
      this.timeEl,
    );

    this.cardEl.append(this.visiblePart, this.bodyEl);

    this.cardEl.addEventListener('click', () => {
      this.bodyEl.classList.toggle('hidden');
    });

    return this.cardEl;
  }
}
