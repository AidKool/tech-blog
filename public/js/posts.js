const deleteBtns = document.querySelectorAll('.delete-btn');
const postFormContainer = document.querySelector('.post-form-container');
const postForm = document.querySelector('.post-form');
const addPostBtn = document.querySelector('.add-post');
const firstPost = document.querySelector('.first-post');

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

const toggleAddPost = () => {
  const postFormHeight = postForm.getBoundingClientRect().height;
  postFormContainer.style.height = `${postFormHeight}px`;
  addPostBtn.style.display = 'none';
  if (firstPost) firstPost.style.display = 'none';
};

addPostBtn.addEventListener('click', toggleAddPost);

const submitPost = async (event) => {
  event.preventDefault();

  console.log('submitted');

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

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

postForm.addEventListener('submit', submitPost);
