const commentFormContainer = document.querySelector('.comment-form-container');
const commentForm = document.querySelector('.comment-form');
const addCommentBtn = document.querySelector('.add-comment');
const cancelBtn = document.querySelector('.cancel-btn');
const firstComment = document.querySelector('.first-comment');
const deleteBtns = document.querySelectorAll('.delete-btn');
const editBtns = document.querySelectorAll('.edit-btn');

const submitComment = async (event) => {
  event.preventDefault();

  const content = document.querySelector('#comment').value.trim();
  const articleHeader = document.querySelector('.article-header');
  const postId = articleHeader.dataset.postid;

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

const showAddCommentForm = () => {
  const commentFormHeight = commentForm.getBoundingClientRect().height;
  commentFormContainer.style.height = `${commentFormHeight}px`;
  addCommentBtn.style.display = 'none';
  if (firstComment) {
    firstComment.style.display = 'none';
  }
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

const deleteComment = async (event) => {
  const id = event.currentTarget.parentElement.parentElement.dataset.commentid;
  const response = await fetch(`/api/comments/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.reload();
  } else {
    alert('Failed to delete comment');
  }
};

deleteBtns.forEach((deleteBtn) => {
  deleteBtn.addEventListener('click', deleteComment);
});

const updateComment = async (event) => {
  event.preventDefault();

  const id = JSON.parse(localStorage.getItem('commentId'));
  const content = document.querySelector('#comment').value.trim();

  if (content) {
    const response = await fetch(`/api/comments/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ content }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      localStorage.clear();
      document.location.reload();
    } else {
      alert('Failed to update the comment.');
    }
  }
};

const loadComment = async (event) => {
  const id = event.currentTarget.parentElement.parentElement.dataset.commentid;
  localStorage.setItem('commentId', id);

  const response = await fetch(`/api/comments/${id}`);
  const data = await response.json();
  showAddCommentForm();
  document.querySelector('#comment').value = data.content;
};

editBtns.forEach((editBtn) => {
  editBtn.addEventListener('click', loadComment);
});

commentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (JSON.parse(localStorage.getItem('commentId'))) {
    updateComment(event);
  } else {
    submitComment(event);
  }
});
