{function showPreview(e){if(e.target.files.length>0){e.preventDefault();var t=URL.createObjectURL(e.target.files[0]),i=document.getElementById("file-ip-1-preview");i.src=t,i.style.display="block",i.style.width="100px"}}}