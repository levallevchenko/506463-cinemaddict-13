import {EMOJIS} from "../const.js";
import SmartView from "./smart.js";
import {generateTemplate} from "../utils/render.js";

const createCommentTemplate = (commentElement) => {
  const {emoji, comment, commentDate, author} = commentElement;

  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${commentDate}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
};

const createEmojiTemplate = (emoji) => {
  return `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji} checked">
    <label class="film-details__emoji-label" for="emoji-${emoji}">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji-${emoji}">
    </label>`;
};


const createCommentsListTemplate = (film) => {
  const {comments} = film;

  const commentTemplate = generateTemplate(comments, createCommentTemplate);
  const emojiTemplate = generateTemplate(EMOJIS, createEmojiTemplate);

  return `<div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
          ${commentTemplate}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label">

          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            ${emojiTemplate}
          </div>
        </div>
      </section>
    </div>`;
};

export default class Comments extends SmartView {
  constructor(film) {
    super();
    this._film = film;

    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this.setEmojiClickHandler(this._emojiClickHandler);
  }

  _getTemplate() {
    return createCommentsListTemplate(this._film);
  }

  createCommentsEmoji(evt) {
    const emojiName = evt.target.value.split(` `, 1);
    const commentsEmoji = `<img src="images/emoji/${emojiName}.png" width="55" height="55" alt="${emojiName}" value="${emojiName}"></img>`;

    return commentsEmoji;
  }

  _chooseEmoji(evt) {
    const emojiContainer = document.querySelector(`.film-details__add-emoji-label`);
    emojiContainer.removeChild(emojiContainer.firstChild);

    const emoji = this.createCommentsEmoji(evt);
    emojiContainer.innerHTML = emoji;
  }

  _emojiClickHandler(evt) {
    if (evt.target.classList.contains(`film-details__emoji-item`)) {
      evt.preventDefault();
      this._chooseEmoji(evt);
    }
  }

  setEmojiClickHandler() {
    const emojiList = this.getElement().querySelector(`.film-details__emoji-list`);
    emojiList.addEventListener(`click`, this._emojiClickHandler);
  }
}
