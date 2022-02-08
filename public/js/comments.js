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

document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);
