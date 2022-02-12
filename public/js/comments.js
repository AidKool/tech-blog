/* eslint-disable no-undef */
const commentFormContainer = document.querySelector('.comment-form-container');
const commentForm = document.querySelector('.comment-form');
const addCommentBtn = document.querySelector('.add-comment');
const cancelBtn = document.querySelector('.cancel-btn');
const firstComment = document.querySelector('.first-comment');
const deleteBtns = document.querySelectorAll('.delete-btn');
const editBtns = document.querySelectorAll('.edit-btn');

const submitComment = async (event) => {
  event.preventDefault();

  const content = tinymce.activeEditor.getContent();
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
  commentFormContainer.style.height = `auto`;
  addCommentBtn.style.display = 'none';
  if (firstComment) {
    firstComment.style.display = 'none';
  }
};

addCommentBtn.addEventListener('click', showAddCommentForm);

const hideAddCommentForm = () => {
  commentFormContainer.style.height = 0;
  const commentList = document.querySelector('.comment-list');
  addCommentBtn.style.display = 'block';
  if (!commentList) {
    firstComment.style.display = 'block';
  }
};

cancelBtn.addEventListener('click', () => {
  if (commentForm.dataset.commentid) {
    commentForm.removeAttribute('data-commentid');
  }
  hideAddCommentForm();
});

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

  const id = commentForm.dataset.commentid;
  const content = tinymce.activeEditor.getContent();

  if (content) {
    const response = await fetch(`/api/comments/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ content }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to update the comment.');
    }
  }
};

const loadComment = async (event) => {
  const id = event.currentTarget.parentElement.parentElement.dataset.commentid;
  commentForm.setAttribute('data-commentid', id);

  const response = await fetch(`/api/comments/${id}`);
  const data = await response.json();
  showAddCommentForm();
  tinymce.activeEditor.setContent(data.content);
};

editBtns.forEach((editBtn) => {
  editBtn.addEventListener('click', loadComment);
});

commentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (commentForm.dataset.commentid) {
    updateComment(event);
  } else {
    submitComment(event);
  }
});

tinymce.init({
  selector: 'textarea',
});
