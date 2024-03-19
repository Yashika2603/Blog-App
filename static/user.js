async function username(){
    const response = await axios('/getUsername');
    const Name = response.data;
    console.log(Name);
    const name = document.getElementById("name");
    name.innerText = Name;
}
async function showBlogs() {
    try {
        const response = await axios('/getUserBlogs');
        const blogs = response.data;

        const blogsContainer = document.getElementById('UserBlogsContainer');
        blogsContainer.innerHTML = '<h3>Your Blogs</h3>';
        
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


username();
showBlogs();
    document.getElementById("showPopupButton").addEventListener("click",()=>{
        document.getElementById("addBlogFormContainer").style.display="block";
    })
    document.getElementById("closePopupButton").addEventListener("click",()=>{
        document.getElementById("addBlogFormContainer").style.display="none";
    })

    document.getElementById("btn").addEventListener("click",()=>{
        document.getElementById("addBlogFormContainer").style.display="none";
    })

