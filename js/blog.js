const API_UEL = "https://us-west-2.cdn.hygraph.com/content/cmh5fdgsh018x07w0dsn1d0wt/master"

async function carregarPosts() {
  const query = `
  {
    posts(orderBy: publishedAt_DESC) {
      title
      slug
      content {
        html
      }
      coverImage {
        url
      }
      publishedAt
    }
  }
`;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  });

  const data = await response.json();
  const posts = data.data.posts;

  const container = document.querySelector("#posts-container");
  container.innerHTML = posts.map(post => `
    <article class="post">
      <img scr="${post.coverImage.url}" alt="${post.title}"/>
      <h2>${new Date(post.publishedAt).toLocaleDateString()}</small>
      <div>$${post.content.html}</div>
    </article>
  `).join('');
}

carregarPosts();

