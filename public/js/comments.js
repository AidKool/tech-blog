const commentFormContainer = document.querySelector('.comment-form-container');
const commentForm = document.querySelector('.comment-form');
const addCommentBtn = document.querySelector('.add-comment');
const cancelBtn = document.querySelector('.cancel-btn');
const firstComment = document.querySelector('.first-comment');

const commentFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector('#comment').value.trim();
  const cardHeader = document.querySelector('.card header.card-header');
  const postId = cardHeader.dataset.postid;

  if (content) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ content, post_id: postId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to post comment');
    }
  }
};

commentForm.addEventListener('submit', commentFormHandler);

const showAddCommentForm = () => {
  const commentFormHeight = commentForm.getBoundingClientRect().height;
  commentFormContainer.style.height = `${commentFormHeight}px`;
  addCommentBtn.style.display = 'none';
  firstComment.style.display = 'none';
};

addCommentBtn.addEventListener('click', showAddCommentForm);

const hideAddCommentForm = () => {
  commentFormContainer.style.height = 0;
  const commentList = document.querySelector('.comment-list');
  setTimeout(() => {
    addCommentBtn.style.display = 'block';
    if (!commentList) {
      firstComment.style.display = 'block';
    }
  }, 350);
};

cancelBtn.addEventListener('click', hideAddCommentForm);
