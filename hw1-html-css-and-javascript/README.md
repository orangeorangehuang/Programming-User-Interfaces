# hw1-Html-CSS-and-JavaScript

- 學號：R11922101 
- 系級：資工碩一 
- 姓名：黃嘉宏 

## 1. Requirements
### 1.1 Basic Requirements (All Completed)
- [x] Header
- [x] Footer
- [x] hover
    - Mouse cursor will change to hand pointer on all clickable elements.
    - The top menu items display an animated red bottom border.
    - Other buttons change the text color on hover.
- [x] `index.html`
- [x] `product.html`
- [x] `details.html`
- [x] `not_implemented.html`
- [x] Windows Resize Handling

### 1.2 Bonus Requirements (All Completed)
- [x] Quick View Block
    - Quick View Block will be displayed in the bottom of the page.
    - The Quick View Block contains:
        - 2 preview images (Front, Back)
        - Information about the shirt (Name, Price, Description)
        - A `Close` button.
    - When the `Quick View` button of a shirt block is clicked, the sceen will scroll to the Quick View Block.
    - When the `Close` button is clicked, the screen will scoll back to the original shirt block in which the user just clicked the `Quick View` button.

- [x] Responsive Web Page
    - As the width decreases, the page rearranges and changes content.
    - The header menu will be changed into a hamburger menu. This is implemented with the `@media` entry in the `css` file.
    - Demo Video
        - ![Image](https://github.com/orangeorangehuang/Programming-User-Interfaces/blob/main/hw1-html-css-and-javascript/RWD_Demo.gif)


## 2. Testing
- Extra data entries in `shirt.js` (Tested in both `products.html` and `detail.html`)
    - T-Shirt without its name
        - In this case, the name will be "Unnamed T-Shirt".
    - T-Shirt without any available colors
        - In this case, the displayed images will be the default images.
        - The `Side` and `Color` button block in `detail.html` contains the text "Not Available".
    - T-Shirt without its price
        - In this case, the text in the price block will be "Not yet on sale".
    - T-Shirt without its description
        - In this case, the description of the T-Shirt will be "To Be Anounced..."
