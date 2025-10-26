const API_URL = "https://us-west-2.cdn.hygraph.com/content/cmh5fdgsh018x07w0dsn1d0wt/master";

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

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });

    const data = await response.json();
    const posts = data.data.posts;

    const container = document.querySelector("#posts-container");

    if (!posts || posts.length === 0) {
      container.innerHTML = "<p>Nenhuma postagem encontrada.</p>";
      return;
    }

    container.innerHTML = posts.map(post => `
      <article class="blog-card">
        <img src="${post.coverImage.url}" alt="${post.title}" />
        <div class="blog-card-content">
          <h3>${post.title}</h3>
          <small>${new Date(post.publishedAt).toLocaleDateString('pt-BR')}</small>
          <div class="blog-content">${post.content.html}</div>
        </div>
      </article>
    `).join('');
  } catch (error) {
    console.error("Erro ao carregar posts:", error);
    document.querySelector("#posts-container").innerHTML = "<p>Erro ao carregar posts.</p>";
  }
}

carregarPosts();
