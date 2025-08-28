/*

MIT License

Copyright (c) 2025 JustStudio. <https://juststudio.is-a.dev/>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

const copyrightTextLink = `https://github.com/JustStudio7/Encoder/blob/main/LICENSE`;
const copyrightTextStyles = `
fill: rgba(228, 228, 228, 0.75);
left: 25%;
color: rgba(228, 228, 228, 0.75);
width: 50%;
bottom: 5px;
height: auto;
position: fixed;
font-size: 16px;
font-style: normal;
text-align: center;
font-family: 'Rubik';
font-weight: 400;
display: block;
z-index: 9;
`;
const currentYear = new Date().getFullYear();
let copyrightText = `
<span style="${copyrightTextStyles}">
    <a href="${copyrightTextLink}" target="_blank">
        <span style="opacity: 0.5;text-decoration: underline;text-decoration-color: rgba(255,255,255,0.33);" class="txt12" id="copyrightfootertext">Copyright © 2025-${currentYear} &#171;JustStudio.&#187;</span>
    </a>
    <br>
</span>
`
if (currentYear < 2026) {
    copyrightText = `
        <span style="${copyrightTextStyles}">
            <a href="${copyrightTextLink}" target="_blank">
                <span style="opacity: 0.5;text-decoration: underline;text-decoration-color: rgba(255,255,255,0.33);" class="txt12" id="copyrightfootertext">Copyright © 2025 &#171;JustStudio.&#187;</span>
            </a>
            <br>
        </span>
    `
}
document.body.insertAdjacentHTML('beforeend', copyrightText);