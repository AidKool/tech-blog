/* eslint-disable no-undef */
const deleteBtns = document.querySelectorAll('.delete-btn');
const editBtns = document.querySelectorAll('.edit-btn');
const postFormContainer = document.querySelector('.post-form-container');
const postForm = document.querySelector('.post-form');
const addPostBtn = document.querySelector('.add-post');
const firstPost = document.querySelector('.first-post');
const cancelBtn = document.querySelector('.cancel-btn');

const deletePost = async (event) => {
  const id = event.currentTarget.parentElement.parentElement.dataset.postid;
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.reload();
  } else {
    alert('Failed to delete post');
  }
};

deleteBtns.forEach((deleteBtn) => {
  deleteBtn.addEventListener('click', deletePost);
});

const showAddPostForm = () => {
  postFormContainer.style.height = 'auto';
  addPostBtn.style.display = 'none';
  if (firstPost) {
    firstPost.style.display = 'none';
  }
};

const hideAddPostForm = () => {
  postFormContainer.style.height = 0;
  const postList = document.querySelector('.post-list');
  addPostBtn.style.display = 'block';
  if (!postList) {
    firstPost.style.display = 'block';
  }
};

addPostBtn.addEventListener('click', showAddPostForm);
cancelBtn.addEventListener('click', hideAddPostForm);

const submitPost = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = tinymce.activeEditor.getContent();

  if (title && content) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to add the post.');
    }
  }
};

const updatePost = async (event) => {
  event.preventDefault();

  const id = postForm.dataset.postid;

  const title = document.querySelector('#post-title').value.trim();
  const content = tinymce.activeEditor.getContent();

  if (title && content) {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to add the post.');
    }
  }
};

const loadPost = async (event) => {
  const id = event.currentTarget.parentElement.parentElement.dataset.postid;
  postForm.setAttribute('data-postid', id);

  const response = await fetch(`posts/${id}`, {
    method: 'GET',
    headers: { action: 'edit' },
  });
  const data = await response.json();
  showAddPostForm();
  document.querySelector('#post-title').value = data.title;
  tinymce.activeEditor.setContent(data.content);
};

editBtns.forEach((editBtn) => {
  editBtn.addEventListener('click', loadPost);
});

postForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (postForm.dataset.postid) {
    updatePost(event);
  } else {
    submitPost(event);
  }
});

tinymce.init({
  selector: 'textarea',
});
