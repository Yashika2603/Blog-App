const blogsContainer = document.getElementById('addApproval');

async function showBlogs() {
    try {
        const response = await axios('/getBlogs');
        const blogs = response.data;
        blogs.forEach(blog => {
            if(blog.status === "Pending"){
                blogsContainer.innerHTML += `
                    <div class="blog">
                        <h4>${blog.title}</h4>
                        <p>${blog.content}</p>
                        <p>${blog.category}</p>
                            <button type="submit" class="approve" onclick="approveBlog('${blog._id}'); reloadPage()">Approve</button>
                            <button type="submit" class="reject" onclick="rejectBlog('${blog._id}'); reloadPage()">Reject</button>
                    </div>`;
            }
        });
    } catch (error) {
        console.error(error);
    }
}
async function approveBlog(blogId) {
    try {
        await axios.get(`/approveBlog/${blogId}`);
    } catch (error) {
        console.error(error);
    }
}

async function rejectBlog(blogId) {
    try {
        await axios.get(`/rejectBlog/${blogId}`);
    } catch (error) {
        console.error(error);
    }
}
document.getElementById("showPopupButton").addEventListener("click",()=>{
    document.getElementById("blogForm").style.display="flex";
})
document.getElementById("closePopupButton").addEventListener("click",()=>{
    document.getElementById("blogForm").style.display="none";
})

document.getElementById("btn").addEventListener("click",()=>{
    document.getElementById("blogForm").style.display="none";
})
showBlogs();
function reloadPage() {
    location.reload();
}