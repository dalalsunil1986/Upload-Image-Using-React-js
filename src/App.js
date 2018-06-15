import React, { Component } from 'react';
import ImagePicker from 'react-image-picker';
import 'react-image-picker/dist/index.css';
import axios from 'axios';
import './App.css';

class App extends Component {
  fileReader=new FileReader();
    constructor(props) {
        super(props)
        let images=[];
        let arrImages=[];
        this.state = { 
          arrImages, 
          images
        }    
        
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleArr=this.handleArr.bind(this);
      }
      
      handleArr(e){
          e.preventDefault(); 
    const imageFiles = e.target.files;
    const filesLength = imageFiles.length; 
    for(var i = 0; i < filesLength; i++) {
        let reader = new FileReader();
        let file = imageFiles[i];

        reader.onloadend = () => {
            this.setState({ arrImages: this.state.arrImages.concat(reader.result)});
        }
        reader.readAsDataURL(file);
      }}
      handleChange(e){
         e.preventDefault(); 
    const imageFiles = e.target.files;
    const filesLength = imageFiles.length; 
    for(var i = 0; i < filesLength; i++) {
        let reader = new FileReader();
        let file = imageFiles[i];

        reader.onloadend = () => {
            this.setState({ images: this.state.images.concat(reader.result)});
        }
        reader.readAsDataURL(file);
      }}
      handleSubmit(e){
        e.preventDefault();
        if(this.state.arrImages==''){
          alert("something must be selected")  
        }else{
          var qs=require('qs');
          var postData={
      id: 8080,
      images:this.state.arrImages
    }
    axios.post("http://localhost/PhotoUpload/imgUpload.php",qs.stringify(postData))
    .then(
      function(response){
        console.log(response.data);
      }
    )
        }
      }
      onPickImages(arrImages) {
          this.setState({ arrImages:arrImages });
      }
   render(){
    const imageList = this.state.images;
   
       return(
           <div className="conatiner-fluid">
            <div className="row">
                
                <div className="form">
                <div className="input-group">
                <span className="input-group-addon"><i className="glyphicon glyphicon-file"></i></span>
                 <input type="file" accept="image/*;capture=camera" style={{display:'none'}}
                 onChange={this.handleChange}
                 ref={fileInput=>this.fileInput=fileInput} multiple/>
                 <button className="btn btcap btn-block btn-primary" onClick={()=>this.fileInput.click()}>Choose your file</button>
                </div>
                <button type="submit" onClick={this.handleSubmit} className="btn btn-block">Upload</button>

                </div>
            </div>
            <div className="row">

            <textarea onChange={this.handleArr} className="form-control fName" rows="4" cols="100" value={this.state.arrImages && JSON.stringify(this.state.arrImages)  } disabled/>
            
            <ImagePicker 
              images={imageList.map((image, i) => ({src: image, value: i}))}
              onPick={this.onPickImages.bind(this)}
              multiple
            />
            
            
            </div>           
                
            
           </div>
       );
   }
}

export default App;
