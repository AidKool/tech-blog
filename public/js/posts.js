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

const deleteBtns = document.querySelectorAll('.delete-btn');

deleteBtns.forEach((deleteBtn) => {
  deleteBtn.addEventListener('click', deletePost);
});
