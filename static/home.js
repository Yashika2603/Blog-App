async function showBlogs() {
    try {
        const response = await axios('/getBlogs');
        const blogs = response.data;

        const blogsContainer = document.getElementById('allBlogsContainer');
        blogsContainer.innerHTML = '<h3>Discover</h3>';

        blogs.forEach(blog => {
            if(blog.status==="Approved"){
                blogsContainer.innerHTML += `
                    <div class="blog">
                        <h4>${blog.title}</h4>
                        <p>${blog.content}</p>
                        <p>${blog.category}</p>
                    </div>`;
                }
            });
    } catch (error) {
        console.error(error);
    }
}
showBlogs();  
