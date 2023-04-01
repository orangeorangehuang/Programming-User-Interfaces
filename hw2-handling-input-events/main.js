// NOTE: The variable "shirts" is defined in the shirts.js file as the full list of shirt offerings
//       You can access this variable here, and should use this variable here to build your webpages

let getColorNumAndPreview = (colors) => {
    let cnt = 0;
    let preview_front = "";
    let preview_back = "";
    for (var i in colors) {
        if (preview_front == "") {
            preview_front = colors[i].front; 
            preview_back = colors[i].back; 
        }
        cnt++;
    }
    return {"cnt": cnt, "preview_front": preview_front, "preview_back": preview_back};
}

let closePreview = () => {
    document.getElementById("preview-box").style.display = "none";
    let node_id = localStorage.getItem("prev_shirt");
    console.log(node_id);
    document.getElementById(node_id).scrollIntoView({ behavior: 'smooth', block: 'center' });
}

let triggerHamburger = () => {
    let menuNode = document.getElementById("hamburger-box");
    if (menuNode.style.display == "none") {
        menuNode.style.display = "block";
    } 
    else {
        menuNode.style.display = "none";
    }
}

let detectResizeEvent = () => {
    if (window.innerWidth > 650) {
        document.getElementById("hamburger-box").style.display = "none";
    }
}
window.addEventListener("resize", detectResizeEvent);

let initProducts = () => {
    // To see the shirts object, run:
    // console.log(shirts);

    // Your Code Here
    for (var id in shirts) {
        console.log(shirts[id]);
        let node = document.createElement("div");
        let child_img = document.createElement("img");
        let child_title = document.createElement("div");
        let child_text = document.createElement("div");
        let child_button_box = document.createElement("div");
        let child_button_left = document.createElement("div");
        let child_button_right = document.createElement("div");
        node.id = id;
        node.className = "content-item";
        child_img.className = "content-item-img";
        child_title.className = "content-item-title";
        child_text.className = "content-item-text";
        child_button_box.className = "content-item-button-box"
        child_button_left.className = "content-item-button";
        child_button_right.className = "content-item-button";

        // Missing Values
        let avail_colors = getColorNumAndPreview(shirts[id].colors);
        let avail_colors_front = avail_colors.preview_front? avail_colors.preview_front : shirts[id].default.front;
        let avail_colors_back = avail_colors.preview_back? avail_colors.preview_back : shirts[id].default.back;
        let title = shirts[id].name? shirts[id].name : 'Unnamed T-Shirt';
        let price = shirts[id].price? shirts[id].price : 'Not yet on sale';
        let text = shirts[id].description? shirts[id].description : 'To Be Anounced...';

        child_img.src = avail_colors_front;
        child_title.innerText = title;
        child_text.innerText = "Available in " + avail_colors.cnt + " colors";
        child_button_left.innerText = "Quick View";
        child_button_right.innerText = "See Page";

        // OnClick functions
        child_button_left.onclick = () => {
            let preview_box = document.getElementById("preview-box");
            preview_box.style.display = "flex";
            document.getElementById("preview-img-front").src = avail_colors_front;
            document.getElementById("preview-img-back").src = avail_colors_back;
            document.getElementById("preview-img-front").onclick = () => {
                localStorage.clear();
                localStorage.setItem('id', node.id);
                window.open("details.html", "_self");
            }
            document.getElementById("preview-img-back").onclick = () => {
                localStorage.clear();
                localStorage.setItem('id', node.id);
                window.open("details.html", "_self");
            }
            document.getElementById("preview-title").innerText = title;
            document.getElementById("preview-price").innerText = price;
            document.getElementById("preview-text").innerText = text;
            preview_box.scrollIntoView({ behavior: 'smooth', block: 'center' });
            localStorage.setItem('prev_shirt', node.id);
        }
        child_button_right.onclick = () => {
            localStorage.clear();
            localStorage.setItem('id', node.id);
            window.open("details.html", "_self");
        }
        child_img.onclick = () => {
            localStorage.clear();
            localStorage.setItem('id', node.id);
            window.open("details.html", "_self");
        }

        // Construct Nodes
        node.appendChild(child_img);
        node.appendChild(child_title);
        node.appendChild(child_text);
        child_button_box.appendChild(child_button_left);
        child_button_box.appendChild(child_button_right);
        node.appendChild(child_button_box);
        
        let root_node = document.getElementById("content-container");
        root_node.appendChild(node);
    }
    


};

const appendSideButton = (rootNode, img_front, img_back) => {
    if (img_front) {
        var new_button = document.createElement("div");
        new_button.innerText = "Front";
        new_button.className = "detail-content-side-button";
        new_button.onclick = () => {
            document.getElementById("detail-content-img").src = img_front;
        }
        rootNode.appendChild(new_button);
    }
    if (img_back) {
        var new_button = document.createElement("div");
        new_button.innerText = "Back";
        new_button.className = "detail-content-side-button";
        new_button.onclick = () => {
            document.getElementById("detail-content-img").src = img_back;
        }
        rootNode.appendChild(new_button);
    }
}

let initDetails = () => {
    // To see the shirts object, run:
    // console.log(shirts);

    // Your Code Here
    let product_id = localStorage.getItem("id");
    console.log(product_id);

    // Missing Values
    let avail_colors = getColorNumAndPreview(shirts[product_id].colors);
    let avail_colors_front = avail_colors.preview_front? avail_colors.preview_front : shirts[product_id].default.front;
    let avail_colors_back = avail_colors.preview_back? avail_colors.preview_back : shirts[product_id].default.back;
    let title = shirts[product_id].name? shirts[product_id].name : 'Unnamed T-Shirt';
    let price = shirts[product_id].price? shirts[product_id].price : 'Not yet on sale';
    let text = shirts[product_id].description? shirts[product_id].description : 'To Be Anounced...';

    document.getElementById("detail-title").innerText = title;
    document.getElementById("detail-content-img").src = avail_colors_front;
    document.getElementById("detail-content-price").innerText = price;
    document.getElementById("detail-content-text").innerText = text;

    let side_button_box = document.getElementById("detail-content-side-button-box");
    let color_button_box = document.getElementById("detail-content-color-button-box");
    color_button_box.innerHTML = shirts[product_id].colors? "" : "Not Available";
    side_button_box.innerHTML = shirts[product_id].colors? "" : "Not Available";


    for (var color in shirts[product_id].colors) {
        console.log(color, shirts[product_id].colors[color]);

        if (side_button_box.innerHTML == "") {
            appendSideButton(side_button_box, shirts[product_id].colors[color].front, shirts[product_id].colors[color].back);
        }
        
        var new_button = document.createElement("div");
        new_button.innerText = color.charAt(0).toUpperCase() + color.slice(1);
        new_button.className = "detail-content-color-button";
        new_button.style.backgroundColor = color;
        // if (color == "blue" || color == "green" || color == "red") {
        //     new_button.style.border = "solid";
        //     new_button.style.borderColor = "#c51230";
        //     new_button.style.color = "white"; 
        // }

        let img_front = shirts[product_id].colors[color].front;
        let img_back = shirts[product_id].colors[color].back;
        new_button.onclick = () => {
            side_button_box.innerHTML = "";
            document.getElementById("detail-content-img").src = img_front;
            appendSideButton(side_button_box, img_front, img_back);
        }
        color_button_box.appendChild(new_button);
    }
};