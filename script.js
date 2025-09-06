const submission = (e) =>{
    e.preventDefault();
    if (e.target.name.value.length==0)
    {
        alert("Enter Name");
        return;
    }

    if (e.target.email.value.length==0)
    {
        alert("Enter Email");
        return;
    }

    if (e.target.userid.value.length==0)
    {
        alert("Enter Userid");
        return;
    }

    if (e.target.password.value!=e.target.cpassword.value)
    {
        alert("Password did not match");
        return;
    }

    let name, email, contact, userid, password;
        name=document.getElementById("name").value;
        email=document.getElementById("email").value;
        contact=document.getElementById("number").value;
        userid=document.getElementById("userid").value;
        password=document.getElementById("password").value;

    let user_records=new Array();
    user_records=JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[];

    if(user_records.some((v)=>{return v.userid==userid}))
    {
        alert("UserId already exist");
    }
    else
    {
        user_records.push(
            {
                "name":name,
                "email":email,
                "contact":contact,
                "userid":userid,
                "password":password
            }
        )
        localStorage.setItem("users",JSON.stringify(user_records));
        alert("Your account has been created");
        window.location.assign("login.html");
    }
}

const saveData = (e) =>{
    e.preventDefault();
    let userid, password;

        userid=document.getElementById("uid").value;
        password=document.getElementById("pwd").value;

    let user_records=new Array();
    user_records=JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[];

    if(user_records.some((v)=>{return v.userid==userid && v.password==password}))
    {
        alert("Login Successful");
        let cur_user=user_records.filter((v)=>{return v.userid==userid && v.password==password})[0]

        localStorage.setItem("name", cur_user.name);
        localStorage.setItem("userid", cur_user.userid);
        window.location.replace("profile.html");
    }
    else
    {
        alert("Wrong userid or password");
    }
}

n =  new Date();
y = n.getFullYear();
m = n.getMonth() + 1;
d = n.getDate();
document.getElementById("date").innerHTML =  "Date:- " + d + "/" + m + "/" + y;

const post = () =>{
    let story = document.getElementById("text").value;
    let da = d + "/" + m + "/" + y;
    let head = document.getElementById("head").value;

    let blog_records=new Array();
    blog_records=JSON.parse(localStorage.getItem(localStorage.getItem("userid")))?JSON.parse(localStorage.getItem(localStorage.getItem("userid"))):[];

    blog_records.push({
        "date":da,
        "story":story,
        "head": head
    })

    localStorage.setItem(localStorage.getItem("userid"),JSON.stringify(blog_records));

    show();
}
//show(); //to directly display the blogs of that user id

const show = () =>{
    let elmnt = document.getElementById("output1");
    if(elmnt!=null)
    {
        elmnt.remove();
    }

    let output=document.querySelector('.output');
    let output1=document.createElement('div');
    output1.setAttribute("id","output1");
    output.appendChild(output1);

    let box = document.createElement('div');
    box.setAttribute("id","div");
    box.style.width='100%';
    box.style.marginTop = '1px';
    box.style.marginBottom = '10px';
    box.style.background='rgb(255,0,0)';
    box.style.textAlign='center';
    output1.appendChild(box);
    let line=document.createElement('h2');
    line.style.color='white';
    box.appendChild(line).innerHTML="My Stories";

    JSON.parse(localStorage.getItem(localStorage.getItem("userid"))).forEach((element,index) => {
            let content_box = document.createElement('div');
            content_box.setAttribute("id",`div${index}`);
            content_box.style.width='100%'; 
            content_box.style.marginTop = '1px';
            content_box.style.marginBottom = '10px';
            content_box.style.borderRadius = '15px'; 
            content_box.style.background='rgb(255,192,203,0.3)';
            content_box.style.padding='10px';
        
            output1.appendChild(content_box);
    
            let discrib=document.createElement('h5'); 
            discrib.style.color='black';
    
            content_box.appendChild(discrib).innerHTML +=`
                        <h4>Date:-</h4> ${element.date}
                        <h4>Head:-</h4> ${element.head}                       
                       <h4>Story:-</h4> ${element.story}
                       <div style="width: 150px; margin-top: 10px; margin-left: 1300px;">
                            <button onclick="edit(this)" style="padding: 2px; padding-left: 10px; padding-right: 10px;" class="btn">Edit</button>
                            <button onclick="remove(this)" style="margin-left: 20px; padding: 2px; padding-left: 10px; padding-right: 10px;" class="btn">Delete</button>
                       </div>`;
            
        });
}

const edit = () =>{
    
}

const remove = (ele) =>{
    this.ele = document.getElementById("div1");
    ele.parentElement.parentElement.parentElement.remove();
}

const logout = () =>{
    localStorage.removeItem("userid");
    localStorage.removeItem("name");
    window.location.replace("login.html");
}